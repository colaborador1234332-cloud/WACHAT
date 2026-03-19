(() => {
  const moduleTitleEl = document.getElementById('waModuleTitle');
  const railButtons = Array.from(document.querySelectorAll('.wa-rail-btn[data-module]'));
  const panels = Array.from(document.querySelectorAll('.wa-panel[data-panel]'));
  const topLeadSearchBtn = document.getElementById('waLeadSearchOpen');
  const topFunnelsControls = document.getElementById('waFunnelsTopControls');

  const contactsList = document.getElementById('waContactsList');
  const searchInput = document.getElementById('waSearchContact');
  const convEl = document.getElementById('waConversation');
  const nameEl = document.getElementById('waSelectedName');
  const phoneEl = document.getElementById('waSelectedPhone');
  const avatarEl = document.getElementById('waHeaderAvatar');
  const msgInput = document.getElementById('waMessageInput');
  const sendBtn = document.getElementById('waSendBtn');

  const funnelsBoardEl = document.getElementById('waFunnelsBoard');
  const funnelsBoardNameTextEl = document.getElementById('waFunnelsBoardNameText');
  const funnelsBoardSelectEl = document.getElementById('waFunnelsBoardSelect');
  const addLeadTargetEl = document.getElementById('waAddLeadTarget');

  const ACTIVE_MODULE_KEY = 'waActiveModuleV1';
  const CRM_META_KEY = 'waCrmMetaV1';
  const CRM_CONFIG_KEY = 'waCrmConfigV1';
  const DEFAULT_STAGES = [
    'Lead nuevo',
    'Contacto inicial',
    'Cotizacion enviada',
    'Seguimiento 1',
    'Seguimiento 2',
    'Cierre de venta',
    'Perdidos',
    'Archivados'
  ];

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

  let chats = [];
  let selected = null;
  let crmMeta = loadCrmMeta();
  let crmConfig = loadCrmConfig();

  function escHtml(text){
    return String(text || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function normDigits(value){
    return String(value || '').replace(/\D+/g, '');
  }

  function displayPhone(value){
    const digits = normDigits(value);
    if(!digits) return '';
    const base = digits.length >= 10 ? digits.slice(-10) : digits;
    if(base.length === 10){
      return '+52 ' + base.slice(0, 3) + ' ' + base.slice(3, 6) + ' ' + base.slice(6);
    }
    return '+' + digits;
  }

  function tsToLabel(ts){
    const n = Number(ts || 0);
    if(!n) return '';
    const ms = n < 1000000000000 ? n * 1000 : n;
    try{ return new Date(ms).toLocaleString('es-MX'); }catch(_e){ return ''; }
  }

  function loadCrmMeta(){
    try{
      const parsed = JSON.parse(localStorage.getItem(CRM_META_KEY) || '{}');
      return parsed && typeof parsed === 'object' ? parsed : {};
    }catch(_e){
      return {};
    }
  }

  function loadCrmConfig(){
    try{
      const parsed = JSON.parse(localStorage.getItem(CRM_CONFIG_KEY) || '{}');
      const rawFunnel = Array.isArray(parsed && parsed.funnel) ? parsed.funnel : [];
      const funnel = rawFunnel.filter(Boolean);
      return { funnel: funnel.length ? funnel : DEFAULT_STAGES.slice() };
    }catch(_e){
      return { funnel: DEFAULT_STAGES.slice() };
    }
  }

  function getMeta(phone){
    const key = normDigits(phone);
    return key ? (crmMeta[key] || {}) : {};
  }

  function normalizeLeadFunnelLabel(value){
    const raw = String(value || '').trim();
    if(!raw) return (crmConfig.funnel[0] || DEFAULT_STAGES[0]);
    const list = Array.isArray(crmConfig.funnel) ? crmConfig.funnel : DEFAULT_STAGES;
    const found = list.find((stage) => String(stage || '').trim().toLowerCase() === raw.toLowerCase());
    return found || (list[0] || DEFAULT_STAGES[0]);
  }

  function currentSelectedPhone(){
    return normDigits(selected && (selected.phone || selected.id || ''));
  }

  function setChatHeaderFromSelected(){
    const phone = currentSelectedPhone();
    const name = String(selected && selected.name || '').trim() || displayPhone(phone) || 'Sin seleccionar';
    if(nameEl) nameEl.textContent = name;
    if(phoneEl) phoneEl.textContent = phone ? displayPhone(phone) : 'Selecciona una conversacion';
    if(avatarEl) avatarEl.textContent = (name.charAt(0) || '?').toUpperCase();
  }

  function setActiveModule(moduleName){
    const target = String(moduleName || '').trim().toLowerCase();
    railButtons.forEach((btn) => {
      const mod = String(btn.getAttribute('data-module') || '').trim().toLowerCase();
      btn.classList.toggle('active', mod === target);
    });
    panels.forEach((panel) => {
      const mod = String(panel.getAttribute('data-panel') || '').trim().toLowerCase();
      panel.classList.toggle('active', mod === target);
    });
    if(moduleTitleEl) moduleTitleEl.textContent = moduleTitles[target] || 'MAQUILEROS - DASHBOARD';
    if(topFunnelsControls){
      const show = target === 'funnels';
      topFunnelsControls.style.display = show ? 'flex' : 'none';
      topFunnelsControls.setAttribute('aria-hidden', show ? 'false' : 'true');
    }
    if(topLeadSearchBtn) topLeadSearchBtn.style.display = target === 'funnels' ? 'none' : '';
    try{ localStorage.setItem(ACTIVE_MODULE_KEY, target); }catch(_e){}
  }

  function bindModuleRail(){
    railButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        setActiveModule(btn.getAttribute('data-module') || 'dashboard');
      });
    });
    let initial = 'dashboard';
    try{ initial = String(localStorage.getItem(ACTIVE_MODULE_KEY) || 'dashboard').trim().toLowerCase() || 'dashboard'; }catch(_e){}
    setActiveModule(initial);
  }

  function baseConversationView(list){
    return (Array.isArray(list) ? list : []).map((item) => {
      const phone = normDigits(item && (item.phone || item.id || ''));
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
    const needle = String(searchInput && searchInput.value || '').trim().toLowerCase();
    if(!needle) return chats.slice();
    return chats.filter((row) => {
      const name = String(row.name || '').toLowerCase();
      const phone = String(row.phone || '');
      const lastText = String(row.lastText || '').toLowerCase();
      return name.includes(needle) || phone.includes(needle) || lastText.includes(needle);
    });
  }

  function renderContacts(){
    if(!contactsList) return;
    const rows = visibleConversations();
    if(!rows.length){
      contactsList.innerHTML = '<div style="padding:10px;color:#64748b;font-size:.84rem;">No hay conversaciones.</div>';
      return;
    }
    const selectedPhone = currentSelectedPhone();
    const html = rows.map((row) => {
      const phone = normDigits(row.phone);
      const title = String(row.name || '').trim() || displayPhone(phone);
      const subtitle = String(row.lastText || '').trim() || 'Sin mensajes';
      const active = selectedPhone && selectedPhone === phone;
      const style = active
        ? 'padding:8px;border:1px solid #60a5fa;background:#eff6ff;border-radius:10px;cursor:pointer;'
        : 'padding:8px;border:1px solid #e2e8f0;background:#fff;border-radius:10px;cursor:pointer;';
      return '<button type="button" data-phone="' + escHtml(phone) + '" style="width:100%;text-align:left;' + style + '">'
        + '<div style="font-size:.84rem;font-weight:700;color:#0f172a;">' + escHtml(title) + '</div>'
        + '<div style="font-size:.76rem;color:#64748b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + escHtml(subtitle) + '</div>'
        + '</button>';
    }).join('');
    contactsList.innerHTML = '<div style="display:flex;flex-direction:column;gap:6px;">' + html + '</div>';
  }

  function renderConversation(messages){
    if(!convEl) return;
    const list = Array.isArray(messages) ? messages : [];
    if(!list.length){
      convEl.innerHTML = '<div style="padding:12px;color:#64748b;font-size:.86rem;">Sin mensajes en esta conversacion.</div>';
      return;
    }
    const html = list.map((msg) => {
      const direction = String(msg && msg.direction || '').trim().toLowerCase() === 'out' ? 'out' : 'in';
      const text = String(msg && (msg.text || msg.caption) || '').trim();
      const mediaUrl = String(msg && msg.mediaUrl || '').trim() || (String(msg && msg.mediaId || '').trim() ? ('/wa/media/' + encodeURIComponent(String(msg && msg.mediaId || '').trim())) : '');
      const mimeType = String(msg && msg.mimeType || '').trim().toLowerCase();
      const fileName = String(msg && msg.fileName || '').trim();
      const when = tsToLabel(msg && (msg.timestamp || msg.createdAt || msg.sentAt));
      const wrap = direction === 'out' ? 'display:flex;justify-content:flex-end;margin:6px 0;' : 'display:flex;justify-content:flex-start;margin:6px 0;';
      const bubble = direction === 'out'
        ? 'max-width:78%;padding:8px 10px;border-radius:12px;background:#dcfce7;color:#14532d;border:1px solid #86efac;'
        : 'max-width:78%;padding:8px 10px;border-radius:12px;background:#fff;color:#0f172a;border:1px solid #e2e8f0;';

      const isImage = mediaUrl && (mimeType.startsWith('image/') || /\.(png|jpe?g|gif|webp|bmp|svg)(\?|$)/i.test(mediaUrl));
      const isVideo = mediaUrl && (mimeType.startsWith('video/') || /\.(mp4|webm|mov|m4v|avi)(\?|$)/i.test(mediaUrl));
      const isAudio = mediaUrl && (mimeType.startsWith('audio/') || /\.(mp3|ogg|wav|m4a)(\?|$)/i.test(mediaUrl));
      let mediaBlock = '';
      if(isImage){
        mediaBlock = '<div style="margin-bottom:6px;"><a href="' + escHtml(mediaUrl) + '" target="_blank" rel="noopener noreferrer"><img src="' + escHtml(mediaUrl) + '" alt="Imagen" style="max-width:220px;max-height:220px;display:block;border-radius:8px;border:1px solid #dbe4ea;"></a></div>';
      }else if(isVideo){
        mediaBlock = '<div style="margin-bottom:6px;"><video controls preload="metadata" style="max-width:240px;max-height:240px;border-radius:8px;border:1px solid #dbe4ea;background:#000;"><source src="' + escHtml(mediaUrl) + '" type="' + escHtml(mimeType || 'video/mp4') + '">Tu navegador no puede reproducir este video.</video></div>';
      }else if(isAudio){
        mediaBlock = '<div style="margin-bottom:6px;"><audio controls preload="metadata" style="width:240px;"><source src="' + escHtml(mediaUrl) + '" type="' + escHtml(mimeType || 'audio/mpeg') + '">Tu navegador no puede reproducir este audio.</audio></div>';
      }else if(mediaUrl){
        mediaBlock = '<div style="margin-bottom:6px;padding:8px;border:1px solid #dbe4ea;border-radius:8px;background:#f8fafc;"><strong style="display:block;font-size:.78rem;color:#334155;">Documento</strong><a href="' + escHtml(mediaUrl) + '" target="_blank" rel="noopener noreferrer">' + escHtml(fileName || 'Abrir archivo') + '</a></div>';
      }
      return '<div style="' + wrap + '"><div style="' + bubble + '">'
        + mediaBlock
        + '<div style="white-space:pre-wrap;word-break:break-word;">' + escHtml(text || '[sin texto]') + '</div>'
        + '<div style="margin-top:4px;font-size:.7rem;opacity:.72;">' + escHtml(when) + '</div>'
        + '</div></div>';
    }).join('');
    convEl.innerHTML = html;
    convEl.scrollTop = convEl.scrollHeight;
  }

  async function fetchConversationMessages(phone){
    const digits = normDigits(phone);
    if(!digits) return [];
    try{
      const resp = await fetch('/wa/conversation?phone=' + encodeURIComponent(digits) + '&limit=250');
      if(!resp.ok) return [];
      const data = await resp.json().catch(() => null);
      return data && Array.isArray(data.messages) ? data.messages : [];
    }catch(_e){
      return [];
    }
  }

  async function openConversationByPhone(phone){
    const digits = normDigits(phone);
    if(!digits) return;
    const found = chats.find((row) => normDigits(row.phone) === digits) || { phone: digits, name: '' };
    selected = Object.assign({}, found);
    setChatHeaderFromSelected();
    renderContacts();
    const messages = await fetchConversationMessages(digits);
    renderConversation(messages);
  }

  function renderAddLeadTargets(){
    if(!addLeadTargetEl) return;
    addLeadTargetEl.innerHTML = '';
    const boards = ['VENTAS MENUDEO'];
    boards.forEach((name) => {
      const op = document.createElement('option');
      op.value = name;
      op.textContent = name;
      addLeadTargetEl.appendChild(op);
    });
    addLeadTargetEl.value = boards[0];
  }

  function stageForConversation(row){
    const phone = normDigits(row && row.phone || '');
    const meta = getMeta(phone);
    const raw = String(meta && (meta.funnel || meta.stage) || '').trim();
    return normalizeLeadFunnelLabel(raw);
  }

  function renderFunnelsBoardHeader(){
    if(funnelsBoardNameTextEl) funnelsBoardNameTextEl.textContent = 'Embudo activo: VENTAS MENUDEO';
    if(funnelsBoardSelectEl){
      funnelsBoardSelectEl.innerHTML = '<option value="VENTAS MENUDEO">VENTAS MENUDEO</option>';
      funnelsBoardSelectEl.value = 'VENTAS MENUDEO';
    }
    renderAddLeadTargets();
  }

  function renderFunnelsBoard(){
    if(!funnelsBoardEl) return;
    const stages = Array.isArray(crmConfig && crmConfig.funnel) && crmConfig.funnel.length
      ? crmConfig.funnel.slice()
      : DEFAULT_STAGES.slice();

    const buckets = new Map();
    stages.forEach((stage) => buckets.set(stage, []));
    chats.forEach((row) => {
      const stage = stageForConversation(row);
      const target = buckets.has(stage) ? stage : stages[0];
      buckets.get(target).push(row);
    });

    funnelsBoardEl.innerHTML = stages.map((stage) => {
      const rows = (buckets.get(stage) || []).slice().sort((a,b) => Number(b.lastTimestamp || 0) - Number(a.lastTimestamp || 0));
      const cards = rows.length
        ? rows.map((row) => {
            const phone = normDigits(row.phone);
            const title = String(row.name || '').trim() || displayPhone(phone);
            const subtitle = String(row.lastText || '').trim() || 'Sin actividad';
            return '<button type="button" class="funnel-card" data-funnel-phone="' + escHtml(phone) + '">'
              + '<div class="funnel-card-title">' + escHtml(title) + '</div>'
              + '<div class="funnel-card-sub">' + escHtml(displayPhone(phone)) + '</div>'
              + '<div class="funnel-card-reason">' + escHtml(subtitle) + '</div>'
              + '</button>';
          }).join('')
        : '<div class="funnel-empty">Sin leads en esta etapa.</div>';
      return '<section class="funnel-col">'
        + '<div class="funnel-col-head"><div class="funnel-col-title">' + escHtml(stage) + '</div><div class="funnel-col-count">' + String(rows.length) + '</div></div>'
        + '<div class="funnel-col-body">' + cards + '</div>'
        + '</section>';
    }).join('');

    Array.from(funnelsBoardEl.querySelectorAll('[data-funnel-phone]')).forEach((btn) => {
      btn.addEventListener('click', async () => {
        const phone = btn.getAttribute('data-funnel-phone');
        if(!phone) return;
        setActiveModule('chats');
        await openConversationByPhone(phone);
      });
    });
  }

  async function loadConversations(keepCurrent){
    try{
      crmMeta = loadCrmMeta();
      crmConfig = loadCrmConfig();
      const resp = await fetch('/wa/conversations?limit=200');
      if(!resp.ok) throw new Error('wa/conversations ' + String(resp.status));
      const data = await resp.json().catch(() => null);
      chats = baseConversationView(data && data.conversations || []).sort((a,b) => Number(b.lastTimestamp || 0) - Number(a.lastTimestamp || 0));
      renderContacts();
      renderFunnelsBoardHeader();
      renderFunnelsBoard();

      const keepPhone = keepCurrent ? currentSelectedPhone() : '';
      if(keepPhone){
        const stillThere = chats.find((c) => normDigits(c.phone) === keepPhone);
        if(stillThere){
          await openConversationByPhone(keepPhone);
          return;
        }
      }
      if(!selected && chats.length){
        await openConversationByPhone(chats[0].phone);
      }
    }catch(e){
      console.warn('loadConversations', e);
      if(contactsList) contactsList.innerHTML = '<div style="padding:10px;color:#b91c1c;font-size:.84rem;">No se pudieron cargar conversaciones.</div>';
    }
  }

  async function sendSelectedConversationMessage(){
    const phone = currentSelectedPhone();
    const text = String(msgInput && msgInput.value || '').trim();
    if(!phone || !text || !sendBtn) return;
    sendBtn.disabled = true;
    try{
      const resp = await fetch('/send-whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: phone, message: text })
      });
      if(!resp.ok) throw new Error('HTTP ' + String(resp.status));
      if(msgInput) msgInput.value = '';
      await openConversationByPhone(phone);
      await loadConversations(true);
    }catch(e){
      alert('No se pudo enviar el mensaje: ' + String(e && e.message || e));
    }
    sendBtn.disabled = false;
  }

  function bindRuntime(){
    bindModuleRail();

    if(searchInput){
      searchInput.addEventListener('input', () => renderContacts());
    }

    if(contactsList){
      contactsList.addEventListener('click', (ev) => {
        const btn = ev.target && ev.target.closest ? ev.target.closest('[data-phone]') : null;
        if(!btn) return;
        const phone = btn.getAttribute('data-phone');
        if(phone) openConversationByPhone(phone);
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
  }

  async function init(){
    bindRuntime();
    setChatHeaderFromSelected();
    renderConversation([]);
    await loadConversations(false);
    setInterval(() => { loadConversations(true); }, 15000);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', () => { init(); }, { once:true });
  }else{
    init();
  }
})();
(function(){
  const contactsList = document.getElementById('waContactsList');
  const searchInput = document.getElementById('waSearchContact');
  const chatQuickFiltersEl = document.getElementById('waChatQuickFilters');
  const leadHistoryBtn = document.getElementById('waLeadHistoryBtn');
  const historyBackdropEl = document.getElementById('waHistoryBackdrop');
  const historyCloseBtn = document.getElementById('waHistoryCloseBtn');
  const historyListEl = document.getElementById('waHistoryList');
  const historyTitleEl = document.getElementById('waHistoryTitle');
  const msgDeleteBackdropEl = document.getElementById('waMsgDeleteBackdrop');
  const msgDeleteTextEl = document.getElementById('waMsgDeleteText');
  const msgDeleteCancelBtn = document.getElementById('waMsgDeleteCancelBtn');
  const msgDeleteMeBtn = document.getElementById('waMsgDeleteMeBtn');
  const msgDeleteAllBtn = document.getElementById('waMsgDeleteAllBtn');
  const convEl = document.getElementById('waConversation');
  const nameEl = document.getElementById('waSelectedName');
  const phoneEl = document.getElementById('waSelectedPhone');
  const avatarEl = document.getElementById('waHeaderAvatar');
  const assignedBadgeEl = document.getElementById('waAssignedBadge');
  const moduleTitleEl = document.getElementById('waModuleTitle');
  const chatsPanelEl = document.getElementById('waPanelChats');
  const mediaListEl = document.getElementById('waMediaList');
  const railEl = document.getElementById('waRail');
  const railToggleBtn = document.getElementById('waRailToggle');

  const sendBtn = document.getElementById('waSendBtn');
  const msgInput = document.getElementById('waMessageInput');
  const replyPreviewEl = document.getElementById('waReplyPreview');
  const replyPreviewSenderEl = document.getElementById('waReplyPreviewSender');
  const replyPreviewTextEl = document.getElementById('waReplyPreviewText');
  const replyPreviewCloseBtn = document.getElementById('waReplyPreviewClose');
  const emojiBtn = document.getElementById('waEmojiBtn');
  const quickAddBtn = document.getElementById('waQuickAddBtn');
  const quickRepliesBtn = document.getElementById('waQuickRepliesBtn');
  const scheduleEventBtn = document.getElementById('waScheduleEventBtn');
  const scheduleMessageBtn = document.getElementById('waScheduleMessageBtn');
  const sendAudioBtn = document.getElementById('waSendAudioBtn');
  const composerMoreMenuEl = document.getElementById('waComposerMoreMenu');
  const uploadAnyFileInputEl = document.getElementById('waUploadAnyFileInput');
  const funnelSelectEl = document.getElementById('waFunnelSelect');
  const agentSelectEl = document.getElementById('waAgentSelect');
  const statusSelectEl = document.getElementById('waStatusSelect');
  const archiveBtn = document.getElementById('waArchiveBtn');
  const closeWonBtn = document.getElementById('waCloseWonBtn');

  const catalogTypeEl = document.getElementById('waCatalogType');
  const catalogAddBtnEl = document.getElementById('waCatalogAddBtn');
  const catalogTableBodyEl = document.getElementById('waCatalogTableBody');
  const settingsSaveCrmBtnEl = document.getElementById('waSettingsSaveCrmBtn');
  const settingsSaveFunnelsBtnEl = document.getElementById('waSettingsSaveFunnelsBtn');
  const settingsSaveUsersBtnEl = document.getElementById('waSettingsSaveUsersBtn');
  const settingsSaveRepliesBtnEl = document.getElementById('waSettingsSaveRepliesBtn');
  const cfgMessageEl = document.getElementById('waCfgMessage');
  const demoClientsEnabledEl = document.getElementById('waDemoClientsEnabled');
  const demoClientsApplyBtn = document.getElementById('waDemoClientsApplyBtn');
  const demoClientsMessageEl = document.getElementById('waDemoClientsMessage');
  const demoEverythingEnabledEl = document.getElementById('waDemoEverythingEnabled');
  const demoEverythingApplyBtn = document.getElementById('waDemoEverythingApplyBtn');
  const demoEverythingMessageEl = document.getElementById('waDemoEverythingMessage');
  const quickReplyInputEl = document.getElementById('waQuickReplyInput');
  const quickReplyCodeInputEl = document.getElementById('waQuickReplyCodeInput');
  const quickReplySectionInputEl = document.getElementById('waQuickReplySectionInput');
  const quickReplyKeywordsInputEl = document.getElementById('waQuickReplyKeywordsInput');
  const quickReplyImageInputEl = document.getElementById('waQuickReplyImageInput');
  const quickReplySectionNameInputEl = document.getElementById('waQuickReplySectionNameInput');
  const quickReplySectionAddBtnEl = document.getElementById('waQuickReplySectionAddBtn');
  const quickReplySectionsListEl = document.getElementById('waQuickReplySectionsList');
  const quickReplyAddBtnEl = document.getElementById('waQuickReplyAddBtn');
  const quickReplyListEl = document.getElementById('waQuickReplyList');
  const quickReplyRulesListEl = document.getElementById('waQuickReplyRulesList');
  const quickReplyRulesApplySmartBtnEl = document.getElementById('waQuickReplyRulesApplySmartBtn');
  const quickReplyRulesClearBtnEl = document.getElementById('waQuickReplyRulesClearBtn');
  const quickReplyResetBtnEl = document.getElementById('waQuickReplyResetBtn');
  const quickReplyMessageEl = document.getElementById('waQuickReplyMessage');
  const quickReplyTabButtons = Array.from(document.querySelectorAll('[data-qr-tab]'));
  const quickReplyTabPanes = Array.from(document.querySelectorAll('[data-qr-pane]'));
  const quickReplySmartBarEl = document.getElementById('waQuickReplySmartBar');
  const quickReplyPresetButtons = Array.from(document.querySelectorAll('[data-qr-preset]'));
  const settingsTabButtons = Array.from(document.querySelectorAll('[data-settings-tab]'));
  const settingsPaneCrmEl = document.getElementById('waSettingsPaneCrm');
  const settingsPaneFunnelsEl = document.getElementById('waSettingsPaneFunnels');
  const settingsPaneUsersEl = document.getElementById('waSettingsPaneUsers');
  const settingsPaneRepliesEl = document.getElementById('waSettingsPaneReplies');
  const settingsSearchInputEl = document.getElementById('waSettingsSearchInput');
  const settingsSearchHintEl = document.getElementById('waSettingsSearchHint');
  const settingsExpandAllBtnEl = document.getElementById('waSettingsExpandAllBtn');
  const settingsCollapseAllBtnEl = document.getElementById('waSettingsCollapseAllBtn');
  const primaryFunnelBoardListEl = document.getElementById('waPrimaryFunnelBoardList');
  const usersTableBodyEl = document.getElementById('waUsersTableBody');
  const addUserBtnEl = document.getElementById('waAddUserBtn');
  const userNameInputEl = document.getElementById('waUserNameInput');
  const usersMessageEl = document.getElementById('waUsersMessage');
  const authStatusEl = document.getElementById('waAuthStatus');

  const authBackdropEl = document.getElementById('waAuthBackdrop');
  const authEmailEl = document.getElementById('waAuthEmail');
  const authPasswordEl = document.getElementById('waAuthPassword');
  const authErrorEl = document.getElementById('waAuthError');
  const authLoginBtnEl = document.getElementById('waAuthLoginBtn');
  const authLogoutBtnEl = document.getElementById('waAuthLogoutBtn');
  const permsBackdropEl = document.getElementById('waPermsBackdrop');
  const permsTitleEl = document.getElementById('waPermsTitle');
  const permsGridEl = document.getElementById('waPermsGrid');
  const permsCancelBtnEl = document.getElementById('waPermsCancelBtn');
  const permsSaveBtnEl = document.getElementById('waPermsSaveBtn');
  const catalogBackdropEl = document.getElementById('waCatalogBackdrop');
  const catalogModalTitleEl = document.getElementById('waCatalogModalTitle');
  const catalogModalTypeLabelEl = document.getElementById('waCatalogModalTypeLabel');
  const catalogNameInputEl = document.getElementById('waCatalogNameInput');
  const catalogCancelBtnEl = document.getElementById('waCatalogCancelBtn');
  const catalogSaveBtnEl = document.getElementById('waCatalogSaveBtn');
  const funnelChatBackdropEl = document.getElementById('waFunnelChatBackdrop');
  const funnelChatCloseBtnEl = document.getElementById('waFunnelChatCloseBtn');
  const funnelChatTitleEl = document.getElementById('waFunnelChatTitle');
  const funnelChatSubEl = document.getElementById('waFunnelChatSub');
  const funnelChatAvatarEl = document.getElementById('waFunnelChatAvatar');
  const funnelChatConversationEl = document.getElementById('waFunnelChatConversation');
  const funnelChatInputEl = document.getElementById('waFunnelChatInput');
  const funnelChatSendBtnEl = document.getElementById('waFunnelChatSendBtn');
  const chatOverlayBackdropEl = document.getElementById('waChatOverlayBackdrop');
  const chatOverlayCloseBtnEl = document.getElementById('waChatOverlayCloseBtn');
  const mediaBackdropEl = document.getElementById('waMediaBackdrop');
  const mediaModalEl = document.getElementById('waMediaModal');
  const mediaCloseBtnEl = document.getElementById('waMediaCloseBtn');
  const mediaContentEl = document.getElementById('waMediaContent');
  const mediaFiltersEl = document.getElementById('waMediaFilters');
  const mediaSearchToggleEl = document.getElementById('waMediaSearchToggle');
  const mediaSearchInputEl = document.getElementById('waMediaSearchInput');
  const mediaSortToggleEl = document.getElementById('waMediaSortToggle');
  const mediaSelectToggleEl = document.getElementById('waMediaSelectToggle');
  const mediaSenderFilterEl = document.getElementById('waMediaSenderFilter');
  const mediaOrderFilterEl = document.getElementById('waMediaOrderFilter');
  const mediaTabButtons = Array.from(document.querySelectorAll('[data-media-tab]'));
  const mediaBatchDeleteEl = document.getElementById('waMediaBatchDelete');
  const mediaBatchStarEl = document.getElementById('waMediaBatchStar');
  const mediaBatchDownloadEl = document.getElementById('waMediaBatchDownload');
  const mediaBatchForwardEl = document.getElementById('waMediaBatchForward');

  const attributesSectionEl = document.getElementById('waAttributesSection');
  const notesSectionEl = document.getElementById('waNotesSection');
  const scheduledSectionEl = document.getElementById('waScheduledSection');
  const pinnedSectionEl = document.getElementById('waPinnedSection');
  const attrNameEl = document.getElementById('waAttrName');
  const attrPhoneEl = document.getElementById('waAttrPhone');
  const attrEmailEl = document.getElementById('waAttrEmail');
  const attrCompanyEl = document.getElementById('waAttrCompany');
  const attrTagsEl = document.getElementById('waAttrTags');
  const attrTagsChipsEl = document.getElementById('waAttrTagsChips');
  const notesListEl = document.getElementById('waNotesList');
  const scheduledListEl = document.getElementById('waScheduledList');
  const pinnedListEl = document.getElementById('waPinnedList');
  const rightTabButtons = Array.from(document.querySelectorAll('[data-right-tab]'));
  const rightTabPanes = Array.from(document.querySelectorAll('[data-right-pane]'));

  const dirTableBody = document.getElementById('dirTableBody');
  const dirTabAll = document.getElementById('dirTabAll');
  const dirTabActive = document.getElementById('dirTabActive');
  const dirTabArchived = document.getElementById('dirTabArchived');
  const dirCheckAll = document.getElementById('dirCheckAll');
  const dirSelectedInfo = document.getElementById('dirSelectedInfo');
  const dirAssignUserBtn = document.getElementById('dirAssignUserBtn');
  const dirMoveBtn = document.getElementById('dirMoveBtn');
  const dirTagBtn = document.getElementById('dirTagBtn');
  const dirExportSelectedBtn = document.getElementById('dirExportSelectedBtn');
  const dirToggleStateBtn = document.getElementById('dirToggleStateBtn');
  const dirDeleteBtn = document.getElementById('dirDeleteBtn');
  const dirImportBtn = document.getElementById('dirImportBtn');
  const dirExportAllBtn = document.getElementById('dirExportAllBtn');
  const dirImportInput = document.getElementById('dirImportInput');

  const dirModalBackdrop = document.getElementById('dirModalBackdrop');
  const dirModalTitle = document.getElementById('dirModalTitle');
  const dirModalBody = document.getElementById('dirModalBody');
  const dirModalCancelBtn = document.getElementById('dirModalCancelBtn');
  const dirModalConfirmBtn = document.getElementById('dirModalConfirmBtn');

  const dashGreetingEl = document.getElementById('dashGreeting');
  const dashSummaryDateEl = document.getElementById('dashSummaryDate');
  const dashLeadsGeneratedEl = document.getElementById('dashLeadsGenerated');
  const dashLeadsWonEl = document.getElementById('dashLeadsWon');
  const dashLeadsUnattendedEl = document.getElementById('dashLeadsUnattended');
  const dashTeamListEl = document.getElementById('dashTeamList');
  const dashManageUsersBtn = document.getElementById('dashManageUsersBtn');

  const leadSearchOpenBtn = document.getElementById('waLeadSearchOpen');
  const leadSearchBackdrop = document.getElementById('leadSearchBackdrop');
  const leadPopupCloseBtn = document.getElementById('leadPopupCloseBtn');
  const leadPopupSearchInput = document.getElementById('leadPopupSearchInput');
  const leadPopupTableBody = document.getElementById('leadPopupTableBody');
  const leadFilterDate = document.getElementById('leadFilterDate');
  const leadFilterStage = document.getElementById('leadFilterStage');
  const leadFilterStatus = document.getElementById('leadFilterStatus');
  const leadFilterUser = document.getElementById('leadFilterUser');

  const analyticsFromEl = document.getElementById('waAnalyticsFrom');
  const analyticsToEl = document.getElementById('waAnalyticsTo');
  const analyticsRangeLabelEl = document.getElementById('waAnalyticsRangeLabel');
  const analyticsUpdatedEl = document.getElementById('waAnalyticsUpdated');
  const analyticsAgentsBodyEl = document.getElementById('waAnalyticsAgentsBody');
  const analyticsLeadsNewValueEl = document.getElementById('waAnalyticsLeadsNewValue');
  const analyticsLeadsNewSubEl = document.getElementById('waAnalyticsLeadsNewSub');
  const analyticsLeadsNewDeltaEl = document.getElementById('waAnalyticsLeadsNewDelta');
  const analyticsMsgInValueEl = document.getElementById('waAnalyticsMsgInValue');
  const analyticsMsgInSubEl = document.getElementById('waAnalyticsMsgInSub');
  const analyticsMsgInDeltaEl = document.getElementById('waAnalyticsMsgInDelta');
  const analyticsMsgOutValueEl = document.getElementById('waAnalyticsMsgOutValue');
  const analyticsMsgOutSubEl = document.getElementById('waAnalyticsMsgOutSub');
  const analyticsMsgOutDeltaEl = document.getElementById('waAnalyticsMsgOutDelta');
  const analyticsRevenueValueEl = document.getElementById('waAnalyticsRevenueValue');
  const analyticsRevenueSubEl = document.getElementById('waAnalyticsRevenueSub');
  const analyticsRevenueDeltaEl = document.getElementById('waAnalyticsRevenueDelta');
  const analyticsWonValueEl = document.getElementById('waAnalyticsWonValue');
  const analyticsWonSubEl = document.getElementById('waAnalyticsWonSub');
  const analyticsWonDeltaEl = document.getElementById('waAnalyticsWonDelta');
  const analyticsUnattendedValueEl = document.getElementById('waAnalyticsUnattendedValue');
  const analyticsUnattendedSubEl = document.getElementById('waAnalyticsUnattendedSub');
  const analyticsUnattendedDeltaEl = document.getElementById('waAnalyticsUnattendedDelta');
  const analyticsAgentFilterEl = document.getElementById('waAnalyticsAgentFilter');
  const analyticsFunnelFilterEl = document.getElementById('waAnalyticsFunnelFilter');
  const analyticsStatusFilterEl = document.getElementById('waAnalyticsStatusFilter');
  const analyticsLast7BtnEl = document.getElementById('waAnalyticsLast7Btn');
  const analyticsLast30BtnEl = document.getElementById('waAnalyticsLast30Btn');
  const analyticsClearFiltersBtnEl = document.getElementById('waAnalyticsClearFiltersBtn');
  const analyticsExportBtnEl = document.getElementById('waAnalyticsExportBtn');

  const eventContactInputEl = document.getElementById('waEventContactInput');
  const eventContactResultsEl = document.getElementById('waEventContactResults');
  const eventCreateBtnEl = document.getElementById('waEventCreateBtn');
  const eventOpenTodayBtnEl = document.getElementById('waEventOpenTodayBtn');
  const eventsMessageEl = document.getElementById('waEventsMessage');
  const eventsListEl = document.getElementById('waEventsList');
  const eventFilterDateInputEl = document.getElementById('waEventFilterDateInput');
  const eventFilterStatusSelectEl = document.getElementById('waEventFilterStatusSelect');
  const eventFilterTodayBtnEl = document.getElementById('waEventFilterTodayBtn');
  const eventFilterClearBtnEl = document.getElementById('waEventFilterClearBtn');
  const eventsKpiPendingEl = document.getElementById('waEventsKpiPending');
  const eventsKpiNext24hEl = document.getElementById('waEventsKpiNext24h');
  const eventsKpiOverdueEl = document.getElementById('waEventsKpiOverdue');
  const eventPopupBackdropEl = document.getElementById('waEventPopupBackdrop');
  const eventPopupTitleInputEl = document.getElementById('waEventPopupTitleInput');
  const eventPopupDateInputEl = document.getElementById('waEventPopupDateInput');
  const eventPopupTimeInputEl = document.getElementById('waEventPopupTimeInput');
  const eventPopupNotesInputEl = document.getElementById('waEventPopupNotesInput');
  const eventPopupErrorEl = document.getElementById('waEventPopupError');
  const eventPopupCancelBtnEl = document.getElementById('waEventPopupCancelBtn');
  const eventPopupSaveBtnEl = document.getElementById('waEventPopupSaveBtn');
  const scheduleMsgBackdropEl = document.getElementById('waScheduleMsgBackdrop');
  const scheduleMsgContactInputEl = document.getElementById('waScheduleMsgContactInput');
  const scheduleMsgTypeSelectEl = document.getElementById('waScheduleMsgTypeSelect');
  const scheduleMsgDateInputEl = document.getElementById('waScheduleMsgDateInput');
  const scheduleMsgTimeInputEl = document.getElementById('waScheduleMsgTimeInput');
  const scheduleMsgTextInputEl = document.getElementById('waScheduleMsgTextInput');
  const scheduleMsgNoteInputEl = document.getElementById('waScheduleMsgNoteInput');
  const scheduleMsgToComposerCheckEl = document.getElementById('waScheduleMsgToComposerCheck');
  const scheduleMsgErrorEl = document.getElementById('waScheduleMsgError');
  const scheduleMsgCancelBtnEl = document.getElementById('waScheduleMsgCancelBtn');
  const scheduleMsgSaveBtnEl = document.getElementById('waScheduleMsgSaveBtn');

  const topLeadSearchBtn = document.getElementById('waLeadSearchOpen');
  const topFunnelsControls = document.getElementById('waFunnelsTopControls');
  const topFunnelsSearchInput = document.getElementById('waFunnelsSearchInput');
  const topFunnelsAddLeadBtn = document.getElementById('waFunnelsAddLeadBtn');
  const topFunnelsFiltersToggleBtn = document.getElementById('waFunnelsFiltersToggle');
  const addLeadPopoverEl = document.getElementById('waAddLeadPopover');
  const addLeadNameEl = document.getElementById('waAddLeadName');
  const addLeadPrefixEl = document.getElementById('waAddLeadPrefix');
  const addLeadPhoneEl = document.getElementById('waAddLeadPhone');
  const addLeadTargetEl = document.getElementById('waAddLeadTarget');
  const addLeadCancelBtn = document.getElementById('waAddLeadCancel');
  const addLeadSaveBtn = document.getElementById('waAddLeadSave');

  const funnelsBoardEl = document.getElementById('waFunnelsBoard');
  const funnelsBoardShellEl = document.getElementById('waFunnelsBoardShell');
  const funnelsAlertLeftEl = document.getElementById('waFunnelsAlertLeft');
  const funnelsAlertRightEl = document.getElementById('waFunnelsAlertRight');
  const funnelsBoardNameTextEl = document.getElementById('waFunnelsBoardNameText');
  const funnelsBoardSelectEl = document.getElementById('waFunnelsBoardSelect');
  const funnelsAddBoardBtnEl = document.getElementById('waFunnelsAddBoardBtn');
  const funnelsPriorityQueueEl = document.getElementById('waFunnelsPriorityQueue');
  const funnelsFiltersEl = document.getElementById('waFunnelsFilters');
  const funnelsFiltersCloseBtn = document.getElementById('waFunnelsFiltersClose');
  const funnelsDateFilterEl = document.getElementById('waFunnelsDateFilter');
  const funnelsStatusListEl = document.getElementById('waFunnelsStatusList');
  const funnelsTagSearchEl = document.getElementById('waFunnelsTagSearch');
  const funnelsUserFilterEl = document.getElementById('waFunnelsUserFilter');
  const funnelsClearFiltersBtn = document.getElementById('waFunnelsClearFilters');
  const massPanelEl = document.getElementById('waMassPanel');
  const massSendReplySelectEl = document.getElementById('waMassSendReplySelect');
  const massTriggerSearchInputEl = document.getElementById('waMassTriggerSearchInput');
  const massTriggerAddBtnEl = document.getElementById('waMassTriggerAddBtn');
  const massTriggerTagsEl = document.getElementById('waMassTriggerTags');
  const massTriggerDatalistEl = document.getElementById('waMassTriggerDatalist');
  const massResponseStateSelectEl = document.getElementById('waMassResponseStateSelect');
  const massResponseStateAddBtnEl = document.getElementById('waMassResponseStateAddBtn');
  const massResponseStateTagsEl = document.getElementById('waMassResponseStateTags');
  const massDelayUnitEl = document.getElementById('waMassDelayUnit');
  const massDelayHoursWrapEl = document.getElementById('waMassDelayHoursWrap');
  const massDelayDaysWrapEl = document.getElementById('waMassDelayDaysWrap');
  const massDelayHoursEl = document.getElementById('waMassDelayHours');
  const massDelayDaysEl = document.getElementById('waMassDelayDays');
  const massDelayDownBtnEl = document.getElementById('waMassDelayDownBtn');
  const massDelayUpBtnEl = document.getElementById('waMassDelayUpBtn');
  const massExcludeStatusSearchInputEl = document.getElementById('waMassExcludeStatusSearchInput');
  const massExcludeStatusAddBtnEl = document.getElementById('waMassExcludeStatusAddBtn');
  const massExcludeStatusesTagsEl = document.getElementById('waMassExcludeStatusesTags');
  const massStatusesDatalistEl = document.getElementById('waMassStatusesDatalist');
  const massExcludeReplySearchInputEl = document.getElementById('waMassExcludeReplySearchInput');
  const massExcludeReplyAddBtnEl = document.getElementById('waMassExcludeReplyAddBtn');
  const massExcludeRepliesTagsEl = document.getElementById('waMassExcludeRepliesTags');
  const massRepliesDatalistEl = document.getElementById('waMassRepliesDatalist');
  const massTemplateNameInputEl = document.getElementById('waMassTemplateNameInput');
  const massTemplateTextInputEl = document.getElementById('waMassTemplateTextInput');
  const massTemplateImageInputEl = document.getElementById('waMassTemplateImageInput');
  const massScheduleBtnEl = document.getElementById('waMassScheduleBtn');
  const massStatusEl = document.getElementById('waMassStatus');
  const massPreviewTriggerEl = document.getElementById('waMassPreviewTrigger');
  const massPreviewSendEl = document.getElementById('waMassPreviewSend');
  const massPreviewConditionsEl = document.getElementById('waMassPreviewConditions');
  const massChatPreviewBackdropEl = document.getElementById('waMassChatPreviewBackdrop');
  const massChatPreviewCloseEl = document.getElementById('waMassChatPreviewClose');
  const massChatPreviewBodyEl = document.getElementById('waMassChatPreviewBody');
  const massChatPreviewTitleEl = document.getElementById('waMassChatPreviewTitle');

  const railButtons = Array.from(document.querySelectorAll('.wa-rail-btn'));
  const panels = Array.from(document.querySelectorAll('.wa-panel'));
  const railProfilePicEl = document.querySelector('.wa-profile-pic');
  const railProfileNameEl = document.querySelector('.wa-profile-name');
  const profilePreviewPicEl = document.getElementById('waProfilePreviewPic');
  const profileNameInputEl = document.getElementById('waProfileNameInput');
  const profilePhotoInputEl = document.getElementById('waProfilePhotoInput');
  const profileApplyBtnEl = document.getElementById('waProfileApplyBtn');
  const profileResetBtnEl = document.getElementById('waProfileResetBtn');
  const profileMessageEl = document.getElementById('waProfileMessage');
  const metaBusinessNameInputEl = document.getElementById('waMetaBusinessNameInput');
  const metaBusinessNameApplyBtnEl = document.getElementById('waMetaBusinessNameApplyBtn');
  const metaBusinessNameMessageEl = document.getElementById('waMetaBusinessNameMessage');

  let chats = [];
  let selected = null;
  let poll = null;
  let pollingBusy = false;
  let suppressPollingUntil = 0;
  let conversationScrollInteractingUntil = 0;
  let openMessageMenuKey = '';
  let openPinnedMenuKey = '';
  let focusedConversationMessageKey = '';
  let focusedConversationMessageText = '';
  let pendingDeleteTarget = null;
  let pendingReplyContext = null;
  let lastConversationMessages = [];
  let lastLoadedPhoneDigits = '';
  let lastLoadedConversationTs = 0;
  let lastConversationFetchedAt = 0;
  let lastLoadedConversationSig = '';
  let conversationLoadRequestSeq = 0;
  let directoryRows = [];
  let directorySelected = new Set();
  let directoryFilter = 'all';
  let directoryDetailCache = new Map();
  let localImportedLeads = [];
  let dirModalResolver = null;
  let leadSearchRows = [];
  let funnelsFiltersOpen = false;
  let addLeadPopoverOpen = false;
  let funnelBoards = [];
  let activeFunnelBoardName = 'VENTAS MENUDEO';
  let primaryFunnelBoardName = 'VENTAS MENUDEO';
  let draftPrimaryFunnelBoardName = '';
  let inlineRenameStage = '';
  let inlineRenameValue = '';
  let inlineAddAfterStage = '';
  let inlineAddValue = '';
  let multimediaState = {
    open: false,
    loading: false,
    activeTab: 'assets',
    searchOpen: false,
    sortOpen: false,
    selecting: false,
    senderFilter: 'all',
    order: 'desc',
    search: '',
    openRowMenuId: '',
    selectedIds: new Set(),
    hiddenIds: new Set(),
    starredIds: new Set(),
    items: [],
    lastIndexedAt: 0
  };
  let activeChatFilter = 'all';
  let analyticsRange = { from: '', to: '' };
  let analyticsFilters = { agent: 'all', funnel: 'all', status: 'all' };
  let lastAnalyticsSnapshot = null;
  let inboundNotifiedTsByPhone = new Map();
  let didInitInboundNotificationState = false;
  let audioUnlockedByUser = false;
  let incomingAudioCtx = null;
  let lastStarAnimatedKey = '';
  let lastStarAnimatedUntil = 0;
  let activeCatalogType = 'funnel';
  let draftCrmConfig = null;
  let draftQuickReplies = [];
  let draftQuickReplySections = [];
  let draftQuickReplyPipelineRules = {};
  let settingsHasUnsavedChanges = false;
  let settingsSearchQuery = '';
  let activeQuickReplySettingsTab = 'replies';
  let funnelPopupLead = null;
  let funnelPopupMessages = [];
  let fullChatOverlayOpen = false;
  let fullChatOverlayPrevModule = '';
  let activeSettingsTab = 'crm';
  let currentUserIsAdmin = false;
  let firebaseAuthUsers = [];
  let userModulePermissions = loadUserModulePermissions();
  let currentModulePermissions = null;
  let editingPermissionsKey = '';
  let selectedAttributesSaveTimer = null;
  let selectedAttributesSaveInFlight = false;
  let selectedAttributesQueued = null;
  let lastSelectedAttributesSig = '';
  let selectedTagsDraft = [];
  let activeRightTab = 'attributes';
  let automationEvents = loadAutomationEvents();
  let automationEventsLoadedFromServer = false;
  let automationEventsSyncInFlight = false;
  let eventContactSearchItems = [];
  let eventContactSearchActiveIndex = -1;
  let funnelsStageRuntimeStats = {};
  let funnelsVisibilityListenersBound = false;
  let funnelsHiddenTargets = { left: null, right: null };

  const funnelsFilterState = {
    search: '',
    message: 'all',
    date: '',
    status: 'all',
    channel: 'all',
    tags: '',
    user: ''
  };

  const mediaItems = new Map();
  let mediaHydrated = false;
  let mediaHarvesting = false;

  const CRM_CONFIG_KEY = 'waCrmConfigV1';
  const CRM_META_KEY = 'waCrmMetaV1';
  const LOCAL_IMPORTED_LEADS_KEY = 'waLocalImportedLeadsV1';
  const DEMO_CLIENTS_ENABLED_KEY = 'waDemoClientsEnabledV1';
  const DEMO_CLIENTS_PHONES_KEY = 'waDemoClientsPhonesV1';
  const DEMO_EVERYTHING_ENABLED_KEY = 'waDemoEverythingEnabledV1';
  const DEMO_MULTIMEDIA_ITEMS_KEY = 'waDemoMultimediaItemsV1';
  const FUNNEL_STAGE_SETTINGS_KEY = 'waFunnelStageSettingsV1';
  const USER_MODULE_PERMS_KEY = 'waUserModulePermsV1';
  const AGENT_EMAIL_MAP_KEY = 'waAgentEmailMapV1';
  const CATALOG_META_KEY = 'waCatalogMetaV1';
  const QUICK_REPLIES_KEY = 'waQuickRepliesV1';
  const QUICK_REPLY_SECTIONS_KEY = 'waQuickReplySectionsV1';
  const QUICK_REPLY_PIPELINE_RULES_KEY = 'waQuickReplyPipelineRulesV1';
  const FUNNEL_BOARDS_KEY = 'waFunnelBoardsV1';
  const CHAT_WELCOME_LOGO_KEY = 'waChatWelcomeLogoV1';
  const RAIL_PROFILE_NAME_KEY = 'waRailProfileNameV1';
  const RAIL_PROFILE_PHOTO_KEY = 'waRailProfilePhotoV1';
  const MULTIMEDIA_HIDDEN_KEY = 'waMultimediaHiddenV1';
  const MULTIMEDIA_STARRED_KEY = 'waMultimediaStarredV1';
  const UNREAD_CURSOR_BY_PHONE_KEY = 'waUnreadCursorByPhoneV1';
  const UNREAD_COUNT_BY_PHONE_KEY = 'waUnreadCountByPhoneV1';
  const READ_ACK_BY_PHONE_KEY = 'waReadAckByPhoneV1';
  const STRICT_READ_AT_BOTTOM_KEY = 'waStrictReadAtBottomV1';
  const EVENTS_CALENDAR_KEY = 'waEventsCalendarV1';
  const MASS_BROADCAST_JOBS_KEY = 'waMassBroadcastJobsV1';
  const ACTIVE_MODULE_KEY = 'waActiveModuleV1';
  const RAIL_EXPANDED_KEY = 'waRailExpandedV1';
  const DEFAULT_FUNNEL_ORDER = [
    'Lead nuevo',
    'Contacto inicial',
    'Cotizacion enviada',
    'Seguimiento 1',
    'Seguimiento 2',
    'Seguimiento 3',
    'Anticipo',
    'Diseno aprobado',
    'En produccion',
    'Listo para entrega',
    'Entregado',
    'Cierre de venta',
    'Perdidos',
    'Archivados'
  ];
  const LEGACY_FUNNEL_ORDER = ['Cliente nuevo', 'Asignados', 'Contactados', 'Cierre', 'Archivados'];
  const DEFAULT_STATUS_ORDER = ['Sin gestionar', 'En seguimiento', 'Esperando cliente', 'Urgente', 'Critico', 'Ganado', 'Perdido'];
  const LEGACY_STATUS_ORDER = ['Pendiente', 'Urgente', 'Importante', 'Atorado'];
  const DEFAULT_CRM_CONFIG = {
    funnel: DEFAULT_FUNNEL_ORDER.slice(),
    agents: ['No asignado'],
    statuses: DEFAULT_STATUS_ORDER.slice()
  };
  const REPLY_SLA_MINUTES = 10;
  const DEFAULT_QUICK_REPLY_SECTIONS = ['General', 'Envios', 'Precios', 'Condiciones', 'Pagos'];
  const DEFAULT_QUICK_REPLIES = [
    { id:'QR-001', code:'saludo', section:'General', keywords:['hola','buenas','informacion'], text:'Hola, con gusto te ayudo.' },
    { id:'QR-002', code:'cotiza', section:'Precios', keywords:['precio','costos','cotizacion','cuanto'], text:'Perfecto, en un momento te comparto la cotizacion.' },
    { id:'QR-003', code:'condiciones', section:'Condiciones', keywords:['condiciones','terminos','requisitos'], text:'Con gusto te comparto las condiciones comerciales y tiempos.' },
    { id:'QR-004', code:'envio', section:'Envios', keywords:['envio','guia','paqueteria','entrega'], text:'Claro, te comparto opciones de envio y tiempo estimado de entrega.' },
    { id:'QR-005', code:'transferencia', section:'Pagos', keywords:['transferencia','cuenta','clabe','datos bancarios'], text:'Te comparto los datos para transferencia: Banco, CLABE, beneficiario y referencia.' },
    { id:'QR-006', code:'anticipo', section:'Pagos', keywords:['anticipo','pago','abono'], text:'Para iniciar trabajamos con anticipo y el resto contra entrega.' },
    { id:'QR-007', code:'tiempos', section:'Envios', keywords:['tiempo','cuando','entrega','fecha'], text:'El tiempo estimado de produccion y entrega te lo confirmo enseguida.' },
    { id:'QR-008', code:'gracias', section:'General', keywords:['gracias','ok','perfecto'], text:'Gracias por escribirnos, te atiendo enseguida.' }
  ];

  let crmConfig = loadCrmConfig();
  let crmMeta = loadCrmMeta();
  let unreadCursorByPhone = loadNumericMap(UNREAD_CURSOR_BY_PHONE_KEY);
  let unreadCountByPhone = loadNumericMap(UNREAD_COUNT_BY_PHONE_KEY);
  let readAckByPhone = loadNumericMap(READ_ACK_BY_PHONE_KEY);
  const funnelBoardsState = loadFunnelBoardsState();
  funnelBoards = funnelBoardsState.boards;
  activeFunnelBoardName = funnelBoardsState.active;
  primaryFunnelBoardName = funnelBoardsState.primary;
  draftPrimaryFunnelBoardName = primaryFunnelBoardName;
  let agentEmailMap = loadAgentEmailMap();
  let catalogMeta = loadCatalogMeta();
  let quickReplySections = loadQuickReplySections();
  let quickReplies = loadQuickReplies();
  let quickReplyPipelineRules = loadQuickReplyPipelineRules();
  let massBroadcastJobs = loadMassBroadcastJobs();
  let massBroadcastInFlight = false;
  let massBroadcastLastProcessAt = 0;
  let massTriggerCodesDraft = [];
  let massResponseFiltersDraft = [];
  let massExcludeStatusesDraft = [];
  let massExcludeReplyCodesDraft = [];
  const massPreviewCatalog = new Map();
  quickReplySections = normalizeQuickReplySections((quickReplySections || []).concat((quickReplies || []).map((r) => r && r.section)));
  localImportedLeads = loadLocalImportedLeads();
  let funnelStageSettings = loadFunnelStageSettings();

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

  function moduleList(){
    return Object.keys(moduleTitles);
  }

  function defaultModulePermissions(){
    const out = {};
    moduleList().forEach((m) => { out[m] = true; });
    return out;
  }

  function normalizeIdentityKey(value, prefix){
    const raw = String(value || '').trim().toLowerCase();
    if(!raw) return '';
    return String(prefix || 'id') + ':' + raw;
  }

  function loadUserModulePermissions(){
    try{
      const parsed = JSON.parse(localStorage.getItem(USER_MODULE_PERMS_KEY) || '{}');
      return parsed && typeof parsed === 'object' ? parsed : {};
    }catch(_e){
      return {};
    }
  }

  function saveUserModulePermissions(){
    try{ localStorage.setItem(USER_MODULE_PERMS_KEY, JSON.stringify(userModulePermissions || {})); }catch(_e){}
  }

  function permissionsForIdentityKeys(keys){
    if(currentUserIsAdmin) return defaultModulePermissions();
    for(const key of keys || []){
      const found = userModulePermissions[key];
      if(found && typeof found === 'object'){
        return Object.assign(defaultModulePermissions(), found);
      }
    }
    return defaultModulePermissions();
  }

  function currentIdentityKeys(){
    const keys = [];
    const authUser = window.auth && window.auth.currentUser ? window.auth.currentUser : null;
    const email = String(authUser && authUser.email || '').trim();
    const displayName = String(authUser && authUser.displayName || '').trim();
    const localName = String((() => { try { return localStorage.getItem('waCurrentUserName') || ''; } catch(_e){ return ''; } })() || '').trim();
    if(email) keys.push(normalizeIdentityKey(email, 'email'));
    if(displayName) keys.push(normalizeIdentityKey(displayName, 'name'));
    if(localName) keys.push(normalizeIdentityKey(localName, 'name'));
    return keys.filter(Boolean);
  }

  function refreshCurrentModulePermissions(){
    currentModulePermissions = permissionsForIdentityKeys(currentIdentityKeys());
  }

  function hasModuleAccess(moduleName){
    if(currentUserIsAdmin) return true;
    if(!currentModulePermissions) refreshCurrentModulePermissions();
    return !!(currentModulePermissions && currentModulePermissions[moduleName] !== false);
  }

  function applyModulePermissionsToRail(){
    refreshCurrentModulePermissions();
    railButtons.forEach((btn) => {
      const moduleName = btn.dataset.module || '';
      const allowed = hasModuleAccess(moduleName);
      btn.style.opacity = allowed ? '1' : '.35';
      btn.style.pointerEvents = allowed ? 'auto' : 'none';
      btn.setAttribute('aria-disabled', allowed ? 'false' : 'true');
    });
  }

  function openPermissionsEditor(identityKey, titleText){
    if(!currentUserIsAdmin || !permsBackdropEl || !permsGridEl) return;
    editingPermissionsKey = String(identityKey || '').trim();
    if(!editingPermissionsKey) return;
    const existing = Object.assign(defaultModulePermissions(), userModulePermissions[editingPermissionsKey] || {});
    if(permsTitleEl) permsTitleEl.textContent = 'Permisos de modulos: ' + String(titleText || identityKey);
    permsGridEl.innerHTML = '';
    const frag = document.createDocumentFragment();
    moduleList().forEach((mod) => {
      const row = document.createElement('label');
      row.className = 'wa-perms-item';
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.checked = existing[mod] !== false;
      input.setAttribute('data-module-perm', mod);
      const txt = document.createElement('span');
      txt.textContent = moduleTitles[mod] || mod;
      row.appendChild(input);
      row.appendChild(txt);
      frag.appendChild(row);
    });
    permsGridEl.appendChild(frag);
    permsBackdropEl.classList.add('open');
    permsBackdropEl.setAttribute('aria-hidden', 'false');
  }

  function closePermissionsEditor(){
    editingPermissionsKey = '';
    if(permsBackdropEl){
      permsBackdropEl.classList.remove('open');
      permsBackdropEl.setAttribute('aria-hidden', 'true');
    }
  }

  function savePermissionsEditor(){
    if(!editingPermissionsKey || !permsGridEl) return;
    const next = {};
    moduleList().forEach((mod) => { next[mod] = true; });
    Array.from(permsGridEl.querySelectorAll('[data-module-perm]')).forEach((el) => {
      const mod = el.getAttribute('data-module-perm');
      if(!mod) return;
      next[mod] = !!el.checked;
    });
    userModulePermissions[editingPermissionsKey] = next;
    saveUserModulePermissions();
    closePermissionsEditor();
    applyModulePermissionsToRail();
    renderUsersTable();
    const activeBtn = railButtons.find((btn) => btn.classList.contains('active'));
    const activeModule = activeBtn ? activeBtn.dataset.module : 'dashboard';
    if(activeModule && !hasModuleAccess(activeModule)){
      const fallback = moduleList().find((m) => hasModuleAccess(m)) || 'dashboard';
      setActiveModule(fallback);
    }
  }

  function setRailExpanded(expanded){
    const isExpanded = !!expanded;
    if(railEl) railEl.classList.toggle('expanded', isExpanded);
    if(railToggleBtn){
      railToggleBtn.textContent = isExpanded ? '<' : '>';
      railToggleBtn.title = isExpanded ? 'Ocultar nombres' : 'Mostrar nombres';
      railToggleBtn.setAttribute('aria-label', railToggleBtn.title);
    }
  }

  function resolvePanelModule(moduleName){
    const wanted = String(moduleName || '').trim().toLowerCase();
    if(!wanted) return '';
    const hasPanel = panels.some((panel) => String(panel && panel.dataset && panel.dataset.panel || '').trim().toLowerCase() === wanted);
    return hasPanel ? wanted : '';
  }

  function readStoredActiveModule(){
    try{
      return String(localStorage.getItem(ACTIVE_MODULE_KEY) || '').trim().toLowerCase();
    }catch(_e){
      return '';
    }
  }

  function readStoredRailExpanded(){
    try{
      const raw = localStorage.getItem(RAIL_EXPANDED_KEY);
      if(raw == null) return false;
      return raw === '1';
    }catch(_e){
      return false;
    }
  }

  function setActiveModule(moduleName){
    let target = resolvePanelModule(moduleName);
    if(!target) target = 'dashboard';

    if(!hasModuleAccess(target)){
      target = moduleList().find((mod) => hasModuleAccess(mod) && resolvePanelModule(mod)) || 'dashboard';
    }

    railButtons.forEach((btn) => {
      const mod = String(btn && btn.dataset && btn.dataset.module || '').trim().toLowerCase();
      btn.classList.toggle('active', mod === target);
    });

    panels.forEach((panel) => {
      const mod = String(panel && panel.dataset && panel.dataset.panel || '').trim().toLowerCase();
      panel.classList.toggle('active', mod === target);
    });

    if(moduleTitleEl){
      moduleTitleEl.textContent = moduleTitles[target] || ('MAQUILEROS - ' + String(target || '').toUpperCase());
    }

    if(topFunnelsControls){
      const visible = target === 'funnels';
      topFunnelsControls.style.display = visible ? 'flex' : 'none';
      topFunnelsControls.setAttribute('aria-hidden', visible ? 'false' : 'true');
    }

    if(topLeadSearchBtn){
      topLeadSearchBtn.style.display = target === 'funnels' ? 'none' : '';
    }

    try{ localStorage.setItem(ACTIVE_MODULE_KEY, target); }catch(_e){}
  }

  function bindModuleRailRuntime(){
    try{ window.__waModuleRuntimeBound = true; }catch(_e){}

    railButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const moduleName = String(btn && btn.dataset && btn.dataset.module || '').trim().toLowerCase();
        if(!moduleName) return;
        if(!hasModuleAccess(moduleName)) return;
        setActiveModule(moduleName);
      });
    });

    if(railToggleBtn){
      railToggleBtn.addEventListener('click', () => {
        const nextExpanded = !(railEl && railEl.classList.contains('expanded'));
        setRailExpanded(nextExpanded);
        try{ localStorage.setItem(RAIL_EXPANDED_KEY, nextExpanded ? '1' : '0'); }catch(_e){}
      });
    }

    setRailExpanded(readStoredRailExpanded());
    applyModulePermissionsToRail();

    const fromStorage = readStoredActiveModule();
    const activeRailBtn = railButtons.find((btn) => btn.classList.contains('active')) || null;
    const fromRail = String(activeRailBtn && activeRailBtn.dataset && activeRailBtn.dataset.module || '').trim().toLowerCase();
    const initial = resolvePanelModule(fromStorage) || resolvePanelModule(fromRail) || 'dashboard';
    setActiveModule(initial);
  }

  function parseLines(input){
    return String(input || '')
      .split(/\r?\n/)
      .map((s) => s.trim())
      .filter(Boolean);
  }

  function uniqueValues(list){
    const seen = new Set();
    return (Array.isArray(list) ? list : []).filter((item) => {
      const key = String(item || '').trim().toLowerCase();
      if(!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    }).map((item) => String(item || '').trim());
  }

  function phoneKey(phone){
    const digits = String(phone || '').replace(/\D+/g, '');
    if(/^521\d{10}$/.test(digits)) return digits.slice(3);
    if(/^52\d{10}$/.test(digits)) return digits.slice(2);
    return digits;
  }

  function choosePreferredPhoneVariant(currentPhone, nextPhone){
    const currentDigits = String(currentPhone || '').replace(/\D+/g, '');
    const nextDigits = String(nextPhone || '').replace(/\D+/g, '');
    if(!currentDigits) return String(nextPhone || '').trim();
    if(!nextDigits) return String(currentPhone || '').trim();

    const score = (digits) => {
      if(/^521\d{10}$/.test(digits)) return 300;
      if(/^52\d{10}$/.test(digits)) return 250;
      if(/^\d{10}$/.test(digits)) return 200;
      return 100 + Math.min(digits.length, 20);
    };

    return score(nextDigits) >= score(currentDigits)
      ? String(nextPhone || '').trim()
      : String(currentPhone || '').trim();
  }

  function normalizeTimestamp(value){
    const n = Number(value || 0);
    if(!Number.isFinite(n) || n <= 0) return 0;
    return n < 1000000000000 ? n * 1000 : n;
  }

  function toPositiveInt(value){
    const n = Number(value);
    if(!Number.isFinite(n) || n <= 0) return 0;
    return Math.floor(n);
  }

  function loadNumericMap(storageKey){
    try{
      const raw = JSON.parse(localStorage.getItem(storageKey) || '{}');
      if(!raw || typeof raw !== 'object') return {};
      const out = {};
      Object.keys(raw).forEach((k) => {
        const key = phoneKey(k);
        if(!key) return;
        const val = toPositiveInt(raw[k]);
        out[key] = val;
      });
      return out;
    }catch(_e){
      return {};
    }
  }

  function saveNumericMap(storageKey, mapObj){
    try{ localStorage.setItem(storageKey, JSON.stringify(mapObj || {})); }catch(_e){}
  }

  function getUnreadCursor(phone){
    return toPositiveInt(unreadCursorByPhone[phoneKey(phone)]);
  }

  function setUnreadCursor(phone, ts){
    const key = phoneKey(phone);
    if(!key) return;
    unreadCursorByPhone[key] = toPositiveInt(ts);
    saveNumericMap(UNREAD_CURSOR_BY_PHONE_KEY, unreadCursorByPhone);
  }

  function getUnreadLiveCount(phone){
    return toPositiveInt(unreadCountByPhone[phoneKey(phone)]);
  }

  function setUnreadLiveCount(phone, count){
    const key = phoneKey(phone);
    if(!key) return;
    unreadCountByPhone[key] = toPositiveInt(count);
    saveNumericMap(UNREAD_COUNT_BY_PHONE_KEY, unreadCountByPhone);
  }

  function getReadAck(phone){
    return toPositiveInt(readAckByPhone[phoneKey(phone)]);
  }

  function setReadAck(phone, ts){
    const key = phoneKey(phone);
    if(!key) return;
    const prev = toPositiveInt(readAckByPhone[key]);
    const next = toPositiveInt(ts);
    if(next <= prev) return;
    readAckByPhone[key] = next;
    saveNumericMap(READ_ACK_BY_PHONE_KEY, readAckByPhone);
  }

  function isChatsModuleActive(){
    const activeBtn = railButtons.find((btn) => btn.classList.contains('active'));
    return !!activeBtn && String(activeBtn.dataset.module || '') === 'chats';
  }

  function isChatOpenAndVisible(phone){
    if(!selected) return false;
    if(!isChatsModuleActive()) return false;
    const selectedPhone = phoneKey(selected.phone || selected.id);
    const nextPhone = phoneKey(phone);
    return !!selectedPhone && !!nextPhone && selectedPhone === nextPhone;
  }

  function strictReadAtBottomEnabled(){
    try{
      const raw = localStorage.getItem(STRICT_READ_AT_BOTTOM_KEY);
      if(raw == null) return true;
      return raw !== '0';
    }catch(_e){
      return true;
    }
  }

  function canAutoMarkSelectedConversationAsRead(phone){
    if(!selected) return false;
    const selectedPhone = phoneKey(selected.phone || selected.id);
    const targetPhone = phoneKey(phone);
    if(!selectedPhone || !targetPhone || selectedPhone !== targetPhone) return false;

    if(!strictReadAtBottomEnabled()) return true;
    if(!isChatsModuleActive()) return false;
    if(Date.now() < conversationScrollInteractingUntil) return false;
    return isConversationNearBottom(96);
  }

  function latestLoadedConversationTsForPhone(phone){
    const target = phoneKey(phone);
    const current = phoneKey(selected && (selected.phone || selected.id));
    if(!target || !current || target !== current) return 0;
    const list = Array.isArray(lastConversationMessages) ? lastConversationMessages : [];
    const last = list.length ? list[list.length - 1] : null;
    return normalizeTimestamp(last && (last.timestamp || last.createdAt || last.sentAt) || 0);
  }

  async function fetchLatestConversationTimestamp(phone){
    const key = phoneKey(phone);
    if(!key) return 0;
    try{
      const resp = await fetch('/wa/conversation?phone=' + encodeURIComponent(key) + '&limit=1');
      if(!resp.ok) return 0;
      const data = await resp.json().catch(() => null);
      const messages = data && Array.isArray(data.messages) ? data.messages : [];
      const last = messages.length ? messages[messages.length - 1] : null;
      return normalizeTimestamp(last && (last.timestamp || last.createdAt || last.sentAt) || 0);
    }catch(_e){
      return 0;
    }
  }

  function markPhoneAsReadLocal(phone, seenTs){
    const key = phoneKey(phone);
    const ts = normalizeTimestamp(seenTs || 0) || Date.now();
    if(!key) return;
    setMeta(key, { read: true, lastSeenTs: ts, pendingClientCount: 0 });
    setUnreadLiveCount(key, 0);
    setUnreadCursor(key, ts);
    setReadAck(key, ts);
    if(selected && phoneKey(selected.phone || selected.id) === key){
      selected.read = true;
      selected.pendingClientCount = 0;
    }
    chats = (Array.isArray(chats) ? chats : []).map((item) => {
      if(phoneKey(item && (item.phone || item.id)) !== key) return item;
      return Object.assign({}, item, {
        read: true,
        pendingClientCount: 0
      });
    });
  }

  function pendingClientCountForChat(chat){
    if(isChatOpenAndVisible(chat && (chat.phone || chat.id))) return 0;
    const fromLiveCounter = getUnreadLiveCount(chat && (chat.phone || chat.id));
    if(fromLiveCounter > 0) return fromLiveCounter;
    const fromChat = toPositiveInt(chat && chat.pendingClientCount);
    if(fromChat > 0) return fromChat;
    const meta = getMeta(chat && (chat.phone || chat.id));
    const lastInboundTs = normalizeTimestamp(meta.lastInboundTs || (chat && chat.lastInboundTs) || 0);
    const lastSeenTs = normalizeTimestamp(meta.lastSeenTs || 0);
    const fromMeta = toPositiveInt(meta.pendingClientCount || meta.unreadCount);
    if(lastInboundTs > 0 && lastInboundTs > lastSeenTs){
      return fromMeta;
    }

    // Fallback for conversations that do not yet have detailed inbound/outbound
    // metadata hydrated in local storage.
    const chatRead = chat && typeof chat.read === 'boolean' ? chat.read : null;
    if(chatRead === false){
      return fromMeta;
    }

    const lastDirection = String(chat && (chat.lastDirection || chat.direction) || '').trim();
    const lastTs = normalizeTimestamp(chat && (chat.lastTimestamp || chat.updatedAt) || 0);
    if(isInboundDirection(lastDirection) && lastTs > lastSeenTs){
      return fromMeta;
    }

    return fromMeta;
  }

  function effectivePendingCount(chat){
    if(isChatOpenAndVisible(chat && (chat.phone || chat.id))) return 0;
    const fromLiveCounter = getUnreadLiveCount(chat && (chat.phone || chat.id));
    if(fromLiveCounter > 0) return fromLiveCounter;
    const fromChat = toPositiveInt(chat && chat.pendingClientCount);
    if(fromChat > 0) return fromChat;
    return pendingClientCountForChat(chat);
  }

  async function syncUnreadLiveCountersForChats(conversations){
    const list = Array.isArray(conversations) ? conversations : [];
    const targets = list.filter((chat) => {
      const phone = phoneKey(chat && (chat.phone || chat.id));
      if(!phone) return false;
      if(isChatOpenAndVisible(phone)) return false;
      return true;
    });

    await Promise.all(targets.map(async (chat) => {
      const phone = phoneKey(chat && (chat.phone || chat.id));
      if(!phone) return;
      try{
        const cursorTs = Math.max(
          normalizeTimestamp(getUnreadCursor(phone) || 0),
          normalizeTimestamp(getReadAck(phone) || 0)
        );

        const resp = await fetch('/wa/conversation?phone=' + encodeURIComponent(phone) + '&limit=250');
        if(!resp.ok) return;
        const data = await resp.json().catch(() => null);
        const messages = data && Array.isArray(data.messages) ? data.messages : [];
        let unread = 0;
        messages.forEach((msg) => {
          const ts = normalizeTimestamp(msg && (msg.timestamp || msg.createdAt || msg.sentAt) || 0);
          if(!ts || ts <= cursorTs) return;
          if(normalizeMessageDirection(msg) === 'in') unread += 1;
        });
        setUnreadLiveCount(phone, unread);
      }catch(_e){}
    }));
  }

  function getMeta(phone){
    return crmMeta[phoneKey(phone)] || {};
  }

  function setMeta(phone, patch){
    const key = phoneKey(phone);
    if(!key) return;
    crmMeta[key] = Object.assign({}, crmMeta[key] || {}, patch || {});
    saveCrmMeta();
  }

  function saveCrmMeta(){
    try{ localStorage.setItem(CRM_META_KEY, JSON.stringify(crmMeta)); }catch(_e){}
  }

  function getLeadHistory(phone){
    const meta = getMeta(phone);
    const list = Array.isArray(meta.historyMovements) ? meta.historyMovements : [];
    return list.filter(isUsefulLeadHistoryEntry).slice(0, 300);
  }

  function isUsefulLeadHistoryEntry(item){
    const action = String(item && item.action || '').trim().toLowerCase();
    const details = String(item && item.details || '').trim().toLowerCase();
    if(!action && !details) return false;

    // Hide operational noise in client history: sent messages and media records.
    if(action.includes('mensaje enviado')) return false;
    if(action.includes('foto') || action.includes('video') || action.includes('imagen')) return false;
    if(details.includes('foto') || details.includes('fotos')) return false;
    if(details.includes('video') || details.includes('videos')) return false;
    if(details.includes('imagen') || details.includes('imagenes')) return false;

    return true;
  }

  function addLeadHistory(phone, action, details){
    const safeAction = String(action || '').trim();
    if(!safeAction) return;
    const nextItem = {
      ts: Date.now(),
      user: getSystemUserName(),
      action: safeAction,
      details: String(details || '').trim()
    };
    if(!isUsefulLeadHistoryEntry(nextItem)) return;
    const prev = getLeadHistory(phone);
    prev.unshift(nextItem);
    setMeta(phone, { historyMovements: prev.slice(0, 300) });
  }

  function renderLeadHistory(){
    if(!historyListEl) return;
    if(historyTitleEl){
      const leadName = selected ? (selected.name || formatDisplayPhone(selected.phone || '')) : '';
      historyTitleEl.textContent = leadName ? ('Historial del lead: ' + leadName) : 'Historial del lead';
    }
    historyListEl.innerHTML = '';
    if(!selected){
      updateHeader();
      syncToolbarFromSelection();
      return;
    }

    const history = getLeadHistory(selected.phone);
    if(!history.length){
      historyListEl.innerHTML = '<div class="wa-history-empty">Este lead aun no tiene movimientos registrados.</div>';
      return;
    }

    const frag = document.createDocumentFragment();
    history.forEach((item) => {
      const row = document.createElement('div');
      row.className = 'wa-history-item';

      const user = document.createElement('div');
      user.className = 'wa-history-user';
      user.textContent = String(item.user || 'Usuario');

      const main = document.createElement('div');
      main.className = 'wa-history-main';
      const actionText = String(item.details || item.action || 'Sin detalle');
      main.textContent = actionText;

      const meta = document.createElement('div');
      meta.className = 'wa-history-meta';
      meta.textContent = formatHistoryDateTime(item.ts);

      row.appendChild(user);
      row.appendChild(main);
      row.appendChild(meta);
      frag.appendChild(row);
    });

    historyListEl.appendChild(frag);
  }

  function setLeadHistoryOpen(open){
    const isOpen = !!open;
    if(historyBackdropEl){
      historyBackdropEl.classList.toggle('open', isOpen);
      historyBackdropEl.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    }
    if(isOpen) renderLeadHistory();
  }

  function setActiveChatFilter(filter){
    const next = String(filter || 'all');
    const allowed = ['all','assigned','unread','archived'];
    activeChatFilter = allowed.includes(next) ? next : 'all';

    const buttons = chatQuickFiltersEl ? Array.from(chatQuickFiltersEl.querySelectorAll('[data-chat-filter]')) : [];
    buttons.forEach((btn) => {
      const isActive = btn.getAttribute('data-chat-filter') === activeChatFilter;
      btn.classList.toggle('active', isActive);
    });
    renderChats();
  }

  function loadCrmMeta(){
    try{
      const parsed = JSON.parse(localStorage.getItem(CRM_META_KEY) || '{}');
      return parsed && typeof parsed === 'object' ? parsed : {};
    }catch(_e){
      return {};
    }
  }

  function normalizeCrmConfig(raw){
    const fallback = DEFAULT_CRM_CONFIG;
    const norm = (value) => String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, ' ').trim();
    const inferStageIntent = (name) => {
      const txt = norm(name);
      if(!txt) return 'other';
      if(txt.includes('archiv')) return 'archived';
      if(txt.includes('perdid') || txt.includes('cancelad')) return 'lost';
      if(txt.includes('cierre') || txt.includes('ganad') || txt.includes('venta')) return 'won';
      if(txt.includes('seguimiento')) return 'followup';
      if(txt.includes('negoci')) return 'negotiation';
      if(txt.includes('cotiz') || txt.includes('presupuest')) return 'quote';
      if(txt.includes('calific')) return 'qualification';
      if(txt.includes('contact') || txt.includes('asign')) return 'contact';
      if(txt.includes('nuevo') || txt.includes('lead')) return 'new';
      return 'other';
    };
    const inferStatusIntent = (name) => {
      const txt = norm(name);
      if(!txt) return 'other';
      if(txt.includes('critic')) return 'critical';
      if(txt.includes('urgent')) return 'urgent';
      if(txt.includes('esper') && txt.includes('cliente')) return 'waiting_client';
      if(txt.includes('seguimiento')) return 'followup';
      if(txt.includes('ganad')) return 'won';
      if(txt.includes('perdid')) return 'lost';
      if(txt.includes('sin gestionar') || txt.includes('pendiente') || txt.includes('sin atender')) return 'new';
      return 'other';
    };
    const rawFunnel = uniqueValues(raw && raw.funnel);
    const rawStatuses = uniqueValues(raw && raw.statuses);
    const hasLegacyFunnel = LEGACY_FUNNEL_ORDER.every((name) => rawFunnel.some((item) => String(item || '').trim().toLowerCase() === String(name).toLowerCase()));
    const hasLegacyStatuses = LEGACY_STATUS_ORDER.every((name) => rawStatuses.some((item) => String(item || '').trim().toLowerCase() === String(name).toLowerCase()));
    const funnelIntents = new Set(rawFunnel.map((name) => inferStageIntent(name)));
    const statusesIntents = new Set(rawStatuses.map((name) => inferStatusIntent(name)));
    const invalidFunnelConfig = !['new', 'contact', 'quote', 'followup', 'won'].every((intent) => funnelIntents.has(intent));
    const invalidStatusConfig = !['new', 'followup', 'waiting_client', 'urgent', 'critical', 'won', 'lost'].every((intent) => statusesIntents.has(intent));

    let funnel = rawFunnel.length ? rawFunnel.slice() : fallback.funnel.slice();
    if(!rawFunnel.length || hasLegacyFunnel || invalidFunnelConfig){
      funnel = DEFAULT_FUNNEL_ORDER.slice();
    }

    funnel = funnel.map((stage) => {
      const label = String(stage || '').trim();
      if(!label) return label;
      return label.toLowerCase() === 'seguimiento' ? 'Seguimiento 1' : label;
    });

    const insertAfterStage = (list, stageName, afterCandidates) => {
      const safe = Array.isArray(list) ? list.slice() : [];
      if(safe.some((item) => String(item || '').trim().toLowerCase() === String(stageName || '').trim().toLowerCase())) return safe;
      const archiveIdx = safe.findIndex((item) => String(item || '').trim().toLowerCase() === 'archivados');
      let insertIdx = archiveIdx >= 0 ? archiveIdx : safe.length;
      const anchors = Array.isArray(afterCandidates) ? afterCandidates : [];
      anchors.some((candidate) => {
        const idx = safe.findIndex((item) => String(item || '').trim().toLowerCase() === String(candidate || '').trim().toLowerCase());
        if(idx >= 0){
          insertIdx = Math.min((archiveIdx >= 0 ? archiveIdx : safe.length), idx + 1);
          return true;
        }
        return false;
      });
      safe.splice(insertIdx, 0, stageName);
      return safe;
    };

    funnel = insertAfterStage(funnel, 'Seguimiento 1', ['Cotizacion enviada']);
    funnel = insertAfterStage(funnel, 'Seguimiento 2', ['Seguimiento 1']);
    funnel = insertAfterStage(funnel, 'Seguimiento 3', ['Seguimiento 2', 'Seguimiento 1']);
    funnel = insertAfterStage(funnel, 'Anticipo', ['Seguimiento 3', 'Seguimiento 2', 'Seguimiento 1', 'Cotizacion enviada']);
    funnel = insertAfterStage(funnel, 'Diseno aprobado', ['Anticipo']);
    funnel = insertAfterStage(funnel, 'En produccion', ['Diseno aprobado', 'Anticipo']);
    funnel = insertAfterStage(funnel, 'Listo para entrega', ['En produccion']);
    funnel = insertAfterStage(funnel, 'Entregado', ['Listo para entrega']);
    funnel = insertAfterStage(funnel, 'Perdidos', ['Seguimiento 3', 'Seguimiento 2', 'Seguimiento 1', 'Cotizacion enviada']);

    if(!funnel.some((s) => String(s).toLowerCase() === 'archivados')) funnel.push('Archivados');
    const agentsRaw = uniqueValues(raw && raw.agents);
    let statuses = rawStatuses.length ? rawStatuses.slice() : fallback.statuses.slice();
    if(!rawStatuses.length || hasLegacyStatuses || invalidStatusConfig){
      statuses = DEFAULT_STATUS_ORDER.slice();
    }
    const agents = ['No asignado'].concat(agentsRaw.filter((n) => String(n).toLowerCase() !== 'no asignado'));
    return { funnel, agents, statuses };
  }

  function normalizeMatcherText(value){
    return String(value || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function stageIntentKey(stageName){
    const txt = normalizeMatcherText(stageName);
    if(!txt) return 'other';
    if(txt.includes('archiv')) return 'archived';
    if(txt.includes('perdid') || txt.includes('cancelad')) return 'lost';
    if(txt.includes('cierre') || txt.includes('ganad') || txt.includes('venta')) return 'won';
    if(txt.includes('seguimiento')) return 'followup';
    if(txt.includes('negoci')) return 'negotiation';
    if(txt.includes('cotiz') || txt.includes('presupuest')) return 'quote';
    if(txt.includes('calific')) return 'qualification';
    if(txt.includes('contact') || txt.includes('asign')) return 'contact';
    if(txt.includes('nuevo') || txt.includes('lead')) return 'new';
    return 'other';
  }

  function statusIntentKey(statusName){
    const txt = normalizeMatcherText(statusName);
    if(!txt) return 'other';
    if(txt.includes('critic')) return 'critical';
    if(txt.includes('urgent')) return 'urgent';
    if(txt.includes('esper') && txt.includes('cliente')) return 'waiting_client';
    if(txt.includes('seguimiento')) return 'followup';
    if(txt.includes('ganad')) return 'won';
    if(txt.includes('perdid')) return 'lost';
    if(txt.includes('sin gestionar') || txt.includes('pendiente') || txt.includes('sin atender')) return 'new';
    return 'other';
  }

  function findFunnelStageByIntent(intent){
    const needle = String(intent || '');
    const stages = Array.isArray(crmConfig && crmConfig.funnel) ? crmConfig.funnel : [];
    const found = stages.find((stage) => stageIntentKey(stage) === needle);
    if(found) return found;
    if(needle === 'negotiation'){
      const followupStage = stages.find((stage) => stageIntentKey(stage) === 'followup');
      if(followupStage) return followupStage;
    }
    if(needle === 'qualification'){
      const contactStage = stages.find((stage) => stageIntentKey(stage) === 'contact');
      if(contactStage) return contactStage;
    }
    return stages.find((stage) => String(stage || '').toLowerCase() !== 'archivados') || DEFAULT_FUNNEL_ORDER[0];
  }

  function findStatusByIntent(intent){
    const needle = String(intent || '');
    const statuses = Array.isArray(crmConfig && crmConfig.statuses) ? crmConfig.statuses : [];
    const found = statuses.find((status) => statusIntentKey(status) === needle);
    if(found) return found;
    return statuses[0] || DEFAULT_STATUS_ORDER[0];
  }

  function normalizeLeadFunnelLabel(value){
    const intent = stageIntentKey(value);
    if(intent === 'archived'){
      return (Array.isArray(crmConfig && crmConfig.funnel) ? crmConfig.funnel : []).find((stage) => stageIntentKey(stage) === 'archived') || 'Archivados';
    }
    if(intent === 'other') return findFunnelStageByIntent('new');
    return findFunnelStageByIntent(intent);
  }

  function normalizeLeadStatusLabel(value){
    const intent = statusIntentKey(value);
    if(intent === 'other') return findStatusByIntent('new');
    return findStatusByIntent(intent);
  }

  function isWonFunnelLabel(funnelName){
    return stageIntentKey(funnelName) === 'won';
  }

  function isUnattendedStatusLabel(statusName){
    const intent = statusIntentKey(statusName);
    return intent === 'new';
  }

  function loadCrmConfig(){
    try{
      const parsed = JSON.parse(localStorage.getItem(CRM_CONFIG_KEY) || '{}');
      return normalizeCrmConfig(parsed);
    }catch(_e){
      return normalizeCrmConfig(DEFAULT_CRM_CONFIG);
    }
  }

  function saveCrmConfig(){
    try{ localStorage.setItem(CRM_CONFIG_KEY, JSON.stringify(crmConfig)); }catch(_e){}
  }

  function showCfgMessage(text){
    if(cfgMessageEl) cfgMessageEl.textContent = text || '';
  }

  function cloneCrmConfig(config){
    const safe = config || {};
    return {
      funnel: Array.isArray(safe.funnel) ? safe.funnel.slice() : [],
      agents: Array.isArray(safe.agents) ? safe.agents.slice() : [],
      statuses: Array.isArray(safe.statuses) ? safe.statuses.slice() : []
    };
  }

  function ensureSettingsDraft(){
    if(!draftCrmConfig) draftCrmConfig = cloneCrmConfig(crmConfig);
    if(!Array.isArray(draftQuickReplies) || !draftQuickReplies.length){
      draftQuickReplies = Array.isArray(quickReplies) ? quickReplies.slice() : DEFAULT_QUICK_REPLIES.slice();
    }
    if(!Array.isArray(draftQuickReplySections) || !draftQuickReplySections.length){
      draftQuickReplySections = Array.isArray(quickReplySections) ? quickReplySections.slice() : DEFAULT_QUICK_REPLY_SECTIONS.slice();
    }
    if(!draftQuickReplyPipelineRules || typeof draftQuickReplyPipelineRules !== 'object'){
      draftQuickReplyPipelineRules = normalizeQuickReplyPipelineRules(quickReplyPipelineRules);
    }
  }

  function resetSettingsDraftFromSaved(){
    draftCrmConfig = cloneCrmConfig(crmConfig);
    draftQuickReplies = Array.isArray(quickReplies) ? quickReplies.slice() : DEFAULT_QUICK_REPLIES.slice();
    draftQuickReplySections = Array.isArray(quickReplySections) ? quickReplySections.slice() : DEFAULT_QUICK_REPLY_SECTIONS.slice();
    draftQuickReplyPipelineRules = normalizeQuickReplyPipelineRules(quickReplyPipelineRules);
    draftPrimaryFunnelBoardName = primaryFunnelBoardName;
    settingsHasUnsavedChanges = false;
  }

  function markSettingsDirty(){
    settingsHasUnsavedChanges = true;
  }

  function confirmDiscardUnsavedSettings(){
    if(!settingsHasUnsavedChanges) return true;
    return confirm('Seguro que quieres salir sin guardar los cambios?');
  }

  function loadCatalogMeta(){
    try{
      const parsed = JSON.parse(localStorage.getItem(CATALOG_META_KEY) || '{}');
      const safe = parsed && typeof parsed === 'object' ? parsed : {};
      return {
        funnel: safe.funnel && typeof safe.funnel === 'object' ? safe.funnel : {},
        statuses: safe.statuses && typeof safe.statuses === 'object' ? safe.statuses : {}
      };
    }catch(_e){
      return { funnel: {}, statuses: {} };
    }
  }

  function normalizeFunnelBoardName(name){
    return String(name || '').trim().replace(/\s+/g, ' ').slice(0, 60).toUpperCase();
  }

  function loadFunnelBoardsState(){
    const fallback = { boards: ['VENTAS MENUDEO'], active: 'VENTAS MENUDEO', primary: 'VENTAS MENUDEO' };
    try{
      const parsed = JSON.parse(localStorage.getItem(FUNNEL_BOARDS_KEY) || '{}');
      const rawBoards = Array.isArray(parsed && parsed.boards) ? parsed.boards : [];
      const boards = Array.from(new Set(rawBoards.map(normalizeFunnelBoardName).filter(Boolean)));
      const safeBoards = boards.length ? boards : fallback.boards.slice();
      const active = normalizeFunnelBoardName(parsed && parsed.active) || safeBoards[0];
      const primary = normalizeFunnelBoardName(parsed && parsed.primary) || safeBoards[0];
      return {
        boards: safeBoards,
        active: safeBoards.includes(active) ? active : safeBoards[0],
        primary: safeBoards.includes(primary) ? primary : safeBoards[0]
      };
    }catch(_e){
      return fallback;
    }
  }

  function saveFunnelBoardsState(){
    const safeBoards = Array.from(new Set((Array.isArray(funnelBoards) ? funnelBoards : []).map(normalizeFunnelBoardName).filter(Boolean)));
    if(!safeBoards.length) safeBoards.push('VENTAS MENUDEO');
    const active = safeBoards.includes(activeFunnelBoardName) ? activeFunnelBoardName : safeBoards[0];
    const primary = safeBoards.includes(primaryFunnelBoardName) ? primaryFunnelBoardName : safeBoards[0];
    funnelBoards = safeBoards;
    activeFunnelBoardName = active;
    primaryFunnelBoardName = primary;
    try{
      localStorage.setItem(FUNNEL_BOARDS_KEY, JSON.stringify({ boards: safeBoards, active, primary }));
    }catch(_e){}
  }

  function renderFunnelsBoardHeader(){
    saveFunnelBoardsState();
    if(funnelsBoardNameTextEl){
      funnelsBoardNameTextEl.textContent = activeFunnelBoardName;
    }
    if(funnelsBoardSelectEl){
      const current = activeFunnelBoardName;
      funnelsBoardSelectEl.innerHTML = '';
      funnelBoards.forEach((name) => {
        const op = document.createElement('option');
        op.value = name;
        op.textContent = name;
        funnelsBoardSelectEl.appendChild(op);
      });
      if(funnelBoards.includes(current)) funnelsBoardSelectEl.value = current;
    }
    renderAddLeadTargets();
  }

  function renderAddLeadTargets(){
    if(!addLeadTargetEl) return;
    const boards = Array.isArray(funnelBoards) && funnelBoards.length
      ? funnelBoards.slice()
      : ['VENTAS MENUDEO'];

    const current = normalizeFunnelBoardName(addLeadTargetEl.value || activeFunnelBoardName || boards[0]);
    addLeadTargetEl.innerHTML = '';
    boards.forEach((name) => {
      const safe = normalizeFunnelBoardName(name);
      const op = document.createElement('option');
      op.value = safe;
      op.textContent = safe;
      addLeadTargetEl.appendChild(op);
    });

    if(boards.includes(current)){
      addLeadTargetEl.value = current;
    }else{
      addLeadTargetEl.value = normalizeFunnelBoardName(activeFunnelBoardName || boards[0]);
    }
  }

  async function addNewFunnelBoard(){
    const ok = await openDirModal('Nuevo embudo', (root) => {
      const row = document.createElement('div');
      row.className = 'dir-modal-row';
      row.innerHTML = '<label>Nombre del embudo</label><input id="waNewFunnelBoardInput" class="wa-auth-input" type="text" placeholder="Ej: VENTAS MAYOREO">';
      root.appendChild(row);
      setTimeout(() => {
        const input = document.getElementById('waNewFunnelBoardInput');
        if(input) input.focus();
      }, 0);
    });
    if(!ok) return;
    const input = document.getElementById('waNewFunnelBoardInput');
    const name = normalizeFunnelBoardName(input && input.value || '');
    if(!name) return;
    if(!funnelBoards.includes(name)) funnelBoards.push(name);
    activeFunnelBoardName = name;
    if(!primaryFunnelBoardName) primaryFunnelBoardName = name;
    draftPrimaryFunnelBoardName = primaryFunnelBoardName;
    saveFunnelBoardsState();
    renderFunnelsBoardHeader();
    renderFunnelsBoard();
  }

  function saveCatalogMeta(){
    try{ localStorage.setItem(CATALOG_META_KEY, JSON.stringify(catalogMeta || { funnel:{}, statuses:{} })); }catch(_e){}
  }

  function catalogListForType(type){
    ensureSettingsDraft();
    return type === 'statuses' ? (draftCrmConfig.statuses || []) : (draftCrmConfig.funnel || []);
  }

  function catalogLabel(type){
    return type === 'statuses' ? 'Estatus' : 'Etapas';
  }

  function ensureCatalogMetaForConfig(){
    const now = Date.now();
    const by = getSystemUserName();
    ['funnel','statuses'].forEach((type) => {
      if(!catalogMeta[type] || typeof catalogMeta[type] !== 'object') catalogMeta[type] = {};
      const aliveKeys = new Set();
      catalogListForType(type).forEach((name) => {
        const key = String(name || '').trim().toLowerCase();
        if(!key) return;
        aliveKeys.add(key);
        if(!catalogMeta[type][key]){
          catalogMeta[type][key] = { createdBy: by, createdAt: now };
        }
      });
      Object.keys(catalogMeta[type]).forEach((key) => {
        if(!aliveKeys.has(key)) delete catalogMeta[type][key];
      });
    });
  }

  function countClientsForCatalogItem(type, name){
    const safeName = String(name || '').trim().toLowerCase();
    if(!safeName) return 0;
    const rows = getLeadRows();
    if(type === 'statuses'){
      return rows.filter((row) => {
        const a = String(row.status || '').trim().toLowerCase();
        const b = String(row.stage || '').trim().toLowerCase();
        return a === safeName || b === safeName;
      }).length;
    }
    return rows.filter((row) => String(row.funnel || '').trim().toLowerCase() === safeName).length;
  }

  function renderCatalogTable(){
    if(!catalogTableBodyEl) return;
    ensureCatalogMetaForConfig();
    const type = activeCatalogType === 'statuses' ? 'statuses' : 'funnel';
    if(catalogTypeEl) catalogTypeEl.value = type;
    const values = catalogListForType(type);
    catalogTableBodyEl.innerHTML = '';
    if(!values.length){
      catalogTableBodyEl.innerHTML = '<tr><td colspan="5" class="wa-catalog-empty">Sin elementos registrados.</td></tr>';
      return;
    }
    const frag = document.createDocumentFragment();
    values.forEach((name) => {
      const key = String(name || '').trim().toLowerCase();
      const meta = catalogMeta[type][key] || { createdBy:'Sistema', createdAt:0 };
      const tr = document.createElement('tr');

      const tdName = document.createElement('td');
      tdName.textContent = String(name || '');
      const tdBy = document.createElement('td');
      tdBy.textContent = String(meta.createdBy || 'Sistema');
      const tdAt = document.createElement('td');
      tdAt.textContent = meta.createdAt ? new Date(meta.createdAt).toLocaleString() : '-';
      const tdCount = document.createElement('td');
      tdCount.textContent = String(countClientsForCatalogItem(type, name));
      const tdAction = document.createElement('td');
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'wa-settings-list-remove';
      btn.textContent = 'Quitar';
      btn.addEventListener('click', () => removeCatalogItem(type, name));
      tdAction.appendChild(btn);

      tr.appendChild(tdName);
      tr.appendChild(tdBy);
      tr.appendChild(tdAt);
      tr.appendChild(tdCount);
      tr.appendChild(tdAction);
      frag.appendChild(tr);
    });
    catalogTableBodyEl.appendChild(frag);
  }

  function openCatalogModal(){
    const type = activeCatalogType === 'statuses' ? 'statuses' : 'funnel';
    if(catalogModalTitleEl) catalogModalTitleEl.textContent = 'Agregar ' + (type === 'funnel' ? 'etapa' : 'estatus');
    if(catalogModalTypeLabelEl) catalogModalTypeLabelEl.textContent = 'Tipo: ' + catalogLabel(type);
    if(catalogNameInputEl) catalogNameInputEl.value = '';
    if(catalogBackdropEl){
      catalogBackdropEl.classList.add('open');
      catalogBackdropEl.setAttribute('aria-hidden', 'false');
    }
    if(catalogNameInputEl) catalogNameInputEl.focus();
  }

  function closeCatalogModal(){
    if(catalogBackdropEl){
      catalogBackdropEl.classList.remove('open');
      catalogBackdropEl.setAttribute('aria-hidden', 'true');
    }
  }

  function addCatalogItemFromModal(){
    const type = activeCatalogType === 'statuses' ? 'statuses' : 'funnel';
    const value = String(catalogNameInputEl && catalogNameInputEl.value || '').trim();
    if(!value) return;
    const list = catalogListForType(type).slice();
    const exists = list.some((x) => String(x || '').trim().toLowerCase() === value.toLowerCase());
    if(exists){
      showCfgMessage('Ese valor ya existe en ' + catalogLabel(type).toLowerCase() + '.');
      return;
    }
    list.push(value);
    if(type === 'funnel') draftCrmConfig.funnel = list;
    else draftCrmConfig.statuses = list;
    const key = value.toLowerCase();
    if(!catalogMeta[type]) catalogMeta[type] = {};
    catalogMeta[type][key] = { createdBy: getSystemUserName(), createdAt: Date.now() };
    draftCrmConfig = normalizeCrmConfig(draftCrmConfig);
    markSettingsDirty();
    renderCatalogTable();
    showCfgMessage(catalogLabel(type).slice(0, -1) + ' agregado correctamente.');
    closeCatalogModal();
  }

  function removeCatalogItem(type, name){
    const safeName = String(name || '').trim();
    if(!safeName) return;
    if(type === 'funnel' && safeName.toLowerCase() === 'archivados'){
      showCfgMessage('La etapa "Archivados" es obligatoria y no se puede quitar.');
      return;
    }
    if(!confirm('Deseas quitar "' + safeName + '" de ' + catalogLabel(type).toLowerCase() + '?')) return;
    if(type === 'funnel'){
      draftCrmConfig.funnel = (draftCrmConfig.funnel || []).filter((x) => String(x || '').trim().toLowerCase() !== safeName.toLowerCase());
    } else {
      draftCrmConfig.statuses = (draftCrmConfig.statuses || []).filter((x) => String(x || '').trim().toLowerCase() !== safeName.toLowerCase());
    }
    if(catalogMeta[type]) delete catalogMeta[type][safeName.toLowerCase()];
    draftCrmConfig = normalizeCrmConfig(draftCrmConfig);
    markSettingsDirty();
    renderCatalogTable();
    showCfgMessage('Elemento eliminado.');
  }

  function showUsersMessage(text){
    if(usersMessageEl) usersMessageEl.textContent = text || '';
  }

  function showQuickReplyMessage(text){
    if(quickReplyMessageEl) quickReplyMessageEl.textContent = text || '';
  }

  function showProfileMessage(text){
    if(profileMessageEl) profileMessageEl.textContent = text || '';
  }

  function showMetaBusinessNameMessage(text){
    if(metaBusinessNameMessageEl) metaBusinessNameMessageEl.textContent = text || '';
  }

  function loadRailProfileName(){
    try{
      const custom = String(localStorage.getItem(RAIL_PROFILE_NAME_KEY) || '').trim();
      if(custom) return custom;
      return String(localStorage.getItem('waCurrentUserName') || '').trim();
    }catch(_e){
      return '';
    }
  }

  function loadRailProfilePhoto(){
    try{
      return String(localStorage.getItem(RAIL_PROFILE_PHOTO_KEY) || '').trim();
    }catch(_e){
      return '';
    }
  }

  function defaultRailProfilePhoto(){
    return 'https://i.pravatar.cc/64?u=maq-imprenta';
  }

  function applyRailProfileUi(){
    const name = loadRailProfileName() || 'Mi Perfil';
    const photo = loadRailProfilePhoto() || defaultRailProfilePhoto();

    if(railProfileNameEl) railProfileNameEl.textContent = name;
    if(railProfilePicEl) railProfilePicEl.src = photo;
    if(profilePreviewPicEl) profilePreviewPicEl.src = photo;
    if(profileNameInputEl && document.activeElement !== profileNameInputEl){
      profileNameInputEl.value = name;
    }
  }

  function validateMetaSafeProfileName(inputName){
    const name = String(inputName || '').replace(/\s+/g, ' ').trim();
    if(name.length < 3 || name.length > 60){
      return { ok:false, error:'El nombre debe tener entre 3 y 60 caracteres.' };
    }
    if(/https?:\/\/|www\.|@/i.test(name)){
      return { ok:false, error:'El nombre no debe incluir URLs o correos.' };
    }
    if(/\b(meta|whatsapp|facebook)\b/i.test(name)){
      return { ok:false, error:'Evita usar marcas reservadas (Meta/WhatsApp/Facebook) en el nombre visible.' };
    }
    if(!/[a-zA-Z\u00C0-\u017F]/.test(name)){
      return { ok:false, error:'El nombre debe contener letras.' };
    }
    if(/[^a-zA-Z0-9\u00C0-\u017F .,&()\-]/.test(name)){
      return { ok:false, error:'Usa solo letras, numeros, espacios y . , & ( ) -' };
    }
    return { ok:true, value:name };
  }

  function readImageAsDataUrl(file){
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error('No se pudo leer la imagen.'));
      reader.onload = () => resolve(String(reader.result || ''));
      reader.readAsDataURL(file);
    });
  }

  function validateProfileImageFile(file){
    if(!file) return { ok:false, error:'Selecciona una imagen.' };
    const allowed = ['image/png','image/jpeg','image/webp'];
    if(!allowed.includes(String(file.type || '').toLowerCase())){
      return { ok:false, error:'Formato no permitido. Usa PNG, JPG o WEBP.' };
    }
    const maxBytes = 5 * 1024 * 1024;
    if(Number(file.size || 0) > maxBytes){
      return { ok:false, error:'La imagen excede 5MB.' };
    }
    return { ok:true };
  }

  async function applyRailProfileFromSettings(){
    const nameRaw = profileNameInputEl ? profileNameInputEl.value : '';
    const nameCheck = validateMetaSafeProfileName(nameRaw);
    if(!nameCheck.ok){
      showProfileMessage(nameCheck.error);
      return;
    }

    let nextPhoto = loadRailProfilePhoto() || defaultRailProfilePhoto();
    const file = profilePhotoInputEl && profilePhotoInputEl.files ? profilePhotoInputEl.files[0] : null;
    if(file){
      const imageCheck = validateProfileImageFile(file);
      if(!imageCheck.ok){
        showProfileMessage(imageCheck.error);
        return;
      }
      try{
        nextPhoto = await readImageAsDataUrl(file);
      }catch(_e){
        showProfileMessage('No se pudo procesar la imagen seleccionada.');
        return;
      }
    }

    try{
      localStorage.setItem(RAIL_PROFILE_NAME_KEY, nameCheck.value);
      localStorage.setItem('waCurrentUserName', nameCheck.value);
      localStorage.setItem(RAIL_PROFILE_PHOTO_KEY, nextPhoto);
    }catch(_e){
      showProfileMessage('No se pudo guardar el perfil en este navegador.');
      return;
    }

    if(profilePhotoInputEl) profilePhotoInputEl.value = '';
    applyRailProfileUi();
    showProfileMessage('Perfil actualizado correctamente.');
    renderDashboard();
  }

  function resetRailProfileToDefault(){
    try{
      localStorage.removeItem(RAIL_PROFILE_NAME_KEY);
      localStorage.removeItem(RAIL_PROFILE_PHOTO_KEY);
    }catch(_e){}
    if(profilePhotoInputEl) profilePhotoInputEl.value = '';
    applyRailProfileUi();
    showProfileMessage('Perfil restaurado a valores por defecto.');
    renderDashboard();
  }

  async function loadMetaBusinessProfileName(){
    if(!metaBusinessNameInputEl) return;
    showMetaBusinessNameMessage('');
    try{
      const resp = await fetch('/wa/meta-business-profile');
      const data = await resp.json().catch(() => ({}));
      if(!resp.ok || !data || data.ok !== true){
        const detail = String((data && data.detail) || (data && data.message) || 'No se pudo obtener el nombre de negocio en Meta.');
        showMetaBusinessNameMessage(detail);
        return;
      }
      const profile = data && data.profile && typeof data.profile === 'object' ? data.profile : {};
      const metaName = String(data.verifiedName || profile.description || profile.about || '').trim();
      if(metaName && document.activeElement !== metaBusinessNameInputEl){
        metaBusinessNameInputEl.value = metaName;
      }
      if(data.displayNameHint){
        showMetaBusinessNameMessage(String(data.displayNameHint));
      }
    }catch(_e){
      showMetaBusinessNameMessage('No se pudo conectar con Meta para leer el nombre de negocio.');
    }
  }

  async function applyMetaBusinessName(){
    if(!metaBusinessNameInputEl) return;
    const desired = String(metaBusinessNameInputEl.value || '').replace(/\s+/g, ' ').trim();
    if(!desired){
      showMetaBusinessNameMessage('Escribe el nombre de negocio que deseas en Meta.');
      return;
    }
    showMetaBusinessNameMessage('Aplicando en Meta...');
    try{
      const resp = await fetch('/wa/meta-business-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ displayName: desired })
      });
      const data = await resp.json().catch(() => ({}));
      const msg = String((data && (data.message || data.detail)) || 'Respuesta recibida de Meta.');
      showMetaBusinessNameMessage(msg);
      if(data && data.ok === true && data.updated){
        await loadMetaBusinessProfileName();
      }
    }catch(_e){
      showMetaBusinessNameMessage('No se pudo enviar el cambio a Meta.');
    }
  }

  function normalizeTextForMatching(value){
    return String(value || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function normalizeQuickReplySectionName(value){
    const txt = String(value || '').replace(/\s+/g, ' ').trim();
    if(!txt) return 'General';
    const lower = txt.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }

  function normalizeQuickReplySections(input){
    const base = Array.isArray(input) ? input : [];
    const set = new Set(DEFAULT_QUICK_REPLY_SECTIONS.map((x) => normalizeQuickReplySectionName(x)));
    base.forEach((name) => set.add(normalizeQuickReplySectionName(name)));
    return Array.from(set);
  }

  function normalizeQuickReplyKeywords(value){
    const list = Array.isArray(value)
      ? value
      : String(value || '').split(',');
    const out = [];
    const seen = new Set();
    list.forEach((item) => {
      const key = normalizeTextForMatching(item);
      if(!key || seen.has(key)) return;
      seen.add(key);
      out.push(key);
    });
    return out;
  }

  function normalizeQuickReplyCode(value){
    return String(value || '')
      .trim()
      .toLowerCase()
      .replace(/^\/+/, '')
      .replace(/[^a-z0-9_-]/g, '');
  }

  function normalizeQuickReplyImageUrl(value){
    const raw = String(value || '').trim();
    if(!raw) return '';
    return /^https?:\/\//i.test(raw) ? raw : '';
  }

  function nextQuickReplyId(list){
    const used = new Set((Array.isArray(list) ? list : []).map((x) => String(x && x.id || '').trim().toUpperCase()));
    for(let i = 1; i < 10000; i += 1){
      const id = 'QR-' + String(i).padStart(3, '0');
      if(!used.has(id)) return id;
    }
    return 'QR-' + String(Date.now()).slice(-6);
  }

  function buildCodeFromText(text){
    const seed = String(text || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').trim();
    const first = seed.split(/\s+/).filter(Boolean).slice(0, 2).join('');
    return normalizeQuickReplyCode(first || 'respuesta');
  }

  function loadQuickReplySections(){
    try{
      const parsed = JSON.parse(localStorage.getItem(QUICK_REPLY_SECTIONS_KEY) || '[]');
      return normalizeQuickReplySections(parsed);
    }catch(_e){
      return DEFAULT_QUICK_REPLY_SECTIONS.slice();
    }
  }

  function saveQuickReplySections(){
    try{ localStorage.setItem(QUICK_REPLY_SECTIONS_KEY, JSON.stringify(quickReplySections || [])); }catch(_e){}
  }

  function normalizeQuickReplyEntries(input){
    const list = Array.isArray(input) ? input : [];
    const out = [];
    const usedCodes = new Set();
    list.forEach((item) => {
      const isString = typeof item === 'string';
      const text = String(isString ? item : (item && item.text) || '').trim();
      if(!text) return;
      let code = normalizeQuickReplyCode(isString ? '' : (item && item.code));
      if(!code) code = buildCodeFromText(text);
      let baseCode = code || 'respuesta';
      let suffix = 2;
      while(usedCodes.has(code || baseCode)){
        code = baseCode + suffix;
        suffix += 1;
      }
      usedCodes.add(code || baseCode);
      const finalCode = code || baseCode;
      const id = String(!isString && item && item.id ? item.id : '').trim().toUpperCase() || nextQuickReplyId(out);
      const section = normalizeQuickReplySectionName(!isString && item && item.section ? item.section : 'General');
      const keywords = normalizeQuickReplyKeywords(!isString && item ? item.keywords : []);
      const imageUrl = normalizeQuickReplyImageUrl(!isString && item ? item.imageUrl : '');
      out.push({ id, code: finalCode, text, section, keywords, imageUrl });
    });
    return out;
  }

  function loadQuickReplies(){
    try{
      const parsed = JSON.parse(localStorage.getItem(QUICK_REPLIES_KEY) || '[]');
      const list = normalizeQuickReplyEntries(parsed);
      return list.length ? list : DEFAULT_QUICK_REPLIES.slice();
    }catch(_e){
      return DEFAULT_QUICK_REPLIES.slice();
    }
  }

  function saveQuickReplies(){
    try{ localStorage.setItem(QUICK_REPLIES_KEY, JSON.stringify(quickReplies || [])); }catch(_e){}
  }

  function normalizeQuickReplyPipelineRules(input){
    const source = input && typeof input === 'object' ? input : {};
    const out = {};
    Object.keys(source).forEach((key) => {
      const safeKey = String(key || '').trim();
      if(!safeKey) return;
      const item = source[key] && typeof source[key] === 'object' ? source[key] : {};
      out[safeKey] = {
        enabled: item.enabled !== false,
        stage: String(item.stage || '').trim(),
        status: String(item.status || '').trim(),
        id: String(item.id || '').trim(),
        code: normalizeQuickReplyCode(item.code || ''),
        section: normalizeQuickReplySectionName(item.section || ''),
        updatedAt: Number(item.updatedAt || 0) || 0
      };
    });
    return out;
  }

  function loadQuickReplyPipelineRules(){
    try{
      const parsed = JSON.parse(localStorage.getItem(QUICK_REPLY_PIPELINE_RULES_KEY) || '{}');
      return normalizeQuickReplyPipelineRules(parsed);
    }catch(_e){
      return {};
    }
  }

  function saveQuickReplyPipelineRules(){
    try{ localStorage.setItem(QUICK_REPLY_PIPELINE_RULES_KEY, JSON.stringify(quickReplyPipelineRules || {})); }catch(_e){}
  }

  function quickReplyContextText(){
    const latestInbound = (Array.isArray(lastConversationMessages) ? lastConversationMessages : [])
      .slice()
      .reverse()
      .find((msg) => normalizeMessageDirection(msg) === 'in');
    return String(latestInbound && (latestInbound.text || latestInbound.caption || '') || '').trim();
  }

  function scoreQuickReplyAgainstText(reply, text){
    const hay = normalizeTextForMatching(text);
    if(!hay) return 0;
    const code = normalizeTextForMatching(reply && reply.code);
    const body = normalizeTextForMatching(reply && reply.text);
    const section = normalizeTextForMatching(reply && reply.section);
    const keys = normalizeQuickReplyKeywords(reply && reply.keywords);

    let score = 0;
    keys.forEach((kw) => {
      if(!kw) return;
      if(hay.includes(kw)) score += Math.min(90, 35 + kw.length * 2);
    });

    body.split(' ').filter(Boolean).forEach((word) => {
      if(word.length < 5) return;
      if(hay.includes(word)) score += 4;
    });

    if(code && hay.includes(code)) score += 80;
    if(section && hay.includes(section)) score += 24;

    if(section === 'pagos' && /(transfer|clabe|cuenta|deposito|anticipo|banco)/.test(hay)) score += 70;
    if(section === 'envios' && /(envio|guia|paqueteria|entrega|cuando llega)/.test(hay)) score += 70;
    if(section === 'precios' && /(precio|cost|cotiza|cuanto|presupuesto)/.test(hay)) score += 70;
    if(section === 'condiciones' && /(condicion|termino|requisito|politica)/.test(hay)) score += 70;

    return score;
  }

  function rankQuickRepliesForText(text, limit){
    const safeLimit = Math.max(1, Number(limit || 8));
    const ranked = (Array.isArray(quickReplies) ? quickReplies : [])
      .map((reply) => ({ reply, score: scoreQuickReplyAgainstText(reply, text) }))
      .sort((a, b) => b.score - a.score || String(a.reply.code || '').localeCompare(String(b.reply.code || ''), 'es'));
    return ranked.slice(0, safeLimit).map((x) => x.reply);
  }

  function renderQuickReplySmartBar(){
    if(!quickReplySmartBarEl){
      return;
    }
    if(!selected || !isChatsModuleActive()){
      quickReplySmartBarEl.style.display = 'none';
      quickReplySmartBarEl.innerHTML = '';
      return;
    }

    const draft = String(msgInput && msgInput.value || '').trim();
    let suggestions = [];
    if(/^\/[a-z0-9_-]*$/i.test(draft)){
      const needle = normalizeQuickReplyCode(draft.slice(1));
      suggestions = (Array.isArray(quickReplies) ? quickReplies : [])
        .filter((item) => String(item && item.code || '').startsWith(needle))
        .slice(0, 4);
    } else {
      suggestions = rankQuickRepliesForText(quickReplyContextText(), 4);
    }

    if(!suggestions.length){
      quickReplySmartBarEl.style.display = 'none';
      quickReplySmartBarEl.innerHTML = '';
      return;
    }

    quickReplySmartBarEl.innerHTML = '';
    const label = document.createElement('span');
    label.className = 'wa-quickreply-smart-label';
    label.textContent = 'Sugeridas:';
    quickReplySmartBarEl.appendChild(label);

    suggestions.forEach((reply) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'wa-quickreply-smart-btn';
      btn.title = '/' + String(reply && reply.code || '') + ' - ' + String(reply && reply.text || '');
      btn.innerHTML = '<strong>/' + escapeHtml(String(reply && reply.code || '')) + '</strong> ' + escapeHtml(String(reply && reply.text || ''));
      btn.addEventListener('click', () => {
        insertTextInComposer(String(reply && reply.text || ''));
      });
      quickReplySmartBarEl.appendChild(btn);
    });

    quickReplySmartBarEl.style.display = 'flex';
  }

  function renderQuickReplySectionsSettings(){
    if(!quickReplySectionsListEl) return;
    ensureSettingsDraft();
    const sections = normalizeQuickReplySections(draftQuickReplySections);
    quickReplySectionsListEl.innerHTML = '';
    if(!sections.length){
      quickReplySectionsListEl.innerHTML = '<div class="wa-settings-list-empty">Sin secciones.</div>';
      return;
    }
    const frag = document.createDocumentFragment();
    sections.forEach((section) => {
      const row = document.createElement('div');
      row.className = 'wa-settings-list-row';
      const name = document.createElement('span');
      name.className = 'wa-settings-list-name';
      name.textContent = section;
      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.className = 'wa-settings-list-remove';
      removeBtn.textContent = 'Quitar';
      removeBtn.disabled = String(section).toLowerCase() === 'general';
      removeBtn.addEventListener('click', () => {
        draftQuickReplySections = draftQuickReplySections.filter((s) => normalizeQuickReplySectionName(s) !== section);
        draftQuickReplies = draftQuickReplies.map((item) => {
          if(normalizeQuickReplySectionName(item && item.section) !== section) return item;
          return Object.assign({}, item, { section: 'General' });
        });
        markSettingsDirty();
        renderQuickReplySectionsSettings();
        renderQuickRepliesSettings();
        showQuickReplyMessage('Seccion eliminada y respuestas movidas a General.');
      });
      row.appendChild(name);
      row.appendChild(removeBtn);
      frag.appendChild(row);
    });
    quickReplySectionsListEl.appendChild(frag);
    populateQuickReplySectionInputOptions();
  }

  function populateQuickReplySectionInputOptions(selectedValue){
    if(!quickReplySectionInputEl) return;
    ensureSettingsDraft();
    const sections = normalizeQuickReplySections(draftQuickReplySections);
    const next = String(selectedValue || quickReplySectionInputEl.value || 'General');
    quickReplySectionInputEl.innerHTML = '';
    sections.forEach((section) => {
      const op = document.createElement('option');
      op.value = section;
      op.textContent = section;
      quickReplySectionInputEl.appendChild(op);
    });
    const newOp = document.createElement('option');
    newOp.value = '__new__';
    newOp.textContent = 'Nueva seccion...';
    quickReplySectionInputEl.appendChild(newOp);

    const available = sections.concat(['__new__']);
    quickReplySectionInputEl.value = available.includes(next) ? next : 'General';
    if(quickReplySectionNameInputEl){
      const show = quickReplySectionInputEl.value === '__new__';
      quickReplySectionNameInputEl.style.display = show ? '' : 'none';
      if(!show) quickReplySectionNameInputEl.value = '';
    }
  }

  function suggestQuickReplyCode(){
    if(!quickReplyInputEl || !quickReplyCodeInputEl) return;
    const codeNow = normalizeQuickReplyCode(quickReplyCodeInputEl.value || '');
    if(codeNow) return;
    const suggested = buildCodeFromText(String(quickReplyInputEl.value || '').trim());
    if(suggested) quickReplyCodeInputEl.value = suggested;
  }

  function applyQuickReplyPreset(type){
    if(!quickReplyInputEl || !quickReplyKeywordsInputEl || !quickReplySectionInputEl) return;
    const preset = String(type || '').trim().toLowerCase();
    if(preset === 'precio'){
      quickReplyInputEl.value = 'Perfecto, en un momento te comparto la cotizacion.';
      quickReplyKeywordsInputEl.value = 'precio, costos, cotizacion, presupuesto';
      populateQuickReplySectionInputOptions('Precios');
      if(quickReplyCodeInputEl) quickReplyCodeInputEl.value = 'cotiza';
    } else if(preset === 'transferencia'){
      quickReplyInputEl.value = 'Te comparto los datos para transferencia: Banco, CLABE, beneficiario y referencia.';
      quickReplyKeywordsInputEl.value = 'transferencia, clabe, cuenta, banco, pago';
      populateQuickReplySectionInputOptions('Pagos');
      if(quickReplyCodeInputEl) quickReplyCodeInputEl.value = 'transferencia';
    } else if(preset === 'compra'){
      quickReplyInputEl.value = 'Recibido, gracias por tu compra. En breve te comparto confirmacion y siguientes pasos.';
      quickReplyKeywordsInputEl.value = 'compra, confirmado, pedido, recibido';
      populateQuickReplySectionInputOptions('General');
      if(quickReplyCodeInputEl) quickReplyCodeInputEl.value = 'graciascompra';
    }
    if(quickReplyInputEl) quickReplyInputEl.focus();
  }

  function renderQuickRepliesSettings(){
    if(!quickReplyListEl) return;
    quickReplyListEl.innerHTML = '';
    ensureSettingsDraft();
    const list = Array.isArray(draftQuickReplies) ? draftQuickReplies.slice() : [];
    list.sort((a,b) => {
      const sa = normalizeQuickReplySectionName(a && a.section);
      const sb = normalizeQuickReplySectionName(b && b.section);
      if(sa !== sb) return sa.localeCompare(sb, 'es');
      return String(a && a.code || '').localeCompare(String(b && b.code || ''), 'es');
    });
    if(!list.length){
      quickReplyListEl.innerHTML = '<div class="wa-settings-list-empty">Sin respuestas configuradas.</div>';
      return;
    }
    const frag = document.createDocumentFragment();
    list.forEach((reply, idx) => {
      const row = document.createElement('div');
      row.className = 'wa-settings-list-row wa-qr-row';
      const idEl = document.createElement('span');
      idEl.className = 'wa-qr-cell wa-qr-id';
      idEl.textContent = String(reply && reply.id || 'QR-000');
      const codeEl = document.createElement('span');
      codeEl.className = 'wa-qr-cell wa-qr-code';
      codeEl.textContent = '/' + String(reply && reply.code || 'codigo');
      const textEl = document.createElement('span');
      textEl.className = 'wa-qr-cell';
      textEl.innerHTML = '<span class="wa-qr-section">' + escapeHtml(normalizeQuickReplySectionName(reply && reply.section)) + '</span> ' + escapeHtml(String(reply && reply.text || ''));
      const keywordsEl = document.createElement('span');
      keywordsEl.className = 'wa-qr-cell wa-qr-keywords';
      const keys = normalizeQuickReplyKeywords(reply && reply.keywords);
      keywordsEl.textContent = keys.length ? ('keywords: ' + keys.join(', ')) : 'keywords: -';
      if(reply && reply.imageUrl){
        keywordsEl.textContent += ' | foto: si';
      }
      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.className = 'wa-settings-list-remove';
      removeBtn.textContent = 'Quitar';
      removeBtn.addEventListener('click', () => {
        draftQuickReplies = draftQuickReplies.filter((_x, i) => i !== idx);
        markSettingsDirty();
        renderQuickRepliesSettings();
        showQuickReplyMessage('Respuesta rapida eliminada.');
      });
      row.appendChild(idEl);
      row.appendChild(codeEl);
      row.appendChild(textEl);
      row.appendChild(keywordsEl);
      row.appendChild(removeBtn);
      frag.appendChild(row);
    });
    quickReplyListEl.appendChild(frag);
    renderQuickReplyRulesSettings(list);
  }

  function quickReplyRuleKey(reply){
    const id = String(reply && reply.id || '').trim();
    if(id) return 'id:' + id;
    const code = normalizeQuickReplyCode(reply && reply.code || '');
    if(code) return 'code:' + code;
    return '';
  }

  function getDraftQuickReplyRule(reply){
    ensureSettingsDraft();
    const key = quickReplyRuleKey(reply);
    if(!key) return { enabled: false, stage: '' };
    const byKey = draftQuickReplyPipelineRules[key];
    if(byKey && typeof byKey === 'object') return byKey;
    const codeKey = 'code:' + normalizeQuickReplyCode(reply && reply.code || '');
    const byCode = draftQuickReplyPipelineRules[codeKey];
    if(byCode && typeof byCode === 'object') return byCode;
    return { enabled: false, stage: '' };
  }

  function setDraftQuickReplyRule(reply, patch){
    const key = quickReplyRuleKey(reply);
    if(!key) return;
    const prev = getDraftQuickReplyRule(reply);
    const next = Object.assign({}, prev, patch || {}, {
      id: String(reply && reply.id || '').trim(),
      code: normalizeQuickReplyCode(reply && reply.code || ''),
      section: normalizeQuickReplySectionName(reply && reply.section || ''),
      updatedAt: Date.now()
    });
    draftQuickReplyPipelineRules[key] = next;
    markSettingsDirty();
  }

  function deriveQuickReplyPipelineRuleFromReply(reply){
    const section = normalizeMatcherText(reply && reply.section || '');
    const code = normalizeQuickReplyCode(reply && reply.code || '');
    const msg = normalizeMatcherText(reply && reply.text || '');
    const joined = [section, code, msg].filter(Boolean).join(' ');
    if(/gracias por su compra|compra recibida|pedido confirmado|pedido completado|recibido gracias/.test(joined)){
      return { enabled: true, stage: findFunnelStageByIntent('won') };
    }
    if(/transfer|clabe|cuenta|anticipo|datos bancarios|pago/.test(joined)){
      return { enabled: true, stage: findFunnelStageByIntent('followup') };
    }
    if(/precio|costos|cotiza|cotizacion|presupuesto/.test(joined)){
      return { enabled: true, stage: findFunnelStageByIntent('quote') };
    }
    if(/hola|informacion|condiciones|envio|tiempo|entrega|saludo/.test(joined)){
      return { enabled: true, stage: findFunnelStageByIntent('contact') };
    }
    return { enabled: false, stage: '' };
  }

  function applySmartQuickReplyRulesToDraft(){
    ensureSettingsDraft();
    const list = Array.isArray(draftQuickReplies) ? draftQuickReplies : [];
    list.forEach((reply) => {
      const smart = deriveQuickReplyPipelineRuleFromReply(reply);
      setDraftQuickReplyRule(reply, smart);
    });
    renderQuickReplyRulesSettings(list);
    showQuickReplyMessage('Reglas sugeridas aplicadas. Puedes ajustar manualmente cualquier fila.');
  }

  function clearQuickReplyRulesDraft(){
    ensureSettingsDraft();
    draftQuickReplyPipelineRules = {};
    markSettingsDirty();
    renderQuickReplyRulesSettings(Array.isArray(draftQuickReplies) ? draftQuickReplies : []);
    showQuickReplyMessage('Reglas de automatizacion limpiadas.');
  }

  function renderQuickReplyRulesSettings(list){
    if(!quickReplyRulesListEl) return;
    const rows = Array.isArray(list) ? list : [];
    quickReplyRulesListEl.innerHTML = '';
    if(!rows.length){
      quickReplyRulesListEl.innerHTML = '<tr><td colspan="6" class="wa-settings-list-empty">Agrega respuestas rapidas para configurar sus fases automaticas.</td></tr>';
      return;
    }

    const funnelOptions = funnelBoardColumns().filter((stage) => String(stage || '').toLowerCase() !== 'archivados').concat(['Archivados']);
    const frag = document.createDocumentFragment();

    rows.forEach((reply) => {
      const rule = getDraftQuickReplyRule(reply);
      const tr = document.createElement('tr');

      const tdEnabled = document.createElement('td');
      const check = document.createElement('input');
      check.type = 'checkbox';
      check.className = 'wa-qr-auto-check';
      check.checked = rule.enabled !== false && !!rule.stage;
      check.addEventListener('change', () => {
        setDraftQuickReplyRule(reply, { enabled: !!check.checked });
      });
      tdEnabled.appendChild(check);

      const tdId = document.createElement('td');
      tdId.textContent = String(reply && reply.id || '-');

      const tdCode = document.createElement('td');
      tdCode.className = 'wa-qr-auto-code';
      tdCode.textContent = '/' + String(reply && reply.code || '');

      const tdSection = document.createElement('td');
      tdSection.innerHTML = '<span class="wa-qr-section">' + escapeHtml(normalizeQuickReplySectionName(reply && reply.section || 'General')) + '</span>';

      const tdText = document.createElement('td');
      tdText.className = 'wa-qr-auto-text';
      tdText.title = String(reply && reply.text || '');
      tdText.textContent = String(reply && reply.text || '');

      const tdStage = document.createElement('td');
      const stageSelect = document.createElement('select');
      stageSelect.className = 'wa-qr-auto-select';
      stageSelect.innerHTML = '<option value="">Sin cambio</option>';
      funnelOptions.forEach((stage) => {
        const op = document.createElement('option');
        op.value = stage;
        op.textContent = stage;
        stageSelect.appendChild(op);
      });
      stageSelect.value = funnelOptions.includes(String(rule.stage || '')) ? String(rule.stage || '') : '';
      stageSelect.addEventListener('change', () => {
        setDraftQuickReplyRule(reply, { stage: String(stageSelect.value || '') });
      });
      tdStage.appendChild(stageSelect);

      tr.appendChild(tdEnabled);
      tr.appendChild(tdId);
      tr.appendChild(tdCode);
      tr.appendChild(tdSection);
      tr.appendChild(tdText);
      tr.appendChild(tdStage);
      frag.appendChild(tr);
    });

    quickReplyRulesListEl.appendChild(frag);
  }

  function loadAgentEmailMap(){
    try{
      const parsed = JSON.parse(localStorage.getItem(AGENT_EMAIL_MAP_KEY) || '{}');
      return parsed && typeof parsed === 'object' ? parsed : {};
    }catch(_e){
      return {};
    }
  }

  function saveAgentEmailMap(){
    try{ localStorage.setItem(AGENT_EMAIL_MAP_KEY, JSON.stringify(agentEmailMap || {})); }catch(_e){}
  }

  function isLikelyEmail(value){
    const raw = String(value || '').trim();
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw);
  }

  function normalizeEmail(value){
    return String(value || '').trim().toLowerCase();
  }

  function titleCaseWords(value){
    return String(value || '')
      .split(/[\s._-]+/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ')
      .trim();
  }

  function resolveAgentNameFromEmail(email){
    const safeEmail = normalizeEmail(email);
    if(!safeEmail) return '';
    const fbUser = firebaseAuthUsers.find((u) => normalizeEmail(u && u.email) === safeEmail);
    const display = String(fbUser && fbUser.displayName || '').trim();
    if(display) return display;
    return titleCaseWords(safeEmail.split('@')[0] || 'Agente');
  }

  function showDemoClientsMessage(text){
    if(demoClientsMessageEl) demoClientsMessageEl.textContent = text || '';
  }

  function showDemoEverythingMessage(text){
    if(demoEverythingMessageEl) demoEverythingMessageEl.textContent = text || '';
  }

  function stageSettingsKey(stageName){
    return String(stageName || '').trim().toLowerCase();
  }

  function loadFunnelStageSettings(){
    try{
      const parsed = JSON.parse(localStorage.getItem(FUNNEL_STAGE_SETTINGS_KEY) || '{}');
      return parsed && typeof parsed === 'object' ? parsed : {};
    }catch(_e){
      return {};
    }
  }

  function saveFunnelStageSettings(){
    try{ localStorage.setItem(FUNNEL_STAGE_SETTINGS_KEY, JSON.stringify(funnelStageSettings || {})); }catch(_e){}
  }

  function getStageStalledMinutes(stageName){
    const key = stageSettingsKey(stageName);
    const value = Number(funnelStageSettings[key] && funnelStageSettings[key].stalledMinutes || 0);
    return Number.isFinite(value) && value > 0 ? Math.floor(value) : REPLY_SLA_MINUTES;
  }

  function setStageStalledMinutes(stageName, minutes){
    const key = stageSettingsKey(stageName);
    if(!key) return;
    const safe = Math.max(1, Math.floor(Number(minutes || 0)));
    funnelStageSettings[key] = Object.assign({}, funnelStageSettings[key] || {}, { stalledMinutes: safe });
    saveFunnelStageSettings();
  }

  function renameFunnelStage(oldName, newName){
    const from = String(oldName || '').trim();
    const to = String(newName || '').trim();
    if(!from || !to || from === to) return false;
    if((crmConfig.funnel || []).some((stage) => String(stage || '').trim().toLowerCase() === to.toLowerCase())){
      alert('Ya existe una etapa con ese nombre.');
      return false;
    }

    crmConfig.funnel = (crmConfig.funnel || []).map((stage) => stage === from ? to : stage);
    saveCrmConfig();

    Object.keys(crmMeta || {}).forEach((key) => {
      if(String(crmMeta[key] && crmMeta[key].funnel || '') === from){
        crmMeta[key] = Object.assign({}, crmMeta[key], { funnel: to });
      }
    });
    saveCrmMeta();

    const fromKey = stageSettingsKey(from);
    const toKey = stageSettingsKey(to);
    if(funnelStageSettings[fromKey] && !funnelStageSettings[toKey]){
      funnelStageSettings[toKey] = funnelStageSettings[fromKey];
    }
    if(fromKey !== toKey) delete funnelStageSettings[fromKey];
    saveFunnelStageSettings();

    chats = chats.map((chat) => String(chat.funnel || '') === from ? Object.assign({}, chat, { funnel: to }) : chat);
    if(selected && String(selected.funnel || '') === from){
      selected.funnel = to;
      syncToolbarFromSelection();
    }
    renderSettingsForm();
    populateToolbarOptions();
    renderAddLeadTargets();
    return true;
  }

  function insertFunnelStageAfter(referenceStage, newStageName){
    const name = String(newStageName || '').trim();
    if(!name) return false;
    if((crmConfig.funnel || []).some((stage) => String(stage || '').trim().toLowerCase() === name.toLowerCase())){
      alert('Esa etapa ya existe.');
      return false;
    }
    const list = (crmConfig.funnel || []).slice();
    const idx = list.findIndex((stage) => String(stage) === String(referenceStage));
    if(idx < 0) list.push(name);
    else list.splice(idx + 1, 0, name);
    crmConfig.funnel = list;
    saveCrmConfig();
    renderSettingsForm();
    populateToolbarOptions();
    renderAddLeadTargets();
    return true;
  }

  function focusFunnelInlineInput(selector, selectAll){
    requestAnimationFrame(() => {
      const input = funnelsBoardEl ? funnelsBoardEl.querySelector(selector) : null;
      if(!(input instanceof HTMLInputElement)) return;
      input.focus();
      if(selectAll) input.select();
    });
  }

  function startInlineRenameStage(stageName){
    inlineRenameStage = String(stageName || '');
    inlineRenameValue = inlineRenameStage;
    inlineAddAfterStage = '';
    inlineAddValue = '';
    renderFunnelsBoard();
    focusFunnelInlineInput('[data-funnel-inline-rename="1"]', true);
  }

  function cancelInlineRenameStage(){
    if(!inlineRenameStage) return;
    inlineRenameStage = '';
    inlineRenameValue = '';
    renderFunnelsBoard();
  }

  function commitInlineRenameStage(stageName){
    const nextName = String(inlineRenameValue || '').trim();
    inlineRenameStage = '';
    inlineRenameValue = '';
    if(!nextName) return renderFunnelsBoard();
    if(renameFunnelStage(stageName, nextName)) renderFunnelsBoard();
    else renderFunnelsBoard();
  }

  function startInlineAddStageAfter(stageName){
    inlineRenameStage = '';
    inlineRenameValue = '';
    inlineAddAfterStage = String(stageName || '');
    inlineAddValue = '';
    renderFunnelsBoard();
    focusFunnelInlineInput('[data-funnel-inline-add="1"]', false);
  }

  function cancelInlineAddStage(){
    if(!inlineAddAfterStage) return;
    inlineAddAfterStage = '';
    inlineAddValue = '';
    renderFunnelsBoard();
  }

  function commitInlineAddStage(){
    const stageAfter = inlineAddAfterStage;
    const nextName = String(inlineAddValue || '').trim();
    inlineAddAfterStage = '';
    inlineAddValue = '';
    if(!nextName) return renderFunnelsBoard();
    if(insertFunnelStageAfter(stageAfter, nextName)) renderFunnelsBoard();
    else renderFunnelsBoard();
  }

  function reorderFunnelStage(sourceStage, targetStage){
    if(!sourceStage || !targetStage || sourceStage === targetStage) return false;
    const list = (crmConfig.funnel || []).slice();
    const from = list.findIndex((stage) => String(stage) === String(sourceStage));
    const to = list.findIndex((stage) => String(stage) === String(targetStage));
    if(from < 0 || to < 0) return false;
    const moved = list.splice(from, 1)[0];
    list.splice(to, 0, moved);
    crmConfig.funnel = list;
    saveCrmConfig();
    renderSettingsForm();
    populateToolbarOptions();
    renderAddLeadTargets();
    return true;
  }

  function isDemoClientsEnabled(){
    try{ return localStorage.getItem(DEMO_CLIENTS_ENABLED_KEY) === '1'; }
    catch(_e){ return false; }
  }

  function setDemoClientsEnabled(enabled){
    try{ localStorage.setItem(DEMO_CLIENTS_ENABLED_KEY, enabled ? '1' : '0'); }catch(_e){}
  }

  function isDemoEverythingEnabled(){
    try{ return localStorage.getItem(DEMO_EVERYTHING_ENABLED_KEY) === '1'; }
    catch(_e){ return false; }
  }

  function setDemoEverythingEnabled(enabled){
    try{ localStorage.setItem(DEMO_EVERYTHING_ENABLED_KEY, enabled ? '1' : '0'); }catch(_e){}
  }

  function loadDemoClientPhones(){
    try{
      const parsed = JSON.parse(localStorage.getItem(DEMO_CLIENTS_PHONES_KEY) || '[]');
      return Array.isArray(parsed) ? parsed.map((x) => phoneKey(x)).filter(Boolean) : [];
    }catch(_e){
      return [];
    }
  }

  function saveDemoClientPhones(phones){
    try{ localStorage.setItem(DEMO_CLIENTS_PHONES_KEY, JSON.stringify(Array.from(new Set((phones || []).map((x) => phoneKey(x)).filter(Boolean))))); }catch(_e){}
  }

  function pickFrom(list, fallback){
    if(!Array.isArray(list) || !list.length) return fallback;
    return list[Math.floor(Math.random() * list.length)] || fallback;
  }

  function randomDemoAgeMs(){
    const TEN_MIN_MS = 10 * 60 * 1000;
    const MIN_AGE_MS = 3 * 60 * 1000;
    return MIN_AGE_MS + Math.floor(Math.random() * Math.max(1, TEN_MIN_MS - MIN_AGE_MS));
  }

  function keepDemoClientsInsideTwoHourWindow(){
    const now = Date.now();
    const TEN_MIN_MS = 10 * 60 * 1000;
    const demoPhones = new Set(loadDemoClientPhones());
    let changed = false;

    Object.keys(crmMeta || {}).forEach((key) => {
      const phone = phoneKey(key);
      const meta = crmMeta[key] || {};
      if(!(meta.isDemoClient || demoPhones.has(phone))) return;

      const read = meta.read !== false;
      const currentTs = normalizeTimestamp(meta.lastMessageTs);
      const ageMs = currentTs ? (now - currentTs) : Number.POSITIVE_INFINITY;
      const outsideWindow = !currentTs || ageMs < 0 || ageMs > TEN_MIN_MS;
      if(!outsideWindow) return;

      const lastMessageTs = now - randomDemoAgeMs();
      const lastSeenTs = read ? (lastMessageTs + (5 * 60 * 1000)) : Math.max(0, lastMessageTs - (25 * 60 * 1000));
      crmMeta[key] = Object.assign({}, meta, {
        isDemoClient: true,
        read,
        lastMessageTs,
        lastSeenTs,
        lastMessagePreview: read ? 'Seguimiento demo' : 'Hola, necesito informacion'
      });
      changed = true;
    });

    if(changed) saveCrmMeta();
  }

  function stageByLabel(label){
    const needle = normalizeMatcherText(label);
    const stages = Array.isArray(crmConfig && crmConfig.funnel) ? crmConfig.funnel : [];
    return stages.find((stage) => normalizeMatcherText(stage) === needle) || '';
  }

  function demoStagePlan(){
    const sequence = [
      findFunnelStageByIntent('new'),
      findFunnelStageByIntent('contact'),
      findFunnelStageByIntent('quote'),
      stageByLabel('Seguimiento 1'),
      stageByLabel('Seguimiento 2'),
      stageByLabel('Seguimiento 3'),
      stageByLabel('Anticipo'),
      stageByLabel('Diseno aprobado'),
      stageByLabel('En produccion'),
      stageByLabel('Listo para entrega'),
      stageByLabel('Entregado'),
      findFunnelStageByIntent('won'),
      findFunnelStageByIntent('lost')
    ];
    const normalized = [];
    sequence.forEach((stage) => {
      const safe = normalizeLeadFunnelLabel(stage);
      if(!safe || stageIntentKey(safe) === 'archived') return;
      if(!normalized.includes(safe)) normalized.push(safe);
    });
    if(normalized.length) return normalized;
    return (crmConfig.funnel || []).filter((stage) => stageIntentKey(stage) !== 'archived');
  }

  function demoPreviewForStage(stage, idx){
    const n = Number(idx || 0) + 1;
    const intent = stageIntentKey(stage);
    if(intent === 'new') return 'Hola, quiero cotizar unas etiquetas para mi negocio.';
    if(intent === 'contact') return 'Te comparti precios base y tiempos de entrega iniciales.';
    if(intent === 'quote') return 'Cotizacion enviada: total estimado $' + String(2400 + (n * 170)) + ' MXN.';
    if(intent === 'followup') return 'Seguimiento #' + String(Math.max(1, (n % 3) + 1)) + ': quedo pendiente tu confirmacion.';
    if(intent === 'won') return 'Pedido confirmado. Gracias por tu compra.';
    if(intent === 'lost') return 'Sin respuesta despues de cotizacion y seguimientos.';
    const txt = normalizeMatcherText(stage);
    if(txt.includes('anticipo')) return 'Cliente compartio comprobante de anticipo.';
    if(txt.includes('diseno')) return 'Arte final aprobado por el cliente.';
    if(txt.includes('produccion')) return 'Trabajo en produccion, corte y acabado en proceso.';
    if(txt.includes('listo') && txt.includes('entrega')) return 'Pedido terminado, listo para entrega o recoleccion.';
    if(txt.includes('entregado')) return 'Pedido entregado y recibido por cliente.';
    return 'Seguimiento demo del proceso comercial.';
  }

  function createDemoClientsBatch(){
    const total = 50;
    const now = Date.now();
    const phones = [];
    const plannedStages = demoStagePlan();

    for(let i = 1; i <= total; i += 1){
      const phone = '5215500' + String(i).padStart(4, '0');
      const name = 'Cliente Demo ' + String(i).padStart(2, '0');
      phones.push(phone);

      const stage = plannedStages[(i - 1) % Math.max(1, plannedStages.length)] || findFunnelStageByIntent('new');
      const intent = stageIntentKey(stage);
      const read = !(intent === 'new' || intent === 'contact' || intent === 'quote' || intent === 'followup') ? true : (i % 3 === 0);
      const ageMs = randomDemoAgeMs();
      const lastMessageTs = now - ageMs;
      const lastSeenTs = read ? (lastMessageTs + (5 * 60 * 1000)) : Math.max(0, lastMessageTs - (25 * 60 * 1000));
      const status = pickFrom(crmConfig.statuses, findStatusByIntent('new'));
      const agent = pickFrom(crmConfig.agents.filter((x) => String(x).toLowerCase() !== 'no asignado'), 'No asignado');

      const existing = localImportedLeads.find((lead) => phoneKey(lead.phone) === phone);
      if(existing){
        existing.name = name;
        existing.phone = phone;
        existing.__demo = true;
      } else {
        localImportedLeads.push({ name, phone, __demo: true });
      }

      setMeta(phone, {
        isDemoClient: true,
        read,
        lastSeenTs,
        lastMessageTs,
        lastMessagePreview: demoPreviewForStage(stage, i - 1),
        funnel: stage,
        status,
        agent,
        archived: false,
        deleted: false
      });
    }

    const uniq = new Map();
    localImportedLeads.forEach((lead) => {
      const key = phoneKey(lead.phone);
      if(key) uniq.set(key, Object.assign({}, lead, { phone: key }));
    });
    localImportedLeads = Array.from(uniq.values());
    saveLocalImportedLeads();
    saveDemoClientPhones(phones);
  }

  function createDemoMultimediaItems(phones){
    const now = Date.now();
    const pool = [];
    const sampleDocs = ['cotizacion.pdf', 'ficha-tecnica.pdf', 'orden-compra.xlsx', 'brief-diseno.docx'];
    const sampleLinks = [
      'https://maquilero.mx/catalogo',
      'https://drive.google.com/',
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      'https://maps.google.com/?q=CDMX'
    ];

    phones.slice(0, 24).forEach((phone, i) => {
      const isOut = i % 3 === 0;
      const senderType = isOut ? 'me' : 'others';
      const senderLabel = isOut ? 'Tu' : ('Cliente Demo ' + String(i + 1).padStart(2, '0'));
      const baseTs = now - ((i + 1) * 3600000);

      pool.push({
        id: 'demo_asset_' + phone + '_' + i,
        kind: 'asset',
        title: 'Imagen demo ' + String(i + 1),
        comment: 'Muestra de producto #' + String(i + 1),
        senderType,
        senderLabel,
        phone,
        contactLabel: senderLabel,
        timestamp: baseTs,
        url: 'https://picsum.photos/seed/maq' + String(i + 20) + '/900/600',
        messageId: 'demo_msg_asset_' + String(i + 1)
      });

      pool.push({
        id: 'demo_doc_' + phone + '_' + i,
        kind: 'doc',
        title: sampleDocs[i % sampleDocs.length],
        comment: 'Documento de referencia para pedido demo',
        senderType,
        senderLabel,
        phone,
        contactLabel: senderLabel,
        timestamp: baseTs - 140000,
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        messageId: 'demo_msg_doc_' + String(i + 1)
      });

      pool.push({
        id: 'demo_link_' + phone + '_' + i,
        kind: 'link',
        title: sampleLinks[i % sampleLinks.length],
        comment: 'Enlace de seguimiento compartido en demo',
        senderType,
        senderLabel,
        phone,
        contactLabel: senderLabel,
        timestamp: baseTs - 300000,
        url: sampleLinks[i % sampleLinks.length],
        messageId: 'demo_msg_link_' + String(i + 1)
      });
    });
    return pool;
  }

  function createDemoEverythingBatch(){
    let phones = loadDemoClientPhones();
    if(!phones.length){
      createDemoClientsBatch();
      phones = loadDemoClientPhones();
    }

    const plannedStages = demoStagePlan();
    const statuses = (crmConfig.statuses || []).slice();
    const agents = crmConfig.agents.filter((x) => String(x).toLowerCase() !== 'no asignado');

    phones.forEach((phone, i) => {
      const stage = plannedStages[(i + 2) % Math.max(1, plannedStages.length)] || findFunnelStageByIntent('new');
      const intent = stageIntentKey(stage);
      const status = pickFrom(statuses, findStatusByIntent('new'));
      const agent = pickFrom(agents, 'No asignado');
      const number = String(i + 1).padStart(2, '0');
      const tags = ['demo', 'cliente-' + number, i % 2 ? 'cotizacion' : 'seguimiento'];
      if(intent === 'followup') tags.push('seguimiento');
      if(intent === 'lost') tags.push('perdido');
      if(intent === 'won') tags.push('cerrado');
      if(normalizeMatcherText(stage).includes('produccion')) tags.push('produccion');
      const notes = [
        'Cliente de prueba para validacion integral del CRM.',
        'Solicita muestra de impresion en formato A' + String((i % 4) + 3) + '.',
        'Prioridad de atencion: ' + (i % 3 === 0 ? 'alta' : 'normal') + '.'
      ];
      const scheduledMessages = [
        '[Programado] Enviar propuesta comercial el ' + new Date(Date.now() + ((i + 1) * 3600000)).toLocaleString(),
        '[Evento] Llamada de seguimiento en 24h'
      ];
      const pinnedMessages = [
        'Mensaje clave demo #' + number,
        'Confirmar tiraje y acabados del pedido'
      ];

      setMeta(phone, {
        isDemoClient: true,
        isDemoEverything: true,
        funnel: stage,
        status,
        agent,
        email: 'cliente.demo' + number + '@example.com',
        company: 'Empresa Demo ' + number,
        tags,
        labels: tags,
        notes,
        scheduledMessages,
        pinnedMessages,
        archived: false,
        read: !(intent === 'followup' || intent === 'quote') || i % 3 === 0,
        lastMessagePreview: demoPreviewForStage(stage, i)
      });

      if(i < 20){
        addLeadHistory(phone, 'Carga demo', 'Se genero dataset de prueba completo para este lead.');
      }
    });

    localImportedLeads = localImportedLeads.map((lead) => {
      const key = phoneKey(lead.phone);
      if(!phones.includes(key)) return lead;
      return Object.assign({}, lead, { __demo: true, __demoEverything: true });
    });
    saveLocalImportedLeads();

    try{ localStorage.setItem(DEMO_MULTIMEDIA_ITEMS_KEY, JSON.stringify(createDemoMultimediaItems(phones))); }catch(_e){}
  }

  function removeDemoClientsBatch(){
    const demoPhones = new Set(loadDemoClientPhones());
    Object.keys(crmMeta || {}).forEach((key) => {
      const normalized = phoneKey(key);
      const meta = crmMeta[key] || {};
      if(demoPhones.has(normalized) || meta.isDemoClient){
        delete crmMeta[key];
      }
    });
    saveCrmMeta();

    localImportedLeads = localImportedLeads.filter((lead) => {
      const normalized = phoneKey(lead.phone);
      return !demoPhones.has(normalized) && !lead.__demo;
    });
    saveLocalImportedLeads();
    saveDemoClientPhones([]);

    if(selected){
      const selectedPhone = phoneKey(selected.phone || selected.id);
      if(demoPhones.has(selectedPhone)){
        selected = null;
        updateHeader();
        syncToolbarFromSelection();
        updateComposerState();
      }
    }
  }

  async function applyDemoClientsToggle(){
    const enable = !!(demoClientsEnabledEl && demoClientsEnabledEl.checked);
    if(enable){
      createDemoClientsBatch();
      setDemoClientsEnabled(true);
      showDemoClientsMessage('Se activaron 50 clientes demo.');
    } else {
      if(demoEverythingEnabledEl) demoEverythingEnabledEl.checked = false;
      setDemoEverythingEnabled(false);
      try{ localStorage.removeItem(DEMO_MULTIMEDIA_ITEMS_KEY); }catch(_e){}
      showDemoEverythingMessage('Datos de prueba de todo desactivados.');
      removeDemoClientsBatch();
      setDemoClientsEnabled(false);
      showDemoClientsMessage('Clientes demo desactivados.');
    }

    await loadChats();
    renderDashboard();
    renderFunnelsStatusList();
    renderFunnelsBoard();
    await buildDirectoryRows();
  }

  function removeDemoEverythingBatch(){
    try{ localStorage.removeItem(DEMO_MULTIMEDIA_ITEMS_KEY); }catch(_e){}
    removeDemoClientsBatch();
  }

  async function applyDemoEverythingToggle(){
    const enable = !!(demoEverythingEnabledEl && demoEverythingEnabledEl.checked);
    if(enable){
      createDemoClientsBatch();
      createDemoEverythingBatch();
      setDemoClientsEnabled(true);
      setDemoEverythingEnabled(true);
      if(demoClientsEnabledEl) demoClientsEnabledEl.checked = true;
      showDemoClientsMessage('Clientes demo activos como base del paquete completo.');
      showDemoEverythingMessage('Se activaron datos de prueba de todo (CRM, directorio, historial y multimedia demo).');
    } else {
      removeDemoEverythingBatch();
      setDemoEverythingEnabled(false);
      setDemoClientsEnabled(false);
      if(demoClientsEnabledEl) demoClientsEnabledEl.checked = false;
      showDemoClientsMessage('Clientes demo desactivados.');
      showDemoEverythingMessage('Datos de prueba de todo desactivados.');
    }

    await loadChats();
    renderDashboard();
    renderAnalytics();
    renderFunnelsStatusList();
    renderFunnelsBoard();
    await buildDirectoryRows();
    if(multimediaState.open){
      await collectMultimediaIndex(true);
    }
  }

  function loadLocalImportedLeads(){
    try{
      const raw = JSON.parse(localStorage.getItem(LOCAL_IMPORTED_LEADS_KEY) || '[]');
      return Array.isArray(raw) ? raw : [];
    }catch(_e){
      return [];
    }
  }

  function saveLocalImportedLeads(){
    try{ localStorage.setItem(LOCAL_IMPORTED_LEADS_KEY, JSON.stringify(localImportedLeads)); }catch(_e){}
  }

  function formatDateTime(ts){
    const n = normalizeTimestamp(ts);
    if(!n) return '-';
    try{ return new Date(n).toLocaleString(); }catch(_e){ return '-'; }
  }

  function formatHistoryDateTime(ts){
    const n = normalizeTimestamp(ts);
    if(!n) return '-';
    try{
      const datePart = new Intl.DateTimeFormat('es-MX', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(new Date(n));
      const timePart = new Intl.DateTimeFormat('es-MX', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }).format(new Date(n)).toLowerCase();
      return datePart + ' a las ' + timePart;
    }catch(_e){
      return formatDateTime(n);
    }
  }

  function formatDateOnly(ts){
    const n = normalizeTimestamp(ts);
    if(!n) return '';
    const d = new Date(n);
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
  }

  function formatDateTimeLocalInput(ts){
    const n = normalizeTimestamp(ts);
    if(!n) return '';
    const d = new Date(n);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const hh = String(d.getHours()).padStart(2, '0');
    const min = String(d.getMinutes()).padStart(2, '0');
    return yyyy + '-' + mm + '-' + dd + 'T' + hh + ':' + min;
  }

  function parseDateTimeLocalInput(value){
    const raw = String(value || '').trim();
    if(!raw) return 0;
    const ts = new Date(raw).getTime();
    return Number.isFinite(ts) ? ts : 0;
  }

  function parseDateAndTimeInputs(dateValue, timeValue){
    const datePart = String(dateValue || '').trim();
    const timePart = String(timeValue || '').trim();
    if(!datePart || !timePart) return 0;
    return parseDateTimeLocalInput(datePart + 'T' + timePart);
  }

  function splitDateTimeForInputs(ts){
    const n = normalizeTimestamp(ts);
    if(!n) return { date: '', time: '' };
    const d = new Date(n);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const hh = String(d.getHours()).padStart(2, '0');
    const min = String(d.getMinutes()).padStart(2, '0');
    return {
      date: yyyy + '-' + mm + '-' + dd,
      time: hh + ':' + min
    };
  }

  function nextRoundedHourTimestamp(){
    const d = new Date(Date.now() + (60 * 60 * 1000));
    const mins = d.getMinutes();
    const rounded = mins <= 5 ? 5 : (mins <= 30 ? 30 : 0);
    if(rounded === 0){
      d.setHours(d.getHours() + 1);
    }
    d.setMinutes(rounded, 0, 0);
    return d.getTime();
  }

  function normalizeAutomationEvent(raw, idx){
    if(!raw || typeof raw !== 'object') return null;
    const phone = phoneKey(raw.phone || raw.id || '');
    const contactName = String(raw.contactName || raw.customer || '').trim();
    if(!phone && !contactName) return null;
    const dueAt = normalizeTimestamp(raw.dueAt || raw.at || raw.dateTime || 0);
    if(!dueAt) return null;
    const title = String(raw.title || raw.text || '').trim();
    if(!title) return null;
    const statusRaw = String(raw.status || 'pending').trim().toLowerCase();
    const status = (statusRaw === 'done' || statusRaw === 'canceled') ? statusRaw : 'pending';
    const reminder = Math.max(0, Math.min(43200, Number(raw.remindMinutes || raw.reminderMinutes || 60) || 0));
    const notified = Array.isArray(raw.notifiedOffsets)
      ? raw.notifiedOffsets.map((v) => Number(v)).filter((v) => Number.isFinite(v) && v >= 0)
      : [];
    const sourceRaw = String(raw.sourceType || '').trim().toLowerCase();
    const sourceType = sourceRaw === 'manual' || sourceRaw === 'linked'
      ? sourceRaw
      : (phone ? 'linked' : 'manual');
    return {
      id: String(raw.id || ('evt_' + String(idx || 0) + '_' + String(dueAt))).trim(),
      phone: phone || '',
      contactName: contactName || (phone ? formatDisplayPhone(phone) : ''),
      sourceType,
      title,
      notes: String(raw.notes || '').trim(),
      dueAt,
      remindMinutes: reminder,
      notifiedOffsets: Array.from(new Set(notified)),
      status,
      createdAt: normalizeTimestamp(raw.createdAt || Date.now()) || Date.now(),
      updatedAt: normalizeTimestamp(raw.updatedAt || Date.now()) || Date.now()
    };
  }

  function loadAutomationEvents(){
    try{
      const parsed = JSON.parse(localStorage.getItem(EVENTS_CALENDAR_KEY) || '[]');
      const list = Array.isArray(parsed) ? parsed : [];
      return list.map((item, idx) => normalizeAutomationEvent(item, idx)).filter(Boolean);
    }catch(_e){
      return [];
    }
  }

  function saveAutomationEvents(){
    try{ localStorage.setItem(EVENTS_CALENDAR_KEY, JSON.stringify(Array.isArray(automationEvents) ? automationEvents : [])); }catch(_e){}
  }

  async function loadAutomationEventsFromServer(force){
    if(automationEventsSyncInFlight) return;
    if(automationEventsLoadedFromServer && !force) return;
    automationEventsSyncInFlight = true;
    try{
      const resp = await fetch('/wa/events?limit=800');
      if(!resp.ok) throw new Error('wa/events ' + String(resp.status));
      const data = await resp.json().catch(() => null);
      const rows = data && Array.isArray(data.events) ? data.events : [];
      automationEvents = rows.map((item, idx) => normalizeAutomationEvent(item, idx)).filter(Boolean);
      automationEventsLoadedFromServer = true;
      saveAutomationEvents();
      renderAutomationPanel();
    }catch(e){
      console.warn('loadAutomationEventsFromServer', e);
    }
    automationEventsSyncInFlight = false;
  }

  async function persistAutomationEventToServer(eventItem){
    const payload = normalizeAutomationEvent(eventItem || {}, Date.now());
    if(!payload) return;
    try{
      const resp = await fetch('/wa/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if(!resp.ok) throw new Error('wa/events POST ' + String(resp.status));
      const data = await resp.json().catch(() => null);
      const fromServer = normalizeAutomationEvent(data && data.event || payload, Date.now());
      if(!fromServer) return;
      const idx = automationEvents.findIndex((it) => String(it && it.id || '') === String(fromServer.id || ''));
      if(idx >= 0){
        automationEvents[idx] = fromServer;
        saveAutomationEvents();
      }
    }catch(e){
      console.warn('persistAutomationEventToServer', e);
    }
  }

  function escHtml(text){
    return String(text || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function normDigits(value){
    return String(value || '').replace(/\D+/g, '');
  }

  function displayPhone(value){
    const digits = normDigits(value);
    if(!digits) return '';
    const base = digits.length >= 10 ? digits.slice(-10) : digits;
    if(base.length === 10){
      return '+52 ' + base.slice(0, 3) + ' ' + base.slice(3, 6) + ' ' + base.slice(6);
    }
    return '+' + digits;
  }

  function tsToLabel(ts){
    const n = Number(ts || 0);
    if(!n) return '';
    const ms = n < 1000000000000 ? (n * 1000) : n;
    try{
      return new Date(ms).toLocaleString('es-MX');
    }catch(_e){
      return '';
    }
  }

  function currentSelectedPhone(){
    return normDigits(selected && (selected.phone || selected.id || ''));
  }

  function setComposerEnabled(enabled){
    const state = !!enabled;
    if(msgInput) msgInput.disabled = !state;
    if(sendBtn) sendBtn.disabled = !state;
    if(!state && msgInput) msgInput.value = '';
  }

  function setChatHeaderFromSelected(){
    const phone = currentSelectedPhone();
    const name = String(selected && (selected.name || selected.contactName) || '').trim() || displayPhone(phone) || 'Sin seleccionar';
    if(nameEl) nameEl.textContent = name;
    if(phoneEl) phoneEl.textContent = phone ? displayPhone(phone) : 'Selecciona una conversacion';
    if(avatarEl){
      const initial = String(name || '?').trim().charAt(0).toUpperCase() || '?';
      avatarEl.textContent = initial;
    }
    setComposerEnabled(!!phone);
  }

  function resolveMessageMediaUrl(msg){
    const direct = String(msg && msg.mediaUrl || '').trim();
    if(direct) return direct;
    const mediaId = String(msg && msg.mediaId || '').trim();
    if(!mediaId) return '';
    return '/wa/media/' + encodeURIComponent(mediaId);
  }

  function renderConversationMinimal(messages){
    if(!convEl) return;
    const list = Array.isArray(messages) ? messages : [];
    if(!list.length){
      convEl.innerHTML = '<div style="padding:12px;color:#64748b;font-size:.86rem;">Sin mensajes en esta conversacion.</div>';
      return;
    }

    const html = list.map((msg) => {
      const direction = String(msg && msg.direction || '').trim().toLowerCase() === 'out' ? 'out' : 'in';
      const text = String(msg && (msg.text || msg.caption) || '').trim();
      const mediaUrl = resolveMessageMediaUrl(msg);
      const mimeType = String(msg && msg.mimeType || '').trim().toLowerCase();
      const fileName = String(msg && msg.fileName || '').trim();
      const when = tsToLabel(msg && (msg.timestamp || msg.createdAt || msg.sentAt));
      const wrapStyle = direction === 'out'
        ? 'display:flex;justify-content:flex-end;margin:6px 0;'
        : 'display:flex;justify-content:flex-start;margin:6px 0;';
      const bubbleStyle = direction === 'out'
        ? 'max-width:78%;padding:8px 10px;border-radius:12px;background:#dcfce7;color:#14532d;border:1px solid #86efac;'
        : 'max-width:78%;padding:8px 10px;border-radius:12px;background:#fff;color:#0f172a;border:1px solid #e2e8f0;';

      const isImage = mediaUrl && (mimeType.startsWith('image/') || /\.(png|jpe?g|gif|webp|bmp|svg)(\?|$)/i.test(mediaUrl));
      const isVideo = mediaUrl && (mimeType.startsWith('video/') || /\.(mp4|webm|mov|m4v|avi)(\?|$)/i.test(mediaUrl));
      const isAudio = mediaUrl && (mimeType.startsWith('audio/') || /\.(mp3|ogg|wav|m4a)(\?|$)/i.test(mediaUrl));
      let mediaBlock = '';
      if(isImage){
        mediaBlock = '<div style="margin-bottom:6px;"><a href="' + escHtml(mediaUrl) + '" target="_blank" rel="noopener noreferrer"><img src="' + escHtml(mediaUrl) + '" alt="Imagen" style="max-width:220px;max-height:220px;display:block;border-radius:8px;border:1px solid #dbe4ea;"></a></div>';
      }else if(isVideo){
        mediaBlock = '<div style="margin-bottom:6px;"><video controls preload="metadata" style="max-width:240px;max-height:240px;border-radius:8px;border:1px solid #dbe4ea;background:#000;"><source src="' + escHtml(mediaUrl) + '" type="' + escHtml(mimeType || 'video/mp4') + '">Tu navegador no puede reproducir este video.</video></div>';
      }else if(isAudio){
        mediaBlock = '<div style="margin-bottom:6px;"><audio controls preload="metadata" style="width:240px;"><source src="' + escHtml(mediaUrl) + '" type="' + escHtml(mimeType || 'audio/mpeg') + '">Tu navegador no puede reproducir este audio.</audio></div>';
      }else if(mediaUrl){
        const label = fileName || 'Abrir archivo';
        mediaBlock = '<div style="margin-bottom:6px;padding:8px;border:1px solid #dbe4ea;border-radius:8px;background:#f8fafc;"><strong style="display:block;font-size:.78rem;color:#334155;">Documento</strong><a href="' + escHtml(mediaUrl) + '" target="_blank" rel="noopener noreferrer">' + escHtml(label) + '</a></div>';
      }
      const textBlock = text ? '<div style="white-space:pre-wrap;word-break:break-word;">' + escHtml(text) + '</div>' : '';
      const tsBlock = when ? '<div style="margin-top:4px;font-size:.7rem;opacity:.72;">' + escHtml(when) + '</div>' : '';
      return '<div style="' + wrapStyle + '"><div style="' + bubbleStyle + '">' + mediaBlock + textBlock + tsBlock + '</div></div>';
    }).join('');

    convEl.innerHTML = html;
    convEl.scrollTop = convEl.scrollHeight;
  }

  function baseConversationView(list){
    return (Array.isArray(list) ? list : []).map((item) => {
      const phone = normDigits(item && (item.phone || item.id || ''));
      if(!phone) return null;
      return {
        id: String(item && item.id || phone),
        phone,
        name: String(item && (item.name || item.contactName || '')),
        lastText: String(item && item.lastText || ''),
        lastTimestamp: Number(item && item.lastTimestamp || item && item.updatedAt || 0)
      };
    }).filter(Boolean);
  }

  function visibleConversations(){
    const needle = String(searchInput && searchInput.value || '').trim().toLowerCase();
    if(!needle) return chats.slice();
    return chats.filter((c) => {
      const name = String(c && c.name || '').toLowerCase();
      const phone = String(c && c.phone || '');
      const lastText = String(c && c.lastText || '').toLowerCase();
      return name.includes(needle) || phone.includes(needle) || lastText.includes(needle);
    });
  }

  function renderContactsMinimal(){
    if(!contactsList) return;
    const rows = visibleConversations();
    if(!rows.length){
      contactsList.innerHTML = '<div style="padding:10px;color:#64748b;font-size:.84rem;">No hay conversaciones.</div>';
      return;
    }

    const selectedPhone = currentSelectedPhone();
    const html = rows.map((row) => {
      const phone = normDigits(row.phone);
      const title = String(row.name || '').trim() || displayPhone(phone);
      const subtitle = String(row.lastText || '').trim() || 'Sin mensajes';
      const active = selectedPhone && selectedPhone === phone;
      const style = active
        ? 'padding:8px;border:1px solid #60a5fa;background:#eff6ff;border-radius:10px;cursor:pointer;'
        : 'padding:8px;border:1px solid #e2e8f0;background:#fff;border-radius:10px;cursor:pointer;';
      return '<button type="button" data-phone="' + escHtml(phone) + '" style="width:100%;text-align:left;' + style + '"><div style="font-size:.84rem;font-weight:700;color:#0f172a;">' + escHtml(title) + '</div><div style="font-size:.76rem;color:#64748b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + escHtml(subtitle) + '</div></button>';
    }).join('');
    contactsList.innerHTML = '<div style="display:flex;flex-direction:column;gap:6px;">' + html + '</div>';
  }

  function stageForConversation(row){
    const phone = normDigits(row && row.phone || '');
    const meta = getMeta(phone);
    const rawStage = String(meta && (meta.funnel || meta.stage) || row && row.funnel || '').trim();
    return normalizeLeadFunnelLabel(rawStage);
  }

  function renderFunnelsBoard(){
    if(!funnelsBoardEl) return;
    renderFunnelsBoardHeader();

    const stages = Array.isArray(crmConfig && crmConfig.funnel) && crmConfig.funnel.length
      ? crmConfig.funnel.slice()
      : DEFAULT_FUNNEL_ORDER.slice();

    if(!stages.length){
      funnelsBoardEl.innerHTML = '<div style="padding:10px;color:#64748b;font-size:.82rem;">No hay etapas configuradas.</div>';
      return;
    }

    const buckets = new Map();
    stages.forEach((stage) => buckets.set(stage, []));

    (Array.isArray(chats) ? chats : []).forEach((row) => {
      const stage = stageForConversation(row);
      const target = buckets.has(stage) ? stage : stages[0];
      buckets.get(target).push(row);
    });

    const html = stages.map((stage) => {
      const rows = (buckets.get(stage) || []).slice().sort((a,b) => Number(b.lastTimestamp || 0) - Number(a.lastTimestamp || 0));
      const cards = rows.length
        ? rows.map((row) => {
            const phone = normDigits(row && row.phone || '');
            const name = String(row && row.name || '').trim() || displayPhone(phone);
            const subtitle = String(row && row.lastText || '').trim() || 'Sin actividad';
            const when = tsToLabel(row && row.lastTimestamp || 0);
            return '<button type="button" class="funnel-card" data-funnel-phone="' + escHtml(phone) + '">'
              + '<div class="funnel-card-head">'
              + '<div class="funnel-card-main">'
              + '<div class="funnel-card-title">' + escHtml(name) + '</div>'
              + '<div class="funnel-card-sub">' + escHtml(displayPhone(phone)) + '</div>'
              + '</div>'
              + '<div class="funnel-card-time">' + escHtml(when || '') + '</div>'
              + '</div>'
              + '<div class="funnel-card-reason">' + escHtml(subtitle) + '</div>'
              + '</button>';
          }).join('')
        : '<div class="funnel-empty">Sin leads en esta etapa.</div>';

      return '<section class="funnel-col">'
        + '<div class="funnel-col-head">'
        + '<div class="funnel-col-title">' + escHtml(stage) + '</div>'
        + '<div class="funnel-col-head-right"><span class="funnel-col-count">' + String(rows.length) + '</span></div>'
        + '</div>'
        + '<div class="funnel-col-body">' + cards + '</div>'
        + '</section>';
    }).join('');

    funnelsBoardEl.innerHTML = html;

    Array.from(funnelsBoardEl.querySelectorAll('[data-funnel-phone]')).forEach((btn) => {
      btn.addEventListener('click', async () => {
        const phone = btn.getAttribute('data-funnel-phone');
        if(!phone) return;
        setActiveModule('chats');
        await openConversationByPhone(phone);
      });
    });
  }

  async function fetchConversationMessages(phone){
    const digits = normDigits(phone);
    if(!digits) return [];
    try{
      const resp = await fetch('/wa/conversation?phone=' + encodeURIComponent(digits) + '&limit=250');
      if(!resp.ok) return [];
      const data = await resp.json().catch(() => null);
      return data && Array.isArray(data.messages) ? data.messages : [];
    }catch(_e){
      return [];
    }
  }

  async function openConversationByPhone(phone){
    const digits = normDigits(phone);
    if(!digits) return;
    const item = chats.find((c) => normDigits(c && c.phone) === digits) || { phone: digits, id: digits, name: '' };
    selected = Object.assign({}, item);
    setChatHeaderFromSelected();
    renderContactsMinimal();
    const messages = await fetchConversationMessages(digits);
    lastConversationMessages = Array.isArray(messages) ? messages : [];
    renderConversationMinimal(lastConversationMessages);
  }

  async function loadConversationsMinimal(keepCurrent){
    try{
      const resp = await fetch('/wa/conversations?limit=200');
      if(!resp.ok) throw new Error('wa/conversations ' + String(resp.status));
      const data = await resp.json().catch(() => null);
      const list = data && Array.isArray(data.conversations) ? data.conversations : [];
      chats = baseConversationView(list).sort((a,b) => Number(b.lastTimestamp || 0) - Number(a.lastTimestamp || 0));
      renderContactsMinimal();
      renderFunnelsBoard();

      const keepPhone = keepCurrent ? currentSelectedPhone() : '';
      if(keepPhone){
        const stillThere = chats.find((c) => normDigits(c.phone) === keepPhone);
        if(stillThere){
          await openConversationByPhone(keepPhone);
          return;
        }
      }

      if(!selected && chats.length){
        await openConversationByPhone(chats[0].phone);
      }
    }catch(e){
      console.warn('loadConversationsMinimal', e);
    }
  }

  function resolveSlashQuickReplyPayload(text){
    const raw = String(text || '').trim();
    if(!/^\/[a-z0-9_-]+$/i.test(raw)) return null;
    const code = raw.slice(1).toLowerCase();
    const replies = Array.isArray(quickReplies) ? quickReplies : [];
    const found = replies.find((item) => String(item && item.code || '').toLowerCase() === code);
    if(!found) return null;
    return {
      message: String(found.text || '').trim(),
      imageUrl: String(found.imageUrl || '').trim()
    };
  }

  async function sendSelectedConversationMessage(){
    const phone = currentSelectedPhone();
    if(!phone || !msgInput || !sendBtn) return;
    const raw = String(msgInput.value || '').trim();
    if(!raw) return;

    const slash = resolveSlashQuickReplyPayload(raw);
    const payload = slash
      ? { to: phone, message: String(slash.message || ''), imageUrl: String(slash.imageUrl || '') }
      : { to: phone, message: raw };

    sendBtn.disabled = true;
    try{
      const resp = await fetch('/send-whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await resp.json().catch(() => null);
      if(!resp.ok){
        throw new Error(String(data && data.error || ('HTTP ' + resp.status)));
      }
      msgInput.value = '';
      await openConversationByPhone(phone);
      await loadConversationsMinimal(true);
    }catch(e){
      alert('No se pudo enviar el mensaje: ' + String(e && e.message || e));
    }
    sendBtn.disabled = false;
  }

  function saveMassBroadcastJobsSafe(){
    try{ localStorage.setItem(MASS_BROADCAST_JOBS_KEY, JSON.stringify(Array.isArray(massBroadcastJobs) ? massBroadcastJobs : [])); }catch(_e){}
  }

  function findQuickReplyByCode(code){
    const needle = normalizeQuickReplyCode(code || '');
    if(!needle) return null;
    const list = Array.isArray(quickReplies) ? quickReplies : [];
    return list.find((item) => normalizeQuickReplyCode(item && item.code || '') === needle) || null;
  }

  function normalizeMassReplyCodeFromInput(raw){
    const txt = String(raw || '').trim();
    if(!txt) return '';
    const slash = txt.match(/^\/([a-z0-9_-]+)$/i);
    if(slash) return normalizeQuickReplyCode(slash[1]);
    const byCode = findQuickReplyByCode(txt);
    if(byCode) return normalizeQuickReplyCode(byCode.code);
    const list = Array.isArray(quickReplies) ? quickReplies : [];
    const byText = list.find((item) => String(item && item.text || '').trim().toLowerCase() === txt.toLowerCase());
    if(byText) return normalizeQuickReplyCode(byText.code);
    return normalizeQuickReplyCode(txt);
  }

  function formatMassReplyCodeLabel(code){
    const safe = normalizeQuickReplyCode(code || '');
    return safe ? ('/' + safe) : '';
  }

  function renderMassTags(containerEl, list, onRemove){
    if(!containerEl) return;
    const tags = Array.isArray(list) ? list.slice() : [];
    if(!tags.length){
      containerEl.innerHTML = '<span class="wa-mass-help">Sin elementos.</span>';
      return;
    }
    containerEl.innerHTML = '';
    const frag = document.createDocumentFragment();
    tags.forEach((item, idx) => {
      const tag = document.createElement('span');
      tag.className = 'wa-mass-tag';
      tag.textContent = String(item || '');
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'wa-mass-tag-remove';
      btn.setAttribute('aria-label', 'Quitar');
      btn.textContent = 'x';
      btn.addEventListener('click', () => onRemove(idx));
      tag.appendChild(btn);
      frag.appendChild(tag);
    });
    containerEl.appendChild(frag);
  }

  function updateMassDelayVisibility(){
    const unit = String(massDelayUnitEl && massDelayUnitEl.value || 'hour').trim().toLowerCase();
    if(massDelayHoursWrapEl) massDelayHoursWrapEl.style.display = unit === 'day' ? 'none' : '';
    if(massDelayDaysWrapEl) massDelayDaysWrapEl.style.display = unit === 'day' ? '' : 'none';
  }

  function appendMassStatus(text){
    if(!massStatusEl) return;
    const stamp = new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
    const line = '[' + stamp + '] ' + String(text || '');
    const prev = String(massStatusEl.textContent || '').trim();
    if(!prev || prev === 'Sin ejecuciones.'){
      massStatusEl.textContent = line;
      return;
    }
    const merged = (line + '\n' + prev).split('\n').slice(0, 16).join('\n');
    massStatusEl.textContent = merged;
  }

  function getSelectedMassReply(){
    const code = normalizeQuickReplyCode(massSendReplySelectEl && massSendReplySelectEl.value || '');
    return findQuickReplyByCode(code);
  }

  function openMassChatPreview(title, contentHtml){
    if(!massChatPreviewBackdropEl || !massChatPreviewBodyEl) return;
    if(massChatPreviewTitleEl) massChatPreviewTitleEl.textContent = String(title || 'Vista previa');
    massChatPreviewBodyEl.innerHTML = contentHtml || '<div class="wa-mass-preview-empty">Sin contenido.</div>';
    massChatPreviewBackdropEl.classList.add('open');
    massChatPreviewBackdropEl.setAttribute('aria-hidden', 'false');
  }

  function closeMassChatPreview(){
    if(!massChatPreviewBackdropEl) return;
    massChatPreviewBackdropEl.classList.remove('open');
    massChatPreviewBackdropEl.setAttribute('aria-hidden', 'true');
  }

  function renderMassPreview(){
    const triggerCodes = Array.isArray(massTriggerCodesDraft) ? massTriggerCodesDraft.slice() : [];
    const selectedReply = getSelectedMassReply();
    const templateName = String(massTemplateNameInputEl && massTemplateNameInputEl.value || '').trim();
    const templateText = String(massTemplateTextInputEl && massTemplateTextInputEl.value || '').trim();
    const templateImage = String(massTemplateImageInputEl && massTemplateImageInputEl.value || '').trim();
    const delayUnit = String(massDelayUnitEl && massDelayUnitEl.value || 'hour').toLowerCase();
    const delayValue = delayUnit === 'day'
      ? Math.max(1, Number(massDelayDaysEl && massDelayDaysEl.value || 1) || 1)
      : Math.max(1, Math.min(23, Number(massDelayHoursEl && massDelayHoursEl.value || 1) || 1));

    if(massPreviewTriggerEl){
      if(!triggerCodes.length){
        massPreviewTriggerEl.innerHTML = '<div class="wa-mass-preview-empty">Sin disparadores (aplica a cualquier ultima respuesta).</div>';
      } else {
        massPreviewTriggerEl.innerHTML = triggerCodes.map((code) => {
          return '<div class="wa-mass-preview-item"><div class="wa-mass-preview-item-text">' + escHtml(formatMassReplyCodeLabel(code)) + '</div></div>';
        }).join('');
      }
    }

    if(massPreviewSendEl){
      massPreviewCatalog.clear();
      if(!selectedReply){
        massPreviewSendEl.innerHTML = '<div class="wa-mass-preview-empty">Selecciona una respuesta rapida para enviar.</div>';
      } else {
        const key = 'send:' + normalizeQuickReplyCode(selectedReply.code);
        massPreviewCatalog.set(key, {
          title: 'Respuesta a enviar',
          html: '<div class="wa-mass-chat-bubble">'
            + '<div class="wa-mass-chat-bubble-label">Mensaje normal</div>'
            + (selectedReply.imageUrl ? '<img class="wa-mass-chat-bubble-image" src="' + escHtml(selectedReply.imageUrl) + '" alt="Preview">' : '')
            + '<div class="wa-mass-chat-bubble-text">' + escHtml(String(selectedReply.text || '')) + '</div>'
            + '</div>'
            + '<div class="wa-mass-chat-bubble-template">'
            + '<div class="wa-mass-chat-bubble-label">Plantilla (+24h)</div>'
            + '<div class="wa-mass-chat-bubble-text">Nombre: ' + escHtml(templateName || '(sin definir)') + '</div>'
            + (templateImage ? '<img class="wa-mass-chat-bubble-image" src="' + escHtml(templateImage) + '" alt="Template image">' : '')
            + '<div class="wa-mass-chat-bubble-text">' + escHtml(templateText || String(selectedReply.text || '')) + '</div>'
            + '</div>'
        });
        massPreviewSendEl.innerHTML = '<div class="wa-mass-preview-item">'
          + '<div class="wa-mass-preview-item-text">' + escHtml(formatMassReplyCodeLabel(selectedReply.code) + ' - ' + String(selectedReply.text || '')) + '</div>'
          + '<button class="wa-mass-preview-item-btn" type="button" data-mass-preview-key="' + escHtml(key) + '">VER</button>'
          + '</div>';
      }
    }

    if(massPreviewConditionsEl){
      const filters = Array.isArray(massResponseFiltersDraft) && massResponseFiltersDraft.length
        ? massResponseFiltersDraft.join(', ')
        : 'todos';
      const excludesStatus = Array.isArray(massExcludeStatusesDraft) && massExcludeStatusesDraft.length
        ? massExcludeStatusesDraft.join(', ')
        : 'ninguno';
      const excludesReplies = Array.isArray(massExcludeReplyCodesDraft) && massExcludeReplyCodesDraft.length
        ? massExcludeReplyCodesDraft.map((code) => formatMassReplyCodeLabel(code)).join(', ')
        : 'ninguna';
      massPreviewConditionsEl.textContent = 'Espera: '
        + String(delayValue)
        + (delayUnit === 'day' ? ' dia(s)' : ' hora(s)')
        + ' | Estado cliente: ' + filters
        + ' | Excluir estatus: ' + excludesStatus
        + ' | Excluir respuestas: ' + excludesReplies;
    }
  }

  function renderMassInputs(){
    const list = Array.isArray(quickReplies) ? quickReplies.slice() : [];
    if(massSendReplySelectEl){
      const current = normalizeQuickReplyCode(massSendReplySelectEl.value || '');
      massSendReplySelectEl.innerHTML = '<option value="">Selecciona respuesta...</option>';
      list.forEach((reply) => {
        const op = document.createElement('option');
        op.value = normalizeQuickReplyCode(reply && reply.code || '');
        op.textContent = formatMassReplyCodeLabel(reply && reply.code) + ' - ' + String(reply && reply.text || '');
        massSendReplySelectEl.appendChild(op);
      });
      if(current && list.some((reply) => normalizeQuickReplyCode(reply && reply.code || '') === current)){
        massSendReplySelectEl.value = current;
      }
    }

    if(massTriggerDatalistEl){
      massTriggerDatalistEl.innerHTML = '';
      list.forEach((reply) => {
        const op = document.createElement('option');
        op.value = formatMassReplyCodeLabel(reply && reply.code);
        massTriggerDatalistEl.appendChild(op);
      });
    }

    if(massRepliesDatalistEl){
      massRepliesDatalistEl.innerHTML = '';
      list.forEach((reply) => {
        const op = document.createElement('option');
        op.value = formatMassReplyCodeLabel(reply && reply.code);
        massRepliesDatalistEl.appendChild(op);
      });
    }

    if(massStatusesDatalistEl){
      massStatusesDatalistEl.innerHTML = '';
      const statuses = Array.isArray(crmConfig && crmConfig.statuses) ? crmConfig.statuses : [];
      statuses.forEach((status) => {
        const op = document.createElement('option');
        op.value = String(status || '');
        massStatusesDatalistEl.appendChild(op);
      });
    }

    renderMassTags(massTriggerTagsEl, (massTriggerCodesDraft || []).map((code) => formatMassReplyCodeLabel(code)), (idx) => {
      massTriggerCodesDraft.splice(idx, 1);
      renderMassInputs();
      renderMassPreview();
    });
    renderMassTags(massExcludeStatusesTagsEl, massExcludeStatusesDraft || [], (idx) => {
      massExcludeStatusesDraft.splice(idx, 1);
      renderMassInputs();
      renderMassPreview();
    });
    renderMassTags(massExcludeRepliesTagsEl, (massExcludeReplyCodesDraft || []).map((code) => formatMassReplyCodeLabel(code)), (idx) => {
      massExcludeReplyCodesDraft.splice(idx, 1);
      renderMassInputs();
      renderMassPreview();
    });
    renderMassTags(massResponseStateTagsEl, massResponseFiltersDraft || [], (idx) => {
      massResponseFiltersDraft.splice(idx, 1);
      renderMassInputs();
      renderMassPreview();
    });

    updateMassDelayVisibility();
    renderMassPreview();
  }

  function deriveLastQuickReplyCodeFromConversation(row, meta){
    const fromMeta = normalizeQuickReplyCode(meta && meta.lastQuickReplyCode || '');
    if(fromMeta) return fromMeta;

    const text = String(row && row.lastText || '').trim();
    const slash = text.match(/^\s*\/([a-z0-9_-]+)\s*$/i);
    if(slash) return normalizeQuickReplyCode(slash[1]);

    const list = Array.isArray(quickReplies) ? quickReplies : [];
    const found = list.find((reply) => String(reply && reply.text || '').trim().toLowerCase() === text.toLowerCase());
    return normalizeQuickReplyCode(found && found.code || '');
  }

  function shouldIncludeRecipientByResponseState(meta){
    const wanted = Array.isArray(massResponseFiltersDraft) ? massResponseFiltersDraft.slice() : [];
    if(!wanted.length || wanted.includes('all')) return true;
    const pending = Number(meta && meta.pendingClientCount || 0) > 0 || meta && meta.read === false;
    const replied = !pending;
    if(wanted.includes('replied') && replied) return true;
    if(wanted.includes('no-reply') && !replied) return true;
    return false;
  }

  function collectMassRecipients(){
    const triggerSet = new Set((massTriggerCodesDraft || []).map((x) => normalizeQuickReplyCode(x)).filter(Boolean));
    const excludeReplySet = new Set((massExcludeReplyCodesDraft || []).map((x) => normalizeQuickReplyCode(x)).filter(Boolean));
    const excludeStatusSet = new Set((massExcludeStatusesDraft || []).map((x) => normalizeMatcherText(x)).filter(Boolean));

    const out = [];
    const base = Array.isArray(chats) ? chats : [];
    base.forEach((row) => {
      const phone = normDigits(row && row.phone || '');
      if(!phone) return;
      const meta = getMeta(phone) || {};
      const status = normalizeMatcherText(meta && meta.status || '');
      if(status && excludeStatusSet.has(status)) return;
      if(!shouldIncludeRecipientByResponseState(meta)) return;

      const lastCode = deriveLastQuickReplyCodeFromConversation(row, meta);
      if(excludeReplySet.has(lastCode)) return;
      if(triggerSet.size > 0 && !triggerSet.has(lastCode)) return;

      out.push({ phone, meta, row, lastCode });
    });
    return out;
  }

  async function executeMassCampaign(campaign, recipients){
    const selectedReply = findQuickReplyByCode(campaign && campaign.sendReplyCode || '');
    if(!selectedReply) throw new Error('No se encontro la respuesta rapida seleccionada.');

    const templateName = String(campaign && campaign.templateName || '').trim();
    const templateText = String(campaign && campaign.templateText || '').trim();
    const templateImage = String(campaign && campaign.templateImageUrl || '').trim();
    const now = Date.now();
    let ok = 0;
    let fail = 0;

    for(const recipient of recipients){
      const phone = normDigits(recipient && recipient.phone || '');
      if(!phone) continue;
      const meta = recipient && recipient.meta || {};
      const lastInboundTs = Number(meta && meta.lastInboundTs || 0) || 0;
      const outOf24h = !lastInboundTs || (now - lastInboundTs) > (24 * 60 * 60 * 1000);
      const shouldUseTemplate = !!(templateName && outOf24h);

      try{
        const endpoint = shouldUseTemplate ? '/send-whatsapp-template' : '/send-whatsapp';
        const payload = shouldUseTemplate
          ? {
              to: phone,
              templateName,
              bodyParam: templateText || String(selectedReply.text || ''),
              imageUrl: templateImage
            }
          : {
              to: phone,
              message: String(selectedReply.text || ''),
              imageUrl: String(selectedReply.imageUrl || '')
            };
        const resp = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await resp.json().catch(() => null);
        if(!resp.ok){
          throw new Error(String(data && data.error || ('HTTP ' + resp.status)));
        }
        ok += 1;
      }catch(e){
        fail += 1;
        appendMassStatus('Error con ' + displayPhone(phone) + ': ' + String(e && e.message || e));
      }
    }

    return { ok, fail, total: recipients.length };
  }

  function buildMassCampaignPayload(){
    const selectedReply = getSelectedMassReply();
    if(!selectedReply) throw new Error('Selecciona la respuesta rapida a enviar.');

    const delayUnit = String(massDelayUnitEl && massDelayUnitEl.value || 'hour').toLowerCase();
    const delayValue = delayUnit === 'day'
      ? Math.max(1, Number(massDelayDaysEl && massDelayDaysEl.value || 1) || 1)
      : Math.max(1, Math.min(23, Number(massDelayHoursEl && massDelayHoursEl.value || 1) || 1));

    return {
      id: 'mass_' + String(Date.now()),
      createdAt: Date.now(),
      sendReplyCode: normalizeQuickReplyCode(selectedReply.code),
      triggerCodes: (massTriggerCodesDraft || []).map((x) => normalizeQuickReplyCode(x)).filter(Boolean),
      responseStates: (massResponseFiltersDraft || []).slice(),
      excludeStatuses: (massExcludeStatusesDraft || []).slice(),
      excludeReplyCodes: (massExcludeReplyCodesDraft || []).map((x) => normalizeQuickReplyCode(x)).filter(Boolean),
      delayUnit,
      delayValue,
      templateName: String(massTemplateNameInputEl && massTemplateNameInputEl.value || '').trim(),
      templateText: String(massTemplateTextInputEl && massTemplateTextInputEl.value || '').trim(),
      templateImageUrl: String(massTemplateImageInputEl && massTemplateImageInputEl.value || '').trim()
    };
  }

  function bindMassRuntime(){
    if(!massPanelEl) return;

    if(massSendReplySelectEl){
      massSendReplySelectEl.addEventListener('change', () => renderMassPreview());
    }
    if(massTemplateNameInputEl){
      massTemplateNameInputEl.addEventListener('input', () => renderMassPreview());
    }
    if(massTemplateTextInputEl){
      massTemplateTextInputEl.addEventListener('input', () => renderMassPreview());
    }
    if(massTemplateImageInputEl){
      massTemplateImageInputEl.addEventListener('input', () => renderMassPreview());
    }
    if(massDelayUnitEl){
      massDelayUnitEl.addEventListener('change', () => {
        updateMassDelayVisibility();
        renderMassPreview();
      });
    }
    if(massDelayHoursEl){
      massDelayHoursEl.addEventListener('input', () => renderMassPreview());
    }
    if(massDelayDaysEl){
      massDelayDaysEl.addEventListener('input', () => renderMassPreview());
    }
    if(massDelayDownBtnEl && massDelayDaysEl){
      massDelayDownBtnEl.addEventListener('click', () => {
        const current = Math.max(1, Number(massDelayDaysEl.value || 1) || 1);
        massDelayDaysEl.value = String(Math.max(1, current - 1));
        renderMassPreview();
      });
    }
    if(massDelayUpBtnEl && massDelayDaysEl){
      massDelayUpBtnEl.addEventListener('click', () => {
        const current = Math.max(1, Number(massDelayDaysEl.value || 1) || 1);
        massDelayDaysEl.value = String(current + 1);
        renderMassPreview();
      });
    }

    if(massTriggerAddBtnEl && massTriggerSearchInputEl){
      massTriggerAddBtnEl.addEventListener('click', () => {
        const code = normalizeMassReplyCodeFromInput(massTriggerSearchInputEl.value);
        if(!code) return;
        if(!massTriggerCodesDraft.includes(code)) massTriggerCodesDraft.push(code);
        massTriggerSearchInputEl.value = '';
        renderMassInputs();
      });
    }

    if(massExcludeReplyAddBtnEl && massExcludeReplySearchInputEl){
      massExcludeReplyAddBtnEl.addEventListener('click', () => {
        const code = normalizeMassReplyCodeFromInput(massExcludeReplySearchInputEl.value);
        if(!code) return;
        if(!massExcludeReplyCodesDraft.includes(code)) massExcludeReplyCodesDraft.push(code);
        massExcludeReplySearchInputEl.value = '';
        renderMassInputs();
      });
    }

    if(massExcludeStatusAddBtnEl && massExcludeStatusSearchInputEl){
      massExcludeStatusAddBtnEl.addEventListener('click', () => {
        const status = String(massExcludeStatusSearchInputEl.value || '').trim();
        if(!status) return;
        if(!(massExcludeStatusesDraft || []).some((x) => normalizeMatcherText(x) === normalizeMatcherText(status))){
          massExcludeStatusesDraft.push(status);
        }
        massExcludeStatusSearchInputEl.value = '';
        renderMassInputs();
      });
    }

    if(massResponseStateAddBtnEl && massResponseStateSelectEl){
      massResponseStateAddBtnEl.addEventListener('click', () => {
        const state = String(massResponseStateSelectEl.value || '').trim();
        if(!state) return;
        if(!massResponseFiltersDraft.includes(state)) massResponseFiltersDraft.push(state);
        massResponseStateSelectEl.value = '';
        renderMassInputs();
      });
    }

    if(massPreviewSendEl){
      massPreviewSendEl.addEventListener('click', (ev) => {
        const btn = ev.target && ev.target.closest ? ev.target.closest('[data-mass-preview-key]') : null;
        if(!btn) return;
        const key = String(btn.getAttribute('data-mass-preview-key') || '').trim();
        if(!key) return;
        const item = massPreviewCatalog.get(key);
        if(!item) return;
        openMassChatPreview(item.title, item.html);
      });
    }

    if(massChatPreviewCloseEl){
      massChatPreviewCloseEl.addEventListener('click', () => closeMassChatPreview());
    }
    if(massChatPreviewBackdropEl){
      massChatPreviewBackdropEl.addEventListener('click', (ev) => {
        if(ev.target === massChatPreviewBackdropEl) closeMassChatPreview();
      });
    }
    document.addEventListener('keydown', (ev) => {
      if(ev.key === 'Escape') closeMassChatPreview();
    });

    if(massScheduleBtnEl){
      massScheduleBtnEl.addEventListener('click', async () => {
        if(massBroadcastInFlight) return;
        try{
          const campaign = buildMassCampaignPayload();
          const recipients = collectMassRecipients();
          massBroadcastJobs = Array.isArray(massBroadcastJobs) ? massBroadcastJobs : [];
          campaign.targetCount = recipients.length;
          massBroadcastJobs.unshift(campaign);
          massBroadcastJobs = massBroadcastJobs.slice(0, 40);
          saveMassBroadcastJobsSafe();

          appendMassStatus('Campana guardada. Destinatarios detectados: ' + String(recipients.length) + '.');
          if(!recipients.length){
            alert('No hay destinatarios para esta configuracion. Ajusta filtros y vuelve a intentar.');
            return;
          }
          const confirmSend = window.confirm('Se detectaron ' + String(recipients.length) + ' destinatarios. Deseas enviar ahora?');
          if(!confirmSend) return;

          massBroadcastInFlight = true;
          if(massScheduleBtnEl) massScheduleBtnEl.disabled = true;
          appendMassStatus('Iniciando envio masivo...');
          const result = await executeMassCampaign(campaign, recipients);
          appendMassStatus('Envio finalizado. OK: ' + String(result.ok) + ' | Error: ' + String(result.fail) + ' | Total: ' + String(result.total));
          await loadConversationsMinimal(true);
        }catch(e){
          appendMassStatus('No se pudo ejecutar la campana: ' + String(e && e.message || e));
          alert('No se pudo ejecutar la campana: ' + String(e && e.message || e));
        }
        massBroadcastInFlight = false;
        if(massScheduleBtnEl) massScheduleBtnEl.disabled = false;
      });
    }

    renderMassInputs();
  }

  function bindMinimalRuntime(){
    bindModuleRailRuntime();

    if(funnelsBoardSelectEl){
      funnelsBoardSelectEl.addEventListener('change', () => {
        activeFunnelBoardName = normalizeFunnelBoardName(funnelsBoardSelectEl.value || activeFunnelBoardName || 'VENTAS MENUDEO');
        saveFunnelBoardsState();
        renderFunnelsBoardHeader();
      });
    }

    if(funnelsAddBoardBtnEl){
      funnelsAddBoardBtnEl.addEventListener('click', async () => {
        await addNewFunnelBoard();
      });
    }

    if(contactsList){
      contactsList.addEventListener('click', (ev) => {
        const btn = ev.target && ev.target.closest ? ev.target.closest('[data-phone]') : null;
        if(!btn) return;
        const phone = btn.getAttribute('data-phone');
        if(phone) openConversationByPhone(phone);
      });
    }

    if(searchInput){
      searchInput.addEventListener('input', () => {
        renderContactsMinimal();
      });
    }

    if(sendBtn){
      sendBtn.addEventListener('click', () => {
        sendSelectedConversationMessage();
      });
    }

    if(msgInput){
      msgInput.addEventListener('keydown', (ev) => {
        if(ev.key === 'Enter' && !ev.shiftKey){
          ev.preventDefault();
          sendSelectedConversationMessage();
        }
      });
    }

    bindMassRuntime();
  }

  async function initMinimalV1Runtime(){
    bindMinimalRuntime();
    renderFunnelsBoardHeader();
    renderFunnelsBoard();
    setChatHeaderFromSelected();
    renderConversationMinimal([]);
    await loadConversationsMinimal(false);
    setInterval(() => {
      loadConversationsMinimal(true);
    }, 15000);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', () => { initMinimalV1Runtime(); }, { once:true });
  }else{
    initMinimalV1Runtime();
  }

})();
   