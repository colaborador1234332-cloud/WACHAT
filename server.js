const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const Jimp = require('jimp');
let pdfjsLib = null;
let Canvas = null;
try{
  pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js');
  Canvas = require('canvas');
}catch(_e){
  // optional deps may not be installed in some environments
  pdfjsLib = null;
  Canvas = null;
}
const admin = require('firebase-admin');
require('dotenv').config();

const app = express();
const PORT = Number(process.env.PORT || 3000);

const webhookStats = {
  totalHits: 0,
  verifyHits: 0,
  postHits: 0,
  lastVerifyAt: null,
  lastPostAt: null,
  lastEntryCount: 0,
  lastMessageCount: 0,
  lastStatusCount: 0,
  lastError: null,
  lastPayloadPreview: null
};

app.use(cors());
app.use(express.json({ limit: '1mb' }));

const SERVICE_ACCOUNT_FILE = process.env.FIREBASE_SERVICE_ACCOUNT_FILE || path.join(__dirname, 'secrets', 'clavecuenta.json');
let db = null;

try {
  if (fs.existsSync(SERVICE_ACCOUNT_FILE)) {
    const serviceAccount = JSON.parse(fs.readFileSync(SERVICE_ACCOUNT_FILE, 'utf8'));
    if (!admin.apps.length) {
      admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
    }
    db = admin.firestore();
    console.log('[Firebase] Admin inicializado en proyecto:', serviceAccount.project_id);
  } else {
    console.warn('[Firebase] No existe archivo service account:', SERVICE_ACCOUNT_FILE);
  }
} catch (error) {
  console.error('[Firebase] Error inicializando Admin SDK:', error.message);
}

async function requireAdminFromFirebase(req, res, next) {
  try {
    const header = String(req.headers.authorization || '');
    const match = header.match(/^Bearer\s+(.+)$/i);
    if (!match) return res.status(401).json({ ok: false, error: 'Token requerido' });

    const idToken = String(match[1] || '').trim();
    if (!idToken) return res.status(401).json({ ok: false, error: 'Token invalido' });

    const decoded = await admin.auth().verifyIdToken(idToken, true);
    const isAdmin = !!(decoded && (decoded.admin === true || decoded.role === 'admin'));
    if (!isAdmin) return res.status(403).json({ ok: false, error: 'Permisos de administrador requeridos' });

    req.firebaseUser = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ ok: false, error: 'No autorizado', details: error.message });
  }
}

function normPhone(raw) {
  return String(raw || '').replace(/\D+/g, '');
}

function canonicalClientPhone(rawPhone) {
  const digits = normPhone(rawPhone);
  if (!digits) return '';
  const last10 = digits.slice(-10);

  // Normalize Mexico numbers to a single canonical prefix to avoid duplicates.
  if (last10.length === 10 && (digits.length === 10 || digits.length === 12 || digits.length === 13)) {
    return `521${last10}`;
  }

  return digits;
}

function conversationDedupKey(rawPhone) {
  const digits = normPhone(rawPhone);
  if (!digits) return '';
  const last10 = digits.slice(-10);
  return last10.length === 10 ? last10 : digits;
}

function choosePreferredConversation(a, b) {
  const left = a || {};
  const right = b || {};
  const leftTs = Number(left.lastTimestamp || left.updatedAt || 0);
  const rightTs = Number(right.lastTimestamp || right.updatedAt || 0);

  if (rightTs > leftTs) {
    return { ...left, ...right };
  }
  return { ...right, ...left };
}

function normalizeDestinationPhone(rawPhone) {
  const digits = normPhone(rawPhone);
  if (!digits) return '';

  // Allow local numbers by prepending a default country code (Mexico by default).
  const defaultCountryCode = normPhone(process.env.META_DEFAULT_COUNTRY_CODE || '52');
  if (digits.length === 10 && defaultCountryCode) {
    return `${defaultCountryCode}${digits}`;
  }

  return digits;
}

function phoneCandidates(rawPhone) {
  const digits = normPhone(rawPhone);
  if (!digits) return [];
  const out = new Set([digits]);
  const last10 = digits.slice(-10);
  if (last10 && last10 !== digits) out.add(last10);
  if (last10) out.add(`52${last10}`);
  if (last10) out.add(`521${last10}`);
  return Array.from(out).filter(Boolean);
}

function pickMessagePhone(msg) {
  const from = normPhone(msg?.from);
  const to = normPhone(msg?.to);
  const phone = normPhone(msg?.phone);
  return from || to || phone || '';
}

async function saveWaMessage(phone, message) {
  if (!db) return;
  const now = Date.now();
  const phoneDigits = canonicalClientPhone(phone);
  if (!phoneDigits) return;

  const convRef = db.collection('waConversations').doc(phoneDigits);
  const msgRef = convRef.collection('messages').doc(String(message.id || now));

  const msgData = {
    id: String(message.id || now),
    direction: message.direction || 'in',
    text: String(message.text || ''),
    caption: message.caption || null,
    type: message.type || 'text',
    mediaId: message.mediaId || null,
    mediaUrl: message.mediaUrl || null,
    mimeType: message.mimeType || null,
    fileName: message.fileName || null,
    isAnimated: typeof message.isAnimated === 'boolean' ? message.isAnimated : null,
    replyToMessageId: message.replyToMessageId || null,
    replyToSender: message.replyToSender || null,
    replyToText: message.replyToText || null,
    replyToMediaUrl: message.replyToMediaUrl || null,
    replyToMimeType: message.replyToMimeType || null,
    replyToFileName: message.replyToFileName || null,
    replyToKind: message.replyToKind || null,
    timestamp: Number(message.timestamp || now),
    from: message.from || null,
    to: message.to || null,
    status: message.status || null
  };

  const isInbound = String(msgData.direction || '').trim().toLowerCase() === 'in';
  const isOutbound = String(msgData.direction || '').trim().toLowerCase() === 'out';

  await msgRef.set(msgData, { merge: true });

  const convPatch = {
    phone: phoneDigits,
    lastText: msgData.text,
    lastDirection: msgData.direction,
    lastTimestamp: msgData.timestamp,
    updatedAt: now
  };

  if (isInbound) {
    convPatch.unreadCount = admin.firestore.FieldValue.increment(1);
    convPatch.lastInboundTs = msgData.timestamp;
  }
  if (isOutbound) {
    convPatch.lastOutboundTs = msgData.timestamp;
  }

  await convRef.set(convPatch, { merge: true });
}

async function getMetaMediaInfo(mediaId) {
  const token = process.env.META_WHATSAPP_TOKEN;
  if (!token) throw new Error('META_WHATSAPP_TOKEN no configurado');
  const id = String(mediaId || '').trim();
  if (!id) throw new Error('mediaId requerido');

  const infoResp = await axios.get(`https://graph.facebook.com/v20.0/${encodeURIComponent(id)}`, {
    headers: { Authorization: `Bearer ${token}` },
    timeout: 20000
  });

  return infoResp.data || {};
}

async function getMetaBusinessProfile() {
  const token = String(process.env.META_WHATSAPP_TOKEN || '').trim();
  const phoneNumberId = String(process.env.META_PHONE_NUMBER_ID || '').trim();
  if (!token || !phoneNumberId) {
    return {
      ok: false,
      detail: 'Falta configurar META_WHATSAPP_TOKEN o META_PHONE_NUMBER_ID.'
    };
  }

  const url = `https://graph.facebook.com/v20.0/${encodeURIComponent(phoneNumberId)}/whatsapp_business_profile`;
  const resp = await axios.get(url, {
    params: {
      fields: 'about,address,description,email,profile_picture_url,websites,vertical'
    },
    headers: { Authorization: `Bearer ${token}` },
    timeout: 20000
  });

  const profile = Array.isArray(resp.data?.data) ? resp.data.data[0] || {} : {};
  return { ok: true, profile };
}

async function saveMetaBusinessProfileDescription(displayName) {
  const token = String(process.env.META_WHATSAPP_TOKEN || '').trim();
  const phoneNumberId = String(process.env.META_PHONE_NUMBER_ID || '').trim();
  if (!token || !phoneNumberId) {
    return {
      ok: false,
      updated: false,
      message: 'Falta configurar META_WHATSAPP_TOKEN o META_PHONE_NUMBER_ID.'
    };
  }

  // Meta no permite cambiar el "display name" directamente por este endpoint.
  // Como fallback, persistimos el valor en `description` para reflejar el nombre operativo.
  const url = `https://graph.facebook.com/v20.0/${encodeURIComponent(phoneNumberId)}/whatsapp_business_profile`;
  await axios.post(
    url,
    {
      messaging_product: 'whatsapp',
      description: String(displayName || '').trim().slice(0, 256)
    },
    {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      timeout: 20000
    }
  );

  return {
    ok: true,
    updated: true,
    message: 'Perfil actualizado en Meta (campo description).'
  };
}

async function saveWaDeliveryStatus(recipientId, statusItem) {
  if (!db) return;

  const phoneDigits = normPhone(recipientId);
  const msgId = String(statusItem?.id || '').trim();
  if (!phoneDigits || !msgId) return;

  const statusTs = Number(statusItem?.timestamp) ? Number(statusItem.timestamp) * 1000 : Date.now();
  const waStatus = String(statusItem?.status || '').trim() || 'unknown';
  const err = Array.isArray(statusItem?.errors) && statusItem.errors[0] ? statusItem.errors[0] : null;
  const statusError = err
    ? {
        code: err.code || null,
        title: err.title || null,
        message: err.message || null,
        details: err.details || null
      }
    : null;

  const convRef = db.collection('waConversations').doc(phoneDigits);
  const msgRef = convRef.collection('messages').doc(msgId);

  await msgRef.set(
    {
      id: msgId,
      direction: 'out',
      status: waStatus,
      statusTimestamp: statusTs,
      statusError
    },
    { merge: true }
  );

  await convRef.set(
    {
      phone: phoneDigits,
      lastDeliveryStatus: waStatus,
      lastDeliveryTimestamp: statusTs,
      lastDeliveryError: statusError,
      updatedAt: Date.now()
    },
    { merge: true }
  );
}

async function getConversationByDocId(docId, limit = 200) {
  if (!db) return [];
  const safeId = normPhone(docId);
  if (!safeId) return [];
  const safeLimit = Math.max(1, Math.min(500, Number(limit) || 200));
  const snap = await db
    .collection('waConversations')
    .doc(safeId)
    .collection('messages')
    .orderBy('timestamp', 'desc')
    .limit(safeLimit)
    .get();

  const normalizeTs = (value) => {
    const n = Number(value || 0);
    if (!Number.isFinite(n) || n <= 0) return 0;
    return n < 1000000000000 ? n * 1000 : n;
  };

  return snap.docs
    .map((d) => d.data() || {})
    .sort((a, b) => {
      const ta = normalizeTs(a.timestamp || a.createdAt || a.sentAt || 0);
      const tb = normalizeTs(b.timestamp || b.createdAt || b.sentAt || 0);
      if (ta !== tb) return ta - tb;
      return String(a.id || '').localeCompare(String(b.id || ''));
    });
}

