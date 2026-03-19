(() => {
  const $ = (id) => document.getElementById(id);

  const moduleTitleEl = $('waModuleTitle');
  const railButtons = Array.from(document.querySelectorAll('.wa-rail-btn[data-module]'));
  const panels = Array.from(document.querySelectorAll('.wa-panel[data-panel]'));
  const topLeadSearchBtn = $('waLeadSearchOpen');
  const topFunnelsControls = $('waFunnelsTopControls');

  const contactsList = $('waContactsList');
  const searchInput = $('waSearchContact');
  const convEl = $('waConversation');
  const nameEl = $('waSelectedName');
  const phoneEl = $('waSelectedPhone');
  const avatarEl = $('waHeaderAvatar');
  const msgInput = $('waMessageInput');
  const sendBtn = $('waSendBtn');

  const funnelSelectEl = $('waFunnelSelect');
  const statusSelectEl = $('waStatusSelect');
  const agentSelectEl = $('waAgentSelect');

  const funnelsBoardEl = $('waFunnelsBoard');
  const funnelsBoardNameTextEl = $('waFunnelsBoardNameText');
  const funnelsBoardSelectEl = $('waFunnelsBoardSelect');

  const mediaBackdropEl = $('waMediaBackdrop');
  const mediaCloseBtnEl = $('waMediaCloseBtn');
  const mediaContentEl = $('waMediaContent');
  const mediaSearchInputEl = $('waMediaSearchInput');
  const mediaTabButtons = Array.from(document.querySelectorAll('[data-media-tab]'));

  const dirTableBodyEl = $('dirTableBody');
  const dirTabAllEl = $('dirTabAll');
  const dirTabActiveEl = $('dirTabActive');
  const dirTabArchivedEl = $('dirTabArchived');

  const ACTIVE_MODULE_KEY = 'waActiveModuleV1';
  const CRM_META_KEY = 'waCrmMetaV1';
  const CRM_CONFIG_KEY = 'waCrmConfigV1';

  const moduleTitles = {
    dashboard: 'MAQUILEROS - DASHBOARD',
    funnels: 'MAQUILEROS - ETAPAS',
    chats: 'MAQUILEROS - CHAT',
    broadcasts: 'MAQUILEROS - MENSAJES MASIVOS',
    multimedia: 'MAQUILEROS - MULTIMEDIA',
    directory: 'MAQUILEROS - DIRECTORIO',
    automation: 'MAQUILEROS - EVENTOS',
    analytics: 'MAQUILEROS - ANALITICA',
    settings: 'MAQUILEROS - AJUSTES'
  };

  const DEFAULT_STAGES = ['Lead nuevo','Contacto inicial','Cotizacion enviada','Seguimiento 1','Seguimiento 2','Cierre de venta','Perdidos','Archivados'];
  const DEFAULT_STATUSES = ['Sin gestionar','En seguimiento','Esperando cliente','Urgente','Critico','Ganado','Perdido'];
  const DEFAULT_AGENTS = ['No asignado'];

  let chats = [];
  let selected = null;
  let crmMeta = loadCrmMeta();
  let crmConfig = loadCrmConfig();
  let lastNonMediaModule = 'dashboard';
  let directoryFilter = 'all';
  let multimedia = { loaded: false, loading: false, tab: 'assets', items: [] };

  function esc(text){
    return String(text || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function digits(value){ return String(value || '').replace(/\D+/g, ''); }

  function phoneFmt(value){
    const d = digits(value);
    if(!d) return '';
    const base = d.length >= 10 ? d.slice(-10) : d;
    if(base.length === 10){
      return '+52 ' + base.slice(0, 3) + ' ' + base.slice(3, 6) + ' ' + base.slice(6);
    }
    return '+' + d;
  }

  function tsLabel(value){
    const n = Number(value || 0);
    if(!n) return '';
    const ms = n < 1000000000000 ? n * 1000 : n;
    try{ return new Date(ms).toLocaleString('es-MX'); }catch(_e){ return ''; }
  }

  function loadCrmMeta(){
    try{
      const parsed = JSON.parse(localStorage.getItem(CRM_META_KEY) || '{}');
      return parsed && typeof parsed === 'object' ? parsed : {};
    }catch(_e){ return {}; }
  }

  function saveCrmMeta(){
    try{ localStorage.setItem(CRM_META_KEY, JSON.stringify(crmMeta || {})); }catch(_e){}
  }

  function loadCrmConfig(){
    try{
      const parsed = JSON.parse(localStorage.getItem(CRM_CONFIG_KEY) || '{}');
      const funnel = Array.isArray(parsed && parsed.funnel) ? parsed.funnel.filter(Boolean) : [];
      const statuses = Array.isArray(parsed && parsed.statuses) ? parsed.statuses.filter(Boolean) : [];
      const agents = Array.isArray(parsed && parsed.agents) ? parsed.agents.filter(Boolean) : [];
      return {
        funnel: funnel.length ? funnel : DEFAULT_STAGES.slice(),
        statuses: statuses.length ? statuses : DEFAULT_STATUSES.slice(),
        agents: agents.length ? agents : DEFAULT_AGENTS.slice()
      };
    }catch(_e){
      return { funnel: DEFAULT_STAGES.slice(), statuses: DEFAULT_STATUSES.slice(), agents: DEFAULT_AGENTS.slice() };
    }
  }

  function getMeta(phone){
    const key = digits(phone);
    return key ? (crmMeta[key] || {}) : {};
  }

  function setMeta(phone, patch){
    const key = digits(phone);
    if(!key) return;
    crmMeta[key] = Object.assign({}, crmMeta[key] || {}, patch || {});
    saveCrmMeta();
  }

  function normalizeStage(value){
    const list = Array.isArray(crmConfig.funnel) && crmConfig.funnel.length ? crmConfig.funnel : DEFAULT_STAGES;
    const raw = String(value || '').trim();
    if(!raw) return list[0];
    const found = list.find((x) => String(x || '').toLowerCase() === raw.toLowerCase());
    return found || list[0];
  }

  function normalizeStatus(value){
    const list = Array.isArray(crmConfig.statuses) && crmConfig.statuses.length ? crmConfig.statuses : DEFAULT_STATUSES;
    const raw = String(value || '').trim();
    if(!raw) return list[0];
    const found = list.find((x) => String(x || '').toLowerCase() === raw.toLowerCase());
    return found || list[0];
  }

  function currentPhone(){ return digits(selected && (selected.phone || selected.id || '')); }

  function setHeaderFromSelected(){
    const p = currentPhone();
    const n = String(selected && selected.name || '').trim() || phoneFmt(p) || 'Sin seleccionar';
    if(nameEl) nameEl.textContent = n;
    if(phoneEl) phoneEl.textContent = p ? phoneFmt(p) : 'Selecciona una conversacion';
    if(avatarEl) avatarEl.textContent = (n.charAt(0) || '?').toUpperCase();
  }

  function markRailActive(moduleName){
    const target = String(moduleName || '').trim().toLowerCase();
    railButtons.forEach((btn) => {
      const mod = String(btn.dataset.module || '').trim().toLowerCase();
      btn.classList.toggle('active', mod === target);
    });
  }

  function openMediaModal(){
    if(!mediaBackdropEl) return;
    mediaBackdropEl.classList.add('open');
    mediaBackdropEl.setAttribute('aria-hidden', 'false');
  }

  function closeMediaModal(){
    if(!mediaBackdropEl) return;
    mediaBackdropEl.classList.remove('open');
    mediaBackdropEl.setAttribute('aria-hidden', 'true');
    setActiveModule(lastNonMediaModule || 'dashboard');
  }

  function setActiveModule(moduleName){
    const requested = String(moduleName || '').trim().toLowerCase() || 'dashboard';
    if(requested === 'multimedia'){
      markRailActive('multimedia');
      if(moduleTitleEl) moduleTitleEl.textContent = moduleTitles.multimedia;
      openMediaModal();
      ensureMultimediaLoaded().then(() => renderMultimedia());
      return;
    }

    const hasPanel = panels.some((p) => String(p.dataset.panel || '').trim().toLowerCase() === requested);
    const target = hasPanel ? requested : 'dashboard';

    lastNonMediaModule = target;
    markRailActive(target);

    panels.forEach((panel) => {
      const mod = String(panel.dataset.panel || '').trim().toLowerCase();
      panel.classList.toggle('active', mod === target);
    });

    if(moduleTitleEl) moduleTitleEl.textContent = moduleTitles[target] || moduleTitles.dashboard;
    if(topFunnelsControls){
      const show = target === 'funnels';
      topFunnelsControls.style.display = show ? 'flex' : 'none';
      topFunnelsControls.setAttribute('aria-hidden', show ? 'false' : 'true');
    }
    if(topLeadSearchBtn) topLeadSearchBtn.style.display = target === 'funnels' ? 'none' : '';

    try{ localStorage.setItem(ACTIVE_MODULE_KEY, target); }catch(_e){}
  }

  function bindRail(){
    railButtons.forEach((btn) => {
      btn.addEventListener('click', (ev) => {
        ev.preventDefault();
        setActiveModule(btn.getAttribute('data-module') || 'dashboard');
      });
    });

    let initial = 'dashboard';
    try{ initial = String(localStorage.getItem(ACTIVE_MODULE_KEY) || 'dashboard').trim().toLowerCase() || 'dashboard'; }catch(_e){}
    if(initial === 'multimedia') initial = 'dashboard';
    setActiveModule(initial);
  }

  function baseConversations(list){
    return (Array.isArray(list) ? list : []).map((item) => {
      const phone = digits(item && (item.phone || item.id || ''));
      if(!phone) return null;
      return {
        id: String(item && item.id || phone),
        phone,
        name: String(item && (item.name || item.contactName || '') || ''),
        lastText: String(item && item.lastText || ''),
        lastTimestamp: Number(item && (item.lastTimestamp || item.updatedAt) || 0)
      };
    }).filter(Boolean);
  }

  function visibleConversations(){
    const q = String(searchInput && searchInput.value || '').trim().toLowerCase();
    if(!q) return chats.slice();
    return chats.filter((row) => {
      return String(row.name || '').toLowerCase().includes(q)
        || String(row.phone || '').includes(q)
        || String(row.lastText || '').toLowerCase().includes(q);
    });
  }

  function renderContacts(){
    if(!contactsList) return;
    const rows = visibleConversations();
    if(!rows.length){
      contactsList.innerHTML = '<div style="padding:10px;color:#64748b;font-size:.84rem;">No hay conversaciones.</div>';
      return;
    }

    const selPhone = currentPhone();
    contactsList.innerHTML = '<div style="display:flex;flex-direction:column;gap:6px;">' + rows.map((row) => {
      const p = digits(row.phone);
      const title = String(row.name || '').trim() || phoneFmt(p);
      const subtitle = String(row.lastText || '').trim() || 'Sin mensajes';
      const active = selPhone && selPhone === p;
      const style = active
        ? 'padding:8px;border:1px solid #60a5fa;background:#eff6ff;border-radius:10px;cursor:pointer;'
        : 'padding:8px;border:1px solid #e2e8f0;background:#fff;border-radius:10px;cursor:pointer;';
      return '<button type="button" data-phone="' + esc(p) + '" style="width:100%;text-align:left;' + style + '">'
        + '<div style="font-size:.84rem;font-weight:700;color:#0f172a;">' + esc(title) + '</div>'
        + '<div style="font-size:.76rem;color:#64748b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + esc(subtitle) + '</div>'
        + '</button>';
    }).join('') + '</div>';
  }

  function renderConversation(messages){
    if(!convEl) return;
    const list = Array.isArray(messages) ? messages : [];
    if(!list.length){
      convEl.innerHTML = '<div style="padding:12px;color:#64748b;font-size:.86rem;">Sin mensajes en esta conversacion.</div>';
      return;
    }

    convEl.innerHTML = list.map((msg) => {
      const out = String(msg && msg.direction || '').trim().toLowerCase() === 'out';
      const text = String(msg && (msg.text || msg.caption) || '').trim();
      const mediaId = String(msg && msg.mediaId || '').trim();
      const mediaUrl = String(msg && msg.mediaUrl || '').trim() || (mediaId ? ('/wa/media/' + encodeURIComponent(mediaId)) : '');
      const mime = String(msg && msg.mimeType || '').toLowerCase();
      const msgType = String(msg && (msg.type || msg.messageType || msg.mediaType) || '').toLowerCase();
      const fileName = String(msg && msg.fileName || '').trim();
      const isSticker = msgType.includes('sticker');
      const isImage = !!mediaUrl && (mime.startsWith('image/') || msgType.includes('image') || isSticker || /\.(png|jpe?g|gif|webp|bmp|svg)(\?|$)/i.test(mediaUrl));
      const isVideo = !!mediaUrl && (mime.startsWith('video/') || msgType.includes('video') || /\.(mp4|webm|mov|m4v|avi)(\?|$)/i.test(mediaUrl));
      const isAudio = !!mediaUrl && (mime.startsWith('audio/') || msgType.includes('audio') || /\.(mp3|ogg|wav|m4a)(\?|$)/i.test(mediaUrl));
      const wrap = out ? 'display:flex;justify-content:flex-end;margin:6px 0;' : 'display:flex;justify-content:flex-start;margin:6px 0;';
      const bubble = out
        ? 'max-width:78%;padding:8px 10px;border-radius:12px;background:#dcfce7;color:#14532d;border:1px solid #86efac;'
        : 'max-width:78%;padding:8px 10px;border-radius:12px;background:#fff;color:#0f172a;border:1px solid #e2e8f0;';

      let mediaBlock = '';
      if(isImage){
        const badge = isSticker ? '<span style="position:absolute;left:6px;top:6px;background:#0f172a;color:#fff;border-radius:999px;padding:2px 6px;font-size:.68rem;">Sticker</span>' : '';
        mediaBlock = '<a href="' + esc(mediaUrl) + '" target="_blank" rel="noopener noreferrer" style="position:relative;display:block;margin:0 0 6px;">'
          + badge
          + '<img src="' + esc(mediaUrl) + '" alt="Imagen" style="max-width:220px;max-height:220px;display:block;border-radius:8px;border:1px solid #dbe4ea;">'
          + '</a>';
      }else if(isVideo){
        mediaBlock = '<details style="margin-bottom:6px;"><summary style="cursor:pointer;font-size:.82rem;color:#0f172a;">Abrir video</summary><video controls preload="none" style="max-width:220px;max-height:220px;border-radius:8px;border:1px solid #dbe4ea;background:#000;margin-top:6px;"><source src="' + esc(mediaUrl) + '" type="' + esc(mime || 'video/mp4') + '">Tu navegador no puede reproducir este video.</video></details>';
      }else if(isAudio){
        mediaBlock = '<audio controls preload="none" style="width:220px;max-width:100%;margin-bottom:6px;"><source src="' + esc(mediaUrl) + '" type="' + esc(mime || 'audio/mpeg') + '">Tu navegador no puede reproducir este audio.</audio>';
      }else if(mediaUrl){
        mediaBlock = '<div style="margin-bottom:6px;padding:8px;border:1px solid #dbe4ea;border-radius:8px;background:#f8fafc;"><strong style="display:block;font-size:.78rem;color:#334155;">Documento</strong><a href="' + esc(mediaUrl) + '" target="_blank" rel="noopener noreferrer">' + esc(fileName || 'Abrir archivo') + '</a></div>';
      }

      const textBlock = text
        ? ('<div style="white-space:pre-wrap;word-break:break-word;">' + esc(text) + '</div>')
        : (!mediaBlock ? '<div style="white-space:pre-wrap;word-break:break-word;">[sin texto]</div>' : '');

      return '<div style="' + wrap + '"><div style="' + bubble + '">'
        + mediaBlock
        + textBlock
        + '<div style="margin-top:4px;font-size:.7rem;opacity:.72;">' + esc(tsLabel(msg && (msg.timestamp || msg.createdAt || msg.sentAt))) + '</div>'
        + '</div></div>';
    }).join('');

    convEl.scrollTop = convEl.scrollHeight;
  }

  function renderCrmSelectors(){
    if(!funnelSelectEl || !statusSelectEl || !agentSelectEl) return;

    const funnel = Array.isArray(crmConfig.funnel) && crmConfig.funnel.length ? crmConfig.funnel : DEFAULT_STAGES;
    const statuses = Array.isArray(crmConfig.statuses) && crmConfig.statuses.length ? crmConfig.statuses : DEFAULT_STATUSES;
    const agents = Array.isArray(crmConfig.agents) && crmConfig.agents.length ? crmConfig.agents : DEFAULT_AGENTS;

    const p = currentPhone();
    const meta = getMeta(p);

    funnelSelectEl.innerHTML = funnel.map((x) => '<option value="' + esc(x) + '">' + esc(x) + '</option>').join('');
    statusSelectEl.innerHTML = statuses.map((x) => '<option value="' + esc(x) + '">' + esc(x) + '</option>').join('');
    agentSelectEl.innerHTML = agents.map((x) => '<option value="' + esc(x) + '">' + esc(x) + '</option>').join('');

    funnelSelectEl.value = normalizeStage(meta.funnel || meta.stage || '');
    statusSelectEl.value = normalizeStatus(meta.status || '');
    agentSelectEl.value = agents.includes(String(meta.agent || '')) ? String(meta.agent || '') : agents[0];

    const enabled = !!p;
    funnelSelectEl.disabled = !enabled;
    statusSelectEl.disabled = !enabled;
    agentSelectEl.disabled = !enabled;
  }

  async function fetchConversationMessages(phone){
    const p = digits(phone);
    if(!p) return [];
    try{
      const resp = await fetch('/wa/conversation?phone=' + encodeURIComponent(p) + '&limit=250');
      if(!resp.ok) return [];
      const data = await resp.json().catch(() => null);
      return data && Array.isArray(data.messages) ? data.messages : [];
    }catch(_e){ return []; }
  }

  async function openConversationByPhone(phone){
    const p = digits(phone);
    if(!p) return;
    selected = Object.assign({}, chats.find((row) => digits(row.phone) === p) || { phone: p, name: '' });
    setHeaderFromSelected();
    renderCrmSelectors();
    renderContacts();
    const messages = await fetchConversationMessages(p);
    renderConversation(messages);
  }

  function renderFunnelsHeader(){
    if(funnelsBoardNameTextEl) funnelsBoardNameTextEl.textContent = 'Embudo activo: VENTAS MENUDEO';
    if(funnelsBoardSelectEl){
      funnelsBoardSelectEl.innerHTML = '<option value="VENTAS MENUDEO">VENTAS MENUDEO</option>';
      funnelsBoardSelectEl.value = 'VENTAS MENUDEO';
    }
  }

  function stageForRow(row){
    const p = digits(row && row.phone || '');
    const meta = getMeta(p);
    return normalizeStage(meta.funnel || meta.stage || '');
  }

  function movePhoneToStage(phone, stage){
    const p = digits(phone);
    if(!p) return;
    const s = normalizeStage(stage);
    setMeta(p, { funnel: s, stage: s });
    renderFunnelsBoard();
    if(currentPhone() === p){ renderCrmSelectors(); }
  }

  function bindDragOnBoard(){
    if(!funnelsBoardEl) return;

    Array.from(funnelsBoardEl.querySelectorAll('.funnel-card[data-funnel-phone]')).forEach((card) => {
      card.setAttribute('draggable', 'true');
      card.addEventListener('dragstart', (ev) => {
        const p = card.getAttribute('data-funnel-phone') || '';
        ev.dataTransfer.effectAllowed = 'move';
        ev.dataTransfer.setData('text/plain', p);
      });
    });

    Array.from(funnelsBoardEl.querySelectorAll('.funnel-col-body[data-stage]')).forEach((col) => {
      col.addEventListener('dragover', (ev) => {
        ev.preventDefault();
        const wrap = col.closest('.funnel-col');
        if(wrap) wrap.classList.add('drag-over');
      });
      col.addEventListener('dragleave', () => {
        const wrap = col.closest('.funnel-col');
        if(wrap) wrap.classList.remove('drag-over');
      });
      col.addEventListener('drop', (ev) => {
        ev.preventDefault();
        const wrap = col.closest('.funnel-col');
        if(wrap) wrap.classList.remove('drag-over');
        const p = ev.dataTransfer.getData('text/plain');
        const s = col.getAttribute('data-stage') || '';
        if(p && s) movePhoneToStage(p, s);
      });
    });
  }

  function renderFunnelsBoard(){
    if(!funnelsBoardEl) return;

    const stages = Array.isArray(crmConfig.funnel) && crmConfig.funnel.length ? crmConfig.funnel : DEFAULT_STAGES;
    const buckets = new Map();
    stages.forEach((s) => buckets.set(s, []));

    chats.forEach((row) => {
      const stage = stageForRow(row);
      const target = buckets.has(stage) ? stage : stages[0];
      buckets.get(target).push(row);
    });

    funnelsBoardEl.innerHTML = stages.map((stage) => {
      const rows = (buckets.get(stage) || []).slice().sort((a,b) => Number(b.lastTimestamp || 0) - Number(a.lastTimestamp || 0));
      const cards = rows.length ? rows.map((row) => {
        const p = digits(row.phone);
        const title = String(row.name || '').trim() || phoneFmt(p);
        const subtitle = String(row.lastText || '').trim() || 'Sin actividad';
        const meta = getMeta(p);
        const status = normalizeStatus(meta.status || '');
        return '<button type="button" class="funnel-card" data-funnel-phone="' + esc(p) + '">'
          + '<div class="funnel-card-head"><div class="funnel-card-main">'
          + '<div class="funnel-card-title">' + esc(title) + '</div>'
          + '<div class="funnel-card-sub">' + esc(phoneFmt(p)) + '</div>'
          + '</div><div class="funnel-card-time">' + esc(tsLabel(row.lastTimestamp)) + '</div></div>'
          + '<div class="funnel-card-reason">' + esc(subtitle) + '</div>'
          + '<div class="funnel-card-meta"><span class="funnel-badge">' + esc(status) + '</span></div>'
          + '</button>';
      }).join('') : '<div class="funnel-empty">Sin leads en esta etapa.</div>';

      return '<section class="funnel-col">'
        + '<div class="funnel-col-head"><div class="funnel-col-title">' + esc(stage) + '</div><div class="funnel-col-count">' + rows.length + '</div></div>'
        + '<div class="funnel-col-body" data-stage="' + esc(stage) + '">' + cards + '</div>'
        + '</section>';
    }).join('');

    Array.from(funnelsBoardEl.querySelectorAll('[data-funnel-phone]')).forEach((btn) => {
      btn.addEventListener('click', async () => {
        const p = btn.getAttribute('data-funnel-phone');
        if(!p) return;
        setActiveModule('chats');
        await openConversationByPhone(p);
      });
    });

    bindDragOnBoard();
  }

  function renderDirectory(){
    if(!dirTableBodyEl) return;

    const rows = (Array.isArray(chats) ? chats : []).filter((row) => {
      if(directoryFilter === 'active'){
        const stage = String(stageForRow(row) || '').toLowerCase();
        return !stage.includes('archiv');
      }
      if(directoryFilter === 'archived'){
        const stage = String(stageForRow(row) || '').toLowerCase();
        return stage.includes('archiv');
      }
      return true;
    });

    if(!rows.length){
      dirTableBodyEl.innerHTML = '<tr><td colspan="8" style="padding:12px;color:#64748b;">Sin leads para este filtro.</td></tr>';
      return;
    }

    dirTableBodyEl.innerHTML = rows.map((row) => {
      const p = digits(row.phone);
      const meta = getMeta(p);
      const stage = normalizeStage(meta.funnel || meta.stage || '');
      const status = normalizeStatus(meta.status || '');
      const agent = String(meta.agent || (crmConfig.agents && crmConfig.agents[0]) || DEFAULT_AGENTS[0]);
      const state = stage.toLowerCase().includes('archiv') ? 'Archivado' : 'Activo';
      return '<tr data-dir-phone="' + esc(p) + '">'
        + '<td><input type="checkbox" data-dir-check="' + esc(p) + '"></td>'
        + '<td>' + esc(state) + '</td>'
        + '<td>' + esc(String(row.name || '').trim() || phoneFmt(p)) + '</td>'
        + '<td>' + esc(String(row.lastText || '').trim() || 'Sin mensajes') + '</td>'
        + '<td>' + esc(tsLabel(row.lastTimestamp) || '-') + '</td>'
        + '<td>' + esc(agent) + '</td>'
        + '<td>' + esc(stage) + '</td>'
        + '<td>' + esc(status) + '</td>'
        + '</tr>';
    }).join('');
  }

  function bindDirectoryTabs(){
    const tabs = [dirTabAllEl, dirTabActiveEl, dirTabArchivedEl].filter(Boolean);

    function setFilter(next){
      directoryFilter = next;
      tabs.forEach((tab) => {
        const on = String(tab.getAttribute('data-dir-filter') || '') === next;
        tab.classList.toggle('active', on);
        tab.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      renderDirectory();
    }

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        setFilter(String(tab.getAttribute('data-dir-filter') || 'all'));
      });
    });

    setFilter('all');
  }

  function extractLinks(text){
    const src = String(text || '');
    const re = /https?:\/\/[^\s]+/gi;
    const out = [];
    let m;
    while((m = re.exec(src))){ out.push(m[0]); }
    return out;
  }

  function classifyMedia(msg, phone, name){
    const mediaId = String(msg && msg.mediaId || '').trim();
    const mediaUrl = String(msg && msg.mediaUrl || '').trim() || (mediaId ? ('/wa/media/' + encodeURIComponent(mediaId)) : '');
    const mime = String(msg && msg.mimeType || '').toLowerCase();
    const fileName = String(msg && msg.fileName || '').trim();
    const text = String(msg && (msg.text || msg.caption) || '').trim();
    const when = Number(msg && (msg.timestamp || msg.createdAt || msg.sentAt) || 0);

    const out = [];
    if(mediaUrl){
      const msgType = String(msg && (msg.type || msg.messageType || msg.mediaType) || '').toLowerCase();
      const isImage = mime.startsWith('image/') || msgType.includes('image') || /\.(png|jpe?g|gif|webp|bmp|svg)(\?|$)/i.test(mediaUrl);
      const isVideo = mime.startsWith('video/') || msgType.includes('video') || /\.(mp4|webm|mov|m4v|avi)(\?|$)/i.test(mediaUrl);
      const isAudio = mime.startsWith('audio/') || msgType.includes('audio') || /\.(mp3|ogg|wav|m4a)(\?|$)/i.test(mediaUrl);
      const previewType = isSticker ? 'sticker' : (isImage ? 'image' : (isVideo ? 'video' : (isAudio ? 'audio' : 'doc')));
      const kind = (previewType === 'doc' || previewType === 'links') ? 'docs' : 'assets';
      out.push({ kind, previewType, mime, phone, name, when, url: mediaUrl, label: fileName || text || mediaUrl });
    }

    extractLinks(text).forEach((url) => {
      out.push({ kind: 'links', phone, name, when, url, label: url });
    });

    return out;
  }

  async function ensureMultimediaLoaded(){
    if(multimedia.loading) return;
    if(multimedia.loaded) return;

    multimedia.loading = true;
    try{
      const rows = (Array.isArray(chats) ? chats : []).slice(0, 120);
      const all = [];
      for(const row of rows){
        const msgs = await fetchConversationMessages(row.phone);
        msgs.forEach((msg) => {
          classifyMedia(msg, row.phone, row.name).forEach((it) => all.push(it));
        });
      }
      multimedia.items = all.sort((a,b) => Number(b.when || 0) - Number(a.when || 0));
    }catch(e){
      console.warn('ensureMultimediaLoaded', e);
      multimedia.items = [];
    }
    multimedia.loaded = true;
    multimedia.loading = false;
  }

  function renderMultimedia(){
    if(!mediaContentEl) return;
    if(multimedia.loading){
      mediaContentEl.innerHTML = '<div style="padding:12px;color:#64748b;">Cargando multimedia...</div>';
      return;
    }

    const tab = multimedia.tab;
    const q = String(mediaSearchInputEl && mediaSearchInputEl.value || '').trim().toLowerCase();
    let rows = (multimedia.items || []).filter((it) => it.kind === tab);

    if(q){
      rows = rows.filter((it) => {
        return String(it.label || '').toLowerCase().includes(q)
          || String(it.url || '').toLowerCase().includes(q)
          || String(it.name || '').toLowerCase().includes(q)
          || String(it.phone || '').includes(q);
      });
    }

    if(!rows.length){
      mediaContentEl.innerHTML = '<div style="padding:12px;color:#64748b;">Sin elementos para esta pestana.</div>';
      return;
    }

    const monthFmt = new Intl.DateTimeFormat('es-MX', { month: 'long', year: 'numeric' });
    const groups = new Map();
    rows.forEach((it) => {
      const ts = Number(it && it.when || 0);
      const d = ts ? new Date(ts < 1000000000000 ? ts * 1000 : ts) : new Date();
      const key = String(d.getFullYear()) + '-' + String(d.getMonth() + 1).padStart(2, '0');
      if(!groups.has(key)) groups.set(key, { date: d, items: [] });
      groups.get(key).items.push(it);
    });

    const monthKeys = Array.from(groups.keys()).sort((a,b) => a < b ? 1 : -1);
    const html = monthKeys.map((monthKey) => {
      const bucket = groups.get(monthKey);
      const title = monthFmt.format(bucket.date);
      const cards = (bucket.items || []).map((it) => {
        const previewType = String(it && it.previewType || '').toLowerCase();
        const type = tab === 'links'
          ? 'Enlace'
          : (tab === 'docs'
            ? 'Documento'
            : (previewType === 'sticker' ? 'Sticker' : (previewType === 'image' ? 'Imagen' : (previewType === 'video' ? 'Video' : (previewType === 'audio' ? 'Audio' : 'Multimedia')))));

        let mediaHtml = '<a href="' + esc(it.url) + '" target="_blank" rel="noopener noreferrer" style="font-size:.82rem;">' + esc(it.label || it.url || 'Abrir') + '</a>';
        if(tab === 'assets'){
          if(previewType === 'image' || previewType === 'sticker'){
            mediaHtml = '<img src="' + esc(it.url) + '" alt="' + esc(type) + '" style="width:100%;height:170px;object-fit:cover;border-radius:10px;border:1px solid #dbe4ea;">';
          }else if(previewType === 'video'){
            mediaHtml = '<details style="width:100%;"><summary style="cursor:pointer;padding:8px;border:1px solid #dbe4ea;border-radius:8px;background:#f8fafc;font-size:.82rem;">Abrir video</summary><video controls preload="none" style="width:100%;max-height:220px;margin-top:8px;border-radius:10px;border:1px solid #dbe4ea;background:#000;"><source src="' + esc(it.url) + '" type="' + esc(String(it && it.mime || '') || 'video/mp4') + '">Tu navegador no puede reproducir este video.</video></details>';
          }else if(previewType === 'audio'){
            mediaHtml = '<div style="padding:10px;border:1px solid #dbe4ea;border-radius:10px;background:#f8fafc;"><audio controls preload="none" style="width:100%;"><source src="' + esc(it.url) + '" type="' + esc(String(it && it.mime || '') || 'audio/mpeg') + '">Tu navegador no puede reproducir este audio.</audio></div>';
          }
        }

        return '<article style="display:flex;flex-direction:column;gap:8px;padding:10px;background:#fff;border:1px solid #e2e8f0;border-radius:12px;">'
          + mediaHtml
          + '<div style="font-size:.82rem;font-weight:700;color:#0f172a;">' + esc(type) + '</div>'
          + '<div style="font-size:.78rem;color:#334155;">' + esc(String(it.name || '').trim() || phoneFmt(it.phone)) + '</div>'
          + '<div style="font-size:.72rem;color:#64748b;">' + esc(phoneFmt(it.phone)) + ' | ' + esc(tsLabel(it.when) || '-') + '</div>'
          + '</article>';
      }).join('');

      return '<section style="margin-bottom:16px;">'
        + '<h3 style="margin:0 0 10px;font-size:.9rem;color:#334155;text-transform:capitalize;">' + esc(title) + '</h3>'
        + '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px;">' + cards + '</div>'
        + '</section>';
    }).join('');

    mediaContentEl.innerHTML = html;
  }

  async function loadConversations(keepCurrent){
    try{
      crmMeta = loadCrmMeta();
      crmConfig = loadCrmConfig();

      const resp = await fetch('/wa/conversations?limit=200');
      if(!resp.ok) throw new Error('wa/conversations ' + String(resp.status));
      const data = await resp.json().catch(() => null);
      chats = baseConversations(data && data.conversations || []).sort((a,b) => Number(b.lastTimestamp || 0) - Number(a.lastTimestamp || 0));

      renderContacts();
      renderFunnelsHeader();
      renderFunnelsBoard();
      renderDirectory();

      multimedia.loaded = false;
      if(mediaBackdropEl && mediaBackdropEl.classList.contains('open')){
        ensureMultimediaLoaded().then(() => renderMultimedia());
      }

      const keep = keepCurrent ? currentPhone() : '';
      if(keep && chats.some((c) => digits(c.phone) === keep)){
        await openConversationByPhone(keep);
      }else if(!selected && chats.length){
        await openConversationByPhone(chats[0].phone);
      }else{
        renderCrmSelectors();
      }
    }catch(e){
      console.warn('loadConversations', e);
      if(contactsList){
        contactsList.innerHTML = '<div style="padding:10px;color:#b91c1c;font-size:.84rem;">No se pudieron cargar conversaciones.</div>';
      }
      if(dirTableBodyEl){
        dirTableBodyEl.innerHTML = '<tr><td colspan="8" style="padding:12px;color:#b91c1c;">No se pudo cargar directorio.</td></tr>';
      }
    }
  }

  async function sendSelectedConversationMessage(){
    const p = currentPhone();
    const text = String(msgInput && msgInput.value || '').trim();
    if(!p || !text || !sendBtn) return;

    sendBtn.disabled = true;
    try{
      const resp = await fetch('/send-whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: p, message: text })
      });
      if(!resp.ok) throw new Error('HTTP ' + String(resp.status));
      if(msgInput) msgInput.value = '';
      await openConversationByPhone(p);
      await loadConversations(true);
    }catch(e){
      alert('No se pudo enviar el mensaje: ' + String(e && e.message || e));
    }
    sendBtn.disabled = false;
  }

  function bindCrmSelectors(){
    if(funnelSelectEl){
      funnelSelectEl.addEventListener('change', () => {
        const p = currentPhone();
        if(!p) return;
        const s = normalizeStage(funnelSelectEl.value);
        setMeta(p, { funnel: s, stage: s });
        renderFunnelsBoard();
        renderDirectory();
      });
    }

    if(statusSelectEl){
      statusSelectEl.addEventListener('change', () => {
        const p = currentPhone();
        if(!p) return;
        setMeta(p, { status: normalizeStatus(statusSelectEl.value) });
        renderFunnelsBoard();
        renderDirectory();
      });
    }

    if(agentSelectEl){
      agentSelectEl.addEventListener('change', () => {
        const p = currentPhone();
        if(!p) return;
        setMeta(p, { agent: String(agentSelectEl.value || '') });
        renderDirectory();
      });
    }
  }

  function bindRuntime(){
    bindRail();
    bindCrmSelectors();
    bindDirectoryTabs();

    if(searchInput){
      searchInput.addEventListener('input', () => renderContacts());
    }

    if(contactsList){
      contactsList.addEventListener('click', (ev) => {
        const btn = ev.target && ev.target.closest ? ev.target.closest('[data-phone]') : null;
        if(!btn) return;
        const p = btn.getAttribute('data-phone');
        if(p) openConversationByPhone(p);
      });
    }

    if(sendBtn){
      sendBtn.addEventListener('click', () => sendSelectedConversationMessage());
    }

    if(msgInput){
      msgInput.addEventListener('keydown', (ev) => {
        if(ev.key === 'Enter' && !ev.shiftKey){
          ev.preventDefault();
          sendSelectedConversationMessage();
        }
      });
    }


    if(mediaCloseBtnEl){
      mediaCloseBtnEl.addEventListener('click', () => closeMediaModal());
    }

    if(mediaBackdropEl){
      mediaBackdropEl.addEventListener('click', (ev) => {
        if(ev.target === mediaBackdropEl) closeMediaModal();
      });
    }

    if(mediaSearchInputEl){
      mediaSearchInputEl.addEventListener('input', () => renderMultimedia());
    }

    mediaTabButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const tab = String(btn.getAttribute('data-media-tab') || 'assets');
        multimedia.tab = tab;
        mediaTabButtons.forEach((x) => x.classList.toggle('active', x === btn));
        renderMultimedia();
      });
    });
  }

  async function init(){
    bindRuntime();
    setHeaderFromSelected();
    renderConversation([]);
    renderCrmSelectors();
    await loadConversations(false);
    setInterval(() => { loadConversations(true); }, 15000);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', () => { init(); }, { once:true });
  }else{
    init();
  }
})();