async function getConversation(phone, limit = 200) {
  if (!db) return [];
  const phoneDigits = normPhone(phone);
  if (!phoneDigits) return [];

  const safeLimit = Math.max(1, Math.min(500, Number(limit) || 200));
  const candidates = phoneCandidates(phoneDigits);
  const docIds = new Set(candidates);

  const lookups = [];
  for (const cand of candidates) {
    lookups.push(db.collection('waConversations').where('phone', '==', cand).limit(4).get());
    lookups.push(db.collection('waConversations').where('phoneNumber', '==', cand).limit(4).get());
  }

  const snaps = await Promise.all(lookups);
  snaps.forEach((snap) => {
    (snap.docs || []).forEach((d) => docIds.add(String(d.id || '').trim()));
  });

  const convLists = await Promise.all(
    Array.from(docIds)
      .filter(Boolean)
      .map((docId) => getConversationByDocId(docId, safeLimit))
  );

  const normalizeTs = (value) => {
    const n = Number(value || 0);
    if (!Number.isFinite(n) || n <= 0) return 0;
    return n < 1000000000000 ? n * 1000 : n;
  };

  const messageKey = (m) => {
    const direct = String(m?.id || m?.messageId || m?.waId || '').trim();
    if (direct) return direct;
    const ts = normalizeTs(m?.timestamp || m?.createdAt || m?.sentAt || 0);
    const dir = String(m?.direction || '').trim().toLowerCase();
    const txt = String(m?.text || m?.caption || '').trim();
    return `local|${dir}|${ts}|${txt.slice(0, 120)}`;
  };

  const merged = new Map();
  convLists.forEach((list) => {
    (Array.isArray(list) ? list : []).forEach((msg) => {
      const key = messageKey(msg);
      if (!merged.has(key)) merged.set(key, msg || {});
    });
  });

  return Array.from(merged.values())
    .sort((a, b) => {
      const ta = normalizeTs(a.timestamp || a.createdAt || a.sentAt || 0);
      const tb = normalizeTs(b.timestamp || b.createdAt || b.sentAt || 0);
      if (ta !== tb) return ta - tb;
      return String(a.id || a.messageId || a.waId || '').localeCompare(String(b.id || b.messageId || b.waId || ''));
    })
    .slice(-safeLimit);
}

async function getFlatMessagesConversation(phone, limit = 300) {
  if (!db) return [];
  const candidates = phoneCandidates(phone);
  if (!candidates.length) return [];

  const fields = ['from', 'to', 'phone'];
  const allDocs = [];

  const tasks = fields.map(async (fld) => {
    try {
      const snap = await db.collection('waMessages').where(fld, 'in', candidates.slice(0, 10)).limit(500).get();
      for (const d of snap.docs) allDocs.push(d);
    } catch (_e) {
      // Ignore single-query failures and keep trying other fields.
    }
  });
  await Promise.all(tasks);

  const uniq = new Map();
  for (const d of allDocs) {
    if (!uniq.has(d.id)) uniq.set(d.id, d.data() || {});
  }

  return Array.from(uniq.values())
    .sort((a, b) => Number(a.timestamp || 0) - Number(b.timestamp || 0))
    .slice(-Math.max(1, Number(limit) || 300));
}

app.use('/wa_api', express.static(path.join(__dirname, 'wa_api')));
app.get('/config.js', (_req, res) => res.sendFile(path.join(__dirname, 'config.js')));
app.get('/firebase.js', (_req, res) => res.sendFile(path.join(__dirname, 'firebase.js')));
app.get('/', (_req, res) => res.redirect('/wa_api/chat.html'));
app.get('/index.html', (_req, res) => res.redirect('/wa_api/chat.html'));

app.get('/health', (_req, res) => {
  res.json({ ok: true, adminDb: !!db, projectId: admin.apps[0]?.options?.credential?.projectId || null });
});

app.get('/wa/webhook-stats', (_req, res) => {
  res.json({ ok: true, stats: webhookStats });
});

app.get('/admin/firebase-users', requireAdminFromFirebase, async (_req, res) => {
  try {
    let pageToken = undefined;
    const users = [];
    do {
      const page = await admin.auth().listUsers(1000, pageToken);
      (page.users || []).forEach((u) => {
        users.push({
          uid: u.uid,
          email: u.email || '',
          displayName: u.displayName || '',
          disabled: !!u.disabled
        });
      });
      pageToken = page.pageToken;
    } while (pageToken);

    users.sort((a, b) => String(a.email || a.displayName || a.uid).localeCompare(String(b.email || b.displayName || b.uid), 'es'));
    res.json({ ok: true, users });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
});

app.get('/wa/conversations', async (req, res) => {
  try {
    if (!db) return res.status(500).json({ ok: false, error: 'Firestore no inicializado' });
    const limit = Math.max(1, Math.min(200, Number(req.query.limit) || 100));
    const snap = await db.collection('waConversations').limit(1000).get();

    const conversations = snap.docs.map((d) => {
      const data = d.data() || {};
      const fallbackPhone = canonicalClientPhone(d.id);
      const phone = fallbackPhone || canonicalClientPhone(data.phone || data.phoneNumber);
      return {
        id: d.id,
        ...data,
        phone,
        lastTimestamp: Number(data.lastTimestamp || data.updatedAt || 0)
      };
    });

    const fromWaConversations = conversations
      .filter((c) => !!normPhone(c.phone || c.id))
      .sort((a, b) => Number(b.lastTimestamp || 0) - Number(a.lastTimestamp || 0));

    // Compatibility fallback: derive conversations from flat waMessages collection.
    const flatScanLimit = Math.max(200, Math.min(800, limit * 8));
    const flatSnap = await db.collection('waMessages').orderBy('timestamp', 'desc').limit(flatScanLimit).get();
    const grouped = new Map();
    for (const d of flatSnap.docs) {
      const m = d.data() || {};
      const p = canonicalClientPhone(pickMessagePhone(m));
      if (!p) continue;
      const prev = grouped.get(p);
      const ts = Number(m.timestamp || 0);
      if (!prev || ts > Number(prev.lastTimestamp || 0)) {
        grouped.set(p, {
          id: p,
          phone: p,
          lastText: String(m.text || m.message || ''),
          lastDirection: m.direction || null,
          lastTimestamp: ts,
          updatedAt: ts,
          source: 'waMessages'
        });
      }
    }

    const merged = new Map();
    for (const c of fromWaConversations) {
      const key = conversationDedupKey(c.phone || c.id);
      if (!key) continue;
      const prev = merged.get(key);
      const next = choosePreferredConversation(prev, c);
      next.phone = canonicalClientPhone(next.phone || next.id);
      merged.set(key, next);
    }
    for (const [key, c] of grouped.entries()) {
      const dedupKey = conversationDedupKey(key);
      if (!dedupKey) continue;
      const prev = merged.get(dedupKey);
      const next = choosePreferredConversation(prev, c);
      next.phone = canonicalClientPhone(next.phone || next.id);
      merged.set(dedupKey, next);
    }

    const sorted = Array.from(merged.values())
      .sort((a, b) => Number(b.lastTimestamp || 0) - Number(a.lastTimestamp || 0))
      .slice(0, limit);

    res.json({ ok: true, conversations: sorted });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
});

app.get('/wa/conversation', async (req, res) => {
  try {
    const phone = normPhone(req.query.phone);
    if (!phone) return res.status(400).json({ ok: false, error: 'phone requerido' });
    const requestedLimit = Math.max(1, Math.min(500, Number(req.query.limit) || 300));
    let messages = await getConversation(phone, requestedLimit);
    if (!messages.length) {
      messages = await getFlatMessagesConversation(phone, requestedLimit);
    }
    const normalizeTs = (value) => {
      const n = Number(value || 0);
      if (!Number.isFinite(n) || n <= 0) return 0;
      return n < 1000000000000 ? n * 1000 : n;
    };

    messages = (Array.isArray(messages) ? messages : [])
      .map((m, idx) => ({ m: m || {}, idx }))
      .sort((a, b) => {
        const ta = normalizeTs(a.m.timestamp || a.m.createdAt || a.m.sentAt || 0);
        const tb = normalizeTs(b.m.timestamp || b.m.createdAt || b.m.sentAt || 0);
        if (ta !== tb) return ta - tb;
        return a.idx - b.idx;
      })
      .map((entry) => entry.m);

    if (messages.length > requestedLimit) {
      messages = messages.slice(-requestedLimit);
    }

    res.json({ ok: true, phone, messages });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
});

app.get('/wa/media/:mediaId', async (req, res) => {
  try {
    const mediaId = String(req.params.mediaId || '').trim();
    if (!mediaId) return res.status(400).json({ ok: false, error: 'mediaId requerido' });

    const token = process.env.META_WHATSAPP_TOKEN;
    if (!token) return res.status(500).json({ ok: false, error: 'META_WHATSAPP_TOKEN no configurado' });

    const info = await getMetaMediaInfo(mediaId);
    const mediaUrl = String(info.url || info.source_url || info.uri || '').trim();
    if (!mediaUrl) return res.status(404).json({ ok: false, error: 'No se encontro URL de media' });

    // If client requests a thumbnail, try to generate a small image for images.
    if(req.query && req.query.thumb){
      try{
        const resp = await axios.get(mediaUrl, { headers: { Authorization: `Bearer ${token}` }, responseType: 'arraybuffer', timeout: 30000 });
        const ct = String(resp.headers['content-type'] || '').toLowerCase();
        const buffer = Buffer.from(resp.data || []);
        if(ct.startsWith('image/')){
          const img = await Jimp.read(buffer);
          img.cover(160, 160, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE);
          img.quality(60);
          const out = await img.getBufferAsync(Jimp.MIME_JPEG);
          res.setHeader('Content-Type', 'image/jpeg');
          res.setHeader('Content-Length', out.length);
          return res.send(out);
        }

        // If PDF and server has pdfjs + canvas, render first page to JPEG
        if(ct.includes('pdf') && pdfjsLib && Canvas){
          try{
            const pdfData = buffer;
            const loadingTask = pdfjsLib.getDocument({ data: pdfData });
            const pdfDoc = await loadingTask.promise;
            const page = await pdfDoc.getPage(1);
            const viewport = page.getViewport({ scale: 1 });
            // target thumbnail size
            const tgtW = 160;
            const scale = Math.min(tgtW / viewport.width, 1);
            const vp = page.getViewport({ scale });
            const canvas = Canvas.createCanvas(Math.round(vp.width), Math.round(vp.height));
            const ctx = canvas.getContext('2d');
            const renderContext = { canvasContext: ctx, viewport: vp };
            await page.render(renderContext).promise;
            const out = canvas.toBuffer('image/jpeg', { quality: 0.6 });
            res.setHeader('Content-Type', 'image/jpeg');
            res.setHeader('Content-Length', out.length);
            try{ await pdfDoc.destroy(); }catch(_e){}
            return res.send(out);
          }catch(pdfErr){
            console.warn('pdf thumbnail render failed', pdfErr && (pdfErr.message || pdfErr));
          }
        }

        // Fallback: small SVG placeholder showing filename
        const filename = String(info.name || info.filename || mediaId);
        const svg = `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160">`+
          `<rect width="100%" height="100%" fill="#f8fafc"/>`+
          `<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#ef4444" font-family="Arial" font-size="20">PDF</text>`+
          `<text x="50%" y="75%" dominant-baseline="middle" text-anchor="middle" fill="#334155" font-family="Arial" font-size="12">${escapeXml(filename)}</text>`+
          `</svg>`;
        res.setHeader('Content-Type', 'image/svg+xml');
        res.setHeader('Content-Length', Buffer.byteLength(svg));
        return res.send(svg);
      }catch(err){
        console.warn('thumb generation failed', err && err.message);
      }
    }

    const mediaResp = await axios.get(mediaUrl, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'stream',
      timeout: 30000
    });

    if (mediaResp.headers['content-type']) res.setHeader('Content-Type', mediaResp.headers['content-type']);
    if (mediaResp.headers['content-length']) res.setHeader('Content-Length', mediaResp.headers['content-length']);
    mediaResp.data.pipe(res);
  } catch (error) {
    res.status(500).json({ ok: false, error: error.response?.data || error.message });
  }
});

function escapeXml(unsafe){
  return String(unsafe || '').replace(/[<>&"']/g, function(c){
    return { '<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":"&apos;" }[c];
  });
}

app.post('/wa/assign', async (req, res) => {
  try {
    if (!db) return res.status(500).json({ ok: false, error: 'Firestore no inicializado' });
    const phone = canonicalClientPhone(req.body.phone);
    const assignedTo = String(req.body.assignedTo || '').trim();
    if (!phone || !assignedTo) return res.status(400).json({ ok: false, error: 'phone y assignedTo son requeridos' });
    await db.collection('waConversations').doc(phone).set({ assignedTo, updatedAt: Date.now() }, { merge: true });
    res.json({ ok: true, phone, assignedTo });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
});

app.post('/wa/client-attributes', async (req, res) => {
  try {
    if (!db) return res.status(500).json({ ok: false, error: 'Firestore no inicializado' });

    const phone = canonicalClientPhone(req.body.phone);
    if (!phone) return res.status(400).json({ ok: false, error: 'phone es requerido' });

    const name = String(req.body.name || '').trim();
    const email = String(req.body.email || '').trim();
    const company = String(req.body.company || '').trim();
    const tags = Array.isArray(req.body.tags)
      ? req.body.tags.map((tag) => String(tag || '').trim()).filter(Boolean).slice(0, 50)
      : [];

    const patch = {
      phone,
      name,
      email,
      company,
      tags,
      updatedAt: Date.now()
    };

    // Persist only to canonical doc id so each client has a single record.
    await db.collection('waConversations').doc(phone).set(patch, { merge: true });
    res.json({ ok: true, phone, attributes: patch });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
});

app.post('/wa/mark-read', async (req, res) => {
  try {
    if (!db) return res.status(500).json({ ok: false, error: 'Firestore no inicializado' });
    const phone = canonicalClientPhone(req.body.phone);
    const readTs = Number(req.body.readTs || req.body.timestamp || Date.now());
    if (!phone) return res.status(400).json({ ok: false, error: 'phone es requerido' });

    await db.collection('waConversations').doc(phone).set(
      {
        phone,
        unreadCount: 0,
        readCursorTs: readTs,
        readAt: Date.now(),
        updatedAt: Date.now()
      },
      { merge: true }
    );

    res.json({ ok: true, phone, unreadCount: 0, readTs });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
});

app.post('/wa/mock-in', async (req, res) => {
  try {
    const from = normPhone(req.body.from || req.body.phone);
    const text = String(req.body.text || req.body.message || '').trim();
    if (!from || !text) return res.status(400).json({ ok: false, error: 'from y text son requeridos' });
    const id = `mock_${Date.now()}`;
    await saveWaMessage(from, { id, direction: 'in', text, from, timestamp: Date.now() });
    res.json({ ok: true, id, from });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
});

app.get('/wa/events', async (req, res) => {
  try {
    if (!db) return res.status(500).json({ ok: false, error: 'Firestore no inicializado' });
    const limit = Math.max(1, Math.min(1000, Number(req.query.limit) || 300));
    const snap = await db.collection('waEvents').orderBy('dueAt', 'asc').limit(limit).get();
    const events = snap.docs.map((d) => {
      const data = d.data() || {};
      return {
        id: d.id,
        phone: String(data.phone || '').trim(),
        contactName: String(data.contactName || '').trim(),
        sourceType: String(data.sourceType || 'manual').trim(),
        title: String(data.title || '').trim(),
        notes: String(data.notes || '').trim(),
        dueAt: Number(data.dueAt || 0),
        remindMinutes: Number(data.remindMinutes || 0),
        notifiedOffsets: Array.isArray(data.notifiedOffsets) ? data.notifiedOffsets : [],
        status: String(data.status || 'pending').trim(),
        createdAt: Number(data.createdAt || 0),
        updatedAt: Number(data.updatedAt || 0)
      };
    });
    res.json({ ok: true, events });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
});

// Return a consolidated media index across recent messages for faster client-side multimedia view
app.get('/wa/media-index', async (req, res) => {
  try {
    if (!db) return res.status(500).json({ ok: false, error: 'Firestore no inicializado' });
    const limit = Math.max(200, Math.min(5000, Number(req.query.limit) || 2000));

    const snap = await db.collection('waMessages').orderBy('timestamp', 'desc').limit(limit).get();
    const itemsMap = new Map();

    const isImageLike = (src) => { const s = String(src || '').toLowerCase(); return s.includes('image') || /\.(jpg|jpeg|png|gif|webp|bmp|heic)$/i.test(s); };
    const isVideoLike = (src) => { const s = String(src || '').toLowerCase(); return s.includes('video') || /\.(mp4|mov|mkv|webm|avi)$/i.test(s); };
    const isDocumentLike = (src) => { const s = String(src || '').toLowerCase(); return s.includes('pdf') || /\.(pdf|doc|docx|xls|xlsx|ppt|pptx|txt|csv|zip|rar)$/i.test(s); };
    const extractLinks = (txt) => { const re = /(https?:\/\/[^\s<>"']+)/ig; const out = []; let m; while((m = re.exec(String(txt||'')))){ out.push(m[1]); } return Array.from(new Set(out)); };

    for (const d of snap.docs) {
      try {
        const m = d.data() || {};
        const phone = canonicalClientPhone(pickMessagePhone(m) || m.phone || m.from || m.to || '');
        const ts = Number(m.timestamp || m.createdAt || Date.now());
        const text = String(m.text || m.caption || m.message || '').trim();
        const mediaId = String(m.mediaId || m.idMedia || m.whatsappMediaId || '').trim();
        const mediaUrl = String(m.mediaUrl || m.fileUrl || m.url || m.media || m.downloadUrl || m.documentUrl || m.document || '').trim();
        const fileName = String(m.fileName || m.filename || m.name || '').trim();
        const mime = String(m.mimeType || m.type || '').trim();
        const typeHint = String(m.messageType || m.mediaType || m.type || '').toLowerCase();
        const stickerLike = !!(m.sticker || typeHint.includes('sticker') || mime.toLowerCase().includes('sticker') || mime.toLowerCase().includes('webp'));

        if (stickerLike) {
          continue;
        }

        // links-only
        const links = extractLinks(text);
        links.forEach((lnk) => {
          const id = 'l|' + phone + '|' + String(m.id || d.id || ts) + '|' + lnk;
          if (!itemsMap.has(id)) {
            itemsMap.set(id, {
              id,
              kind: 'link',
              title: lnk,
              url: lnk,
              phone,
              contactLabel: phone,
              timestamp: ts,
              messageId: String(m.id || d.id || ts),
              comment: text
            });
          }
        });

        // media/file
        if (mediaUrl || fileName || mediaId) {
          const resolvedUrl = mediaUrl || (mediaId ? ('/wa/media/' + encodeURIComponent(mediaId)) : '');
          const hint = [mediaUrl, mime, fileName, text].filter(Boolean).join(' ');
          const kind = isImageLike(hint) ? 'asset' : (isVideoLike(hint) ? 'asset' : (isDocumentLike(hint) ? 'doc' : 'asset'));
          const id = 'm|' + phone + '|' + String(m.id || d.id || ts) + '|' + kind + '|' + (resolvedUrl || fileName || mediaId || '');
          if (!itemsMap.has(id)) {
            itemsMap.set(id, {
              id,
              kind,
              title: fileName || (kind === 'doc' ? 'Documento' : (m.type || 'Archivo')),
              url: resolvedUrl || null,
              mimeType: mime || null,
              fileName: fileName || null,
              comment: text,
              phone,
              contactLabel: phone,
              timestamp: ts,
              messageId: String(m.id || d.id || ts),
              mediaId: mediaId || null
            });
          }
        }
      } catch (_e) {
        continue;
      }
    }

    const items = Array.from(itemsMap.values()).sort((a, b) => Number(b.timestamp || 0) - Number(a.timestamp || 0)).slice(0, 2000);
    res.json({ ok: true, items, scanned: snap.size });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
});

app.post('/wa/events', async (req, res) => {
  try {
    if (!db) return res.status(500).json({ ok: false, error: 'Firestore no inicializado' });

    const idRaw = String(req.body.id || '').trim();
    const dueAt = Number(req.body.dueAt || 0);
    const title = String(req.body.title || '').trim();
    if (!dueAt || !title) {
      return res.status(400).json({ ok: false, error: 'dueAt y title son requeridos' });
    }

    const now = Date.now();
    const eventId = idRaw || `evt_${now}`;
    const patch = {
      id: eventId,
      phone: canonicalClientPhone(req.body.phone || ''),
      contactName: String(req.body.contactName || '').trim().slice(0, 120),
      sourceType: String(req.body.sourceType || 'manual').trim().toLowerCase() === 'linked' ? 'linked' : 'manual',
      title: title.slice(0, 160),
      notes: String(req.body.notes || '').trim().slice(0, 1000),
      dueAt,
      remindMinutes: Math.max(0, Math.min(43200, Number(req.body.remindMinutes || 60) || 0)),
      notifiedOffsets: Array.isArray(req.body.notifiedOffsets)
        ? req.body.notifiedOffsets.map((n) => Number(n)).filter((n) => Number.isFinite(n) && n >= 0)
        : [],
      status: ['pending', 'done', 'canceled'].includes(String(req.body.status || '').trim().toLowerCase())
        ? String(req.body.status || '').trim().toLowerCase()
        : 'pending',
      createdAt: Number(req.body.createdAt || now),
      updatedAt: now
    };

    await db.collection('waEvents').doc(eventId).set(patch, { merge: true });
    res.json({ ok: true, event: patch });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
});

app.get('/wa/meta-business-profile', async (_req, res) => {
  try {
    const result = await getMetaBusinessProfile();
    if (!result.ok) {
      return res.status(400).json({
        ok: false,
        detail: result.detail,
        message: 'No se pudo obtener el perfil de negocio en Meta.'
      });
    }

    const profile = result.profile || {};
    const verifiedName = String(process.env.META_BUSINESS_VERIFIED_NAME || '').trim();
    res.json({
      ok: true,
      profile,
      verifiedName,
      displayNameHint: verifiedName
        ? `Nombre verificado en Meta: ${verifiedName}`
        : 'El nombre verificado se administra en WhatsApp Manager.'
    });
  } catch (error) {
    const detail = error.response?.data?.error?.message || error.message;
    res.status(500).json({ ok: false, detail, message: 'Fallo consultando perfil de Meta.' });
  }
});

app.post('/wa/meta-business-profile', async (req, res) => {
  try {
    const displayName = String(req.body.displayName || '').trim();
    if (!displayName) {
      return res.status(400).json({ ok: false, message: 'displayName es requerido' });
    }

    const result = await saveMetaBusinessProfileDescription(displayName);
    if (!result.ok) {
      return res.status(400).json(result);
    }
    res.json(result);
  } catch (error) {
    const detail = error.response?.data?.error?.message || error.message;
    res.status(500).json({ ok: false, updated: false, message: 'No se pudo actualizar el perfil en Meta.', detail });
  }
});

app.post('/send-whatsapp', async (req, res) => {
  try {
    const to = normalizeDestinationPhone(req.body.to);
    const message = String(req.body.message || '').trim();
    const imageUrl = String(req.body.imageUrl || '').trim();
    const hasImageUrl = /^https?:\/\//i.test(imageUrl);
    const replyTo = req.body && typeof req.body.replyTo === 'object' && req.body.replyTo
      ? {
          messageId: String(req.body.replyTo.messageId || '').trim(),
          sender: String(req.body.replyTo.sender || '').trim().slice(0, 120),
          text: String(req.body.replyTo.text || '').trim().slice(0, 600),
          mediaUrl: String(req.body.replyTo.mediaUrl || '').trim().slice(0, 1200),
          mimeType: String(req.body.replyTo.mimeType || '').trim().slice(0, 120),
          fileName: String(req.body.replyTo.fileName || '').trim().slice(0, 240),
          kind: String(req.body.replyTo.kind || '').trim().slice(0, 60)
        }
      : null;
    if (!to || (!message && !hasImageUrl)) {
      return res.status(400).json({ ok: false, error: 'to es requerido y debes enviar message o imageUrl' });
    }
    if (to.length < 10) {
      return res.status(400).json({
        ok: false,
        error: 'Numero invalido. Usa al menos 10 digitos.'
      });
    }

    const token = process.env.META_WHATSAPP_TOKEN;
    const phoneNumberId = process.env.META_PHONE_NUMBER_ID;

    let waId = null;
    if (token && phoneNumberId) {
      const url = `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`;
      const payload = hasImageUrl
        ? {
            messaging_product: 'whatsapp',
            to,
            type: 'image',
            image: {
              link: imageUrl,
              ...(message ? { caption: message.slice(0, 1024) } : {})
            }
          }
        : {
            messaging_product: 'whatsapp',
            to,
            type: 'text',
            text: { body: message }
          };
      if (replyTo && replyTo.messageId) {
        payload.context = { message_id: replyTo.messageId };
      }
      const resp = await axios.post(url, payload, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        timeout: 20000
      });
      waId = resp.data?.messages?.[0]?.id || null;
    }

    const id = waId || `local_${Date.now()}`;
    await saveWaMessage(to, {
      id,
      direction: 'out',
      text: message || (hasImageUrl ? '[Imagen]' : ''),
      type: hasImageUrl ? 'image' : 'text',
      mediaUrl: hasImageUrl ? imageUrl : null,
      caption: hasImageUrl ? (message || null) : null,
      to,
      timestamp: Date.now(),
      status: waId ? 'sent' : 'local',
      replyToMessageId: replyTo && replyTo.messageId ? replyTo.messageId : null,
      replyToSender: replyTo && replyTo.sender ? replyTo.sender : null,
      replyToText: replyTo && replyTo.text ? replyTo.text : null,
      replyToMediaUrl: replyTo && replyTo.mediaUrl ? replyTo.mediaUrl : null,
      replyToMimeType: replyTo && replyTo.mimeType ? replyTo.mimeType : null,
      replyToFileName: replyTo && replyTo.fileName ? replyTo.fileName : null,
      replyToKind: replyTo && replyTo.kind ? replyTo.kind : null
    });

    res.json({ ok: true, id, sentToMeta: !!waId, normalizedTo: to, mode: hasImageUrl ? 'image' : 'text' });
  } catch (error) {
    const metaError = error.response?.data?.error || null;
    const readableError =
      (metaError && (metaError.error_user_msg || metaError.message)) ||
      (typeof error.response?.data === 'string' ? error.response.data : null) ||
      error.message;

    res.status(500).json({
      ok: false,
      error: readableError,
      details: {
        httpStatus: Number(error.response?.status || 500),
        metaCode: metaError?.code || null,
        metaSubcode: metaError?.error_subcode || null,
        metaType: metaError?.type || null,
        fbtraceId: metaError?.fbtrace_id || null
      }
    });
  }
});

app.post('/send-whatsapp-template', async (req, res) => {
  try {
    const to = normalizeDestinationPhone(req.body.to);
    const templateName = String(req.body.templateName || process.env.META_DEFAULT_TEMPLATE_NAME || '').trim();
    const bodyParam = String(req.body.bodyParam || req.body.message || '').trim();
    const imageUrl = String(req.body.imageUrl || '').trim();
    const templateLang = String(process.env.META_TEMPLATE_LANG || 'es_MX').trim();

    if (!to) return res.status(400).json({ ok: false, error: 'to es requerido' });
    if (to.length < 10) return res.status(400).json({ ok: false, error: 'Numero invalido. Usa al menos 10 digitos.' });
    if (!templateName) return res.status(400).json({ ok: false, error: 'templateName es requerido para envio por plantilla.' });

    const token = process.env.META_WHATSAPP_TOKEN;
    const phoneNumberId = process.env.META_PHONE_NUMBER_ID;

    let waId = null;
    if (token && phoneNumberId) {
      const url = `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`;
      const payload = {
        messaging_product: 'whatsapp',
        to,
        type: 'template',
        template: {
          name: templateName,
          language: { code: templateLang }
        }
      };

      const components = [];

      if (imageUrl) {
        components.push({
          type: 'header',
          parameters: [
            { type: 'image', image: { link: imageUrl } }
          ]
        });
      }

      if (bodyParam) {
        components.push({
          type: 'body',
          parameters: [
            { type: 'text', text: bodyParam.slice(0, 1024) }
          ]
        });
      }

      if (components.length) {
        payload.template.components = components;
      }

      const resp = await axios.post(url, payload, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        timeout: 20000
      });
      waId = resp.data?.messages?.[0]?.id || null;
    }

    const id = waId || `local_tpl_${Date.now()}`;
    await saveWaMessage(to, {
      id,
      direction: 'out',
      text: bodyParam ? `[Plantilla:${templateName}] ${bodyParam}` : `[Plantilla:${templateName}]`,
      to,
      timestamp: Date.now(),
      status: waId ? 'sent' : 'local'
    });

    res.json({ ok: true, id, sentToMeta: !!waId, normalizedTo: to, templateName, templateLang });
  } catch (error) {
    const metaError = error.response?.data?.error || null;
    const readableError =
      (metaError && (metaError.error_user_msg || metaError.message)) ||
      (typeof error.response?.data === 'string' ? error.response.data : null) ||
      error.message;

    res.status(500).json({
      ok: false,
      error: readableError,
      details: {
        httpStatus: Number(error.response?.status || 500),
        metaCode: metaError?.code || null,
        metaSubcode: metaError?.error_subcode || null,
        metaType: metaError?.type || null,
        fbtraceId: metaError?.fbtrace_id || null
      }
    });
  }
});

app.post('/wa/delete-message', async (req, res) => {
  try {
    const messageId = String(req.body.messageId || req.body.id || '').trim();
    const phone = canonicalClientPhone(req.body.phone || req.body.to || '');

    if (!messageId) {
      return res.status(400).json({ ok: false, error: 'messageId es requerido' });
    }
    if (/^local_/i.test(messageId)) {
      return res.status(400).json({ ok: false, error: 'El mensaje aun no tiene ID remoto de WhatsApp' });
    }

    const token = process.env.META_WHATSAPP_TOKEN;
    if (!token) {
      return res.status(500).json({ ok: false, error: 'META_WHATSAPP_TOKEN no configurado' });
    }

    const url = `https://graph.facebook.com/v20.0/${encodeURIComponent(messageId)}`;
    const resp = await axios.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
      timeout: 20000
    });

    if (db && phone) {
      const convRef = db.collection('waConversations').doc(phone);
      const msgRef = convRef.collection('messages').doc(messageId);
      await msgRef.set(
        {
          id: messageId,
          direction: 'out',
          text: '[Mensaje eliminado]',
          status: 'deleted',
          deletedAt: Date.now()
        },
        { merge: true }
      );
      await convRef.set({ updatedAt: Date.now() }, { merge: true });
    }

    res.json({ ok: true, messageId, phone: phone || null, meta: resp.data || null });
  } catch (error) {
    const metaError = error.response?.data?.error || null;
    const readableError =
      (metaError && (metaError.error_user_msg || metaError.message)) ||
      (typeof error.response?.data === 'string' ? error.response.data : null) ||
      error.message;

    res.status(500).json({
      ok: false,
      error: readableError,
      details: {
        httpStatus: Number(error.response?.status || 500),
        metaCode: metaError?.code || null,
        metaSubcode: metaError?.error_subcode || null,
        metaType: metaError?.type || null,
        fbtraceId: metaError?.fbtrace_id || null
      }
    });
  }
});

async function handleWebhookPost(req, res) {
  try {
    const body = req.body || {};
    const entries = Array.isArray(body.entry) ? body.entry : [];

    webhookStats.totalHits += 1;
    webhookStats.postHits += 1;
    webhookStats.lastPostAt = Date.now();
    webhookStats.lastEntryCount = entries.length;

    let messageCount = 0;
    let statusCount = 0;

    for (const entry of entries) {
      const changes = Array.isArray(entry.changes) ? entry.changes : [];
      for (const ch of changes) {
        const value = ch.value || {};
        const messages = Array.isArray(value.messages) ? value.messages : [];
        const statuses = Array.isArray(value.statuses) ? value.statuses : [];

        messageCount += messages.length;
        statusCount += statuses.length;

        for (const m of messages) {
          const from = normPhone(m.from);
          const msgType = String(m?.type || 'text');
          const typedPayload = m && typeof m === 'object' ? m[msgType] : null;
          const text =
            String(m?.text?.body || typedPayload?.caption || '').trim() ||
            (msgType === 'sticker' ? '[Sticker]' : `[${msgType}]`);
          const mediaId = typedPayload?.id || null;
          const mimeType = typedPayload?.mime_type || null;
          const fileName = typedPayload?.filename || null;
          const isAnimated = msgType === 'sticker' ? !!typedPayload?.animated : null;
          const ts = Number(m.timestamp) ? Number(m.timestamp) * 1000 : Date.now();
          await saveWaMessage(from, {
            id: m.id || `in_${Date.now()}`,
            direction: 'in',
            text,
            caption: typedPayload?.caption || null,
            type: msgType,
            mediaId,
            mimeType,
            fileName,
            isAnimated,
            from,
            timestamp: ts
          });
        }

        for (const st of statuses) {
          await saveWaDeliveryStatus(st?.recipient_id, st);
        }
      }
    }

    webhookStats.lastMessageCount = messageCount;
    webhookStats.lastStatusCount = statusCount;
    webhookStats.lastError = null;
    webhookStats.lastPayloadPreview = {
      object: body.object || null,
      firstField: body?.entry?.[0]?.changes?.[0]?.field || null,
      hasMessages: messageCount > 0,
      hasStatuses: statusCount > 0
    };

    return res.sendStatus(200);
  } catch (error) {
    webhookStats.lastError = String(error?.message || error);
    return res.sendStatus(200);
  }
}

function handleWebhookVerify(req, res) {
  const verifyToken = process.env.META_VERIFY_TOKEN || 'verify_token';
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  webhookStats.totalHits += 1;
  webhookStats.verifyHits += 1;
  webhookStats.lastVerifyAt = Date.now();

  if (mode === 'subscribe' && token === verifyToken) return res.status(200).send(challenge);
  return res.sendStatus(403);
}

// Keep both paths for compatibility with different webhook URL configurations.
app.post('/webhook', handleWebhookPost);
app.post('/wa/webhook', handleWebhookPost);
app.get('/webhook', handleWebhookVerify);
app.get('/wa/webhook', handleWebhookVerify);

app.use((req, res) => {
  const apiPrefixes = ['/wa/', '/admin/', '/send-whatsapp'];
  if (apiPrefixes.some((prefix) => String(req.path || '').startsWith(prefix))) {
    return res.status(404).json({ ok: false, error: 'API endpoint no encontrado', path: req.path });
  }
  return res.redirect('/wa_api/chat.html');
});

app.listen(PORT, () => {
  console.log(`[Server] WhatsApp-only activo en http://localhost:${PORT}`);
});
