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
  const quickReplyAddBtnEl = document.getElementById('waQuickReplyAddBtn');
  const quickReplyListEl = document.getElementById('waQuickReplyList');
  const quickReplyResetBtnEl = document.getElementById('waQuickReplyResetBtn');
  const quickReplyMessageEl = document.getElementById('waQuickReplyMessage');
  const settingsTabButtons = Array.from(document.querySelectorAll('[data-settings-tab]'));
  const settingsPaneCrmEl = document.getElementById('waSettingsPaneCrm');
  const settingsPaneFunnelsEl = document.getElementById('waSettingsPaneFunnels');
  const settingsPaneUsersEl = document.getElementById('waSettingsPaneUsers');
  const settingsPaneRepliesEl = document.getElementById('waSettingsPaneReplies');
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

  const railButtons = Array.from(document.querySelectorAll('.wa-rail-btn'));
  const panels = Array.from(document.querySelectorAll('.wa-panel'));

  let chats = [];
  let selected = null;
  let poll = null;
  let pollingBusy = false;
  let suppressPollingUntil = 0;
  let suppressAutoScrollUntil = 0;
  let openMessageMenuKey = '';
  let pendingDeleteTarget = null;
  let pendingReplyContext = null;
  let lastConversationMessages = [];
  let lastLoadedPhoneDigits = '';
  let lastLoadedConversationTs = 0;
  let lastLoadedConversationSig = '';
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
  let multimediaViewerState = {
    open: false,
    ids: [],
    index: 0
  };
  let multimediaViewerRefs = null;
  let multimediaForwardRefs = null;
  let multimediaForwardState = {
    open: false,
    item: null,
    query: '',
    selectedPhone: ''
  };
  let activeChatFilter = 'all';
  let analyticsRange = { from: '', to: '' };
  let inboundNotifiedTsByPhone = new Map();
  let didInitInboundNotificationState = false;
  let audioUnlockedByUser = false;
  let incomingAudioCtx = null;
  let lastStarAnimatedKey = '';
  let lastStarAnimatedUntil = 0;
  let activeCatalogType = 'funnel';
  let draftCrmConfig = null;
  let draftQuickReplies = [];
  let settingsHasUnsavedChanges = false;
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
  const FUNNEL_BOARDS_KEY = 'waFunnelBoardsV1';
  const CHAT_WELCOME_LOGO_KEY = 'waChatWelcomeLogoV1';
  const MULTIMEDIA_HIDDEN_KEY = 'waMultimediaHiddenV1';
  const MULTIMEDIA_STARRED_KEY = 'waMultimediaStarredV1';
  const DEFAULT_CRM_CONFIG = {
    funnel: ['Cliente nuevo', 'Asignados', 'Contactados', 'Cierre', 'Archivados'],
    agents: ['No asignado'],
    statuses: ['Pendiente', 'Urgente', 'Importante', 'Atorado']
  };
  const REPLY_SLA_MINUTES = 10;
  const DEFAULT_QUICK_REPLIES = [
    { id:'QR-001', code:'saludo', text:'Hola, con gusto te ayudo.' },
    { id:'QR-002', code:'cotiza', text:'Perfecto, en un momento te comparto la cotizacion.' },
    { id:'QR-003', code:'gracias', text:'Gracias por escribirnos, te atiendo enseguida.' },
    { id:'QR-004', code:'datos', text:'Para continuar, me compartes tu nombre completo por favor.' }
  ];

  let crmConfig = loadCrmConfig();
  let crmMeta = loadCrmMeta();
  const funnelBoardsState = loadFunnelBoardsState();
  funnelBoards = funnelBoardsState.boards;
  activeFunnelBoardName = funnelBoardsState.active;
  primaryFunnelBoardName = funnelBoardsState.primary;
  draftPrimaryFunnelBoardName = primaryFunnelBoardName;
  let agentEmailMap = loadAgentEmailMap();
  let catalogMeta = loadCatalogMeta();
  let quickReplies = loadQuickReplies();
  localImportedLeads = loadLocalImportedLeads();
  let funnelStageSettings = loadFunnelStageSettings();

  const moduleTitles = {
    dashboard: 'MAQUILEROS - DASHBOARD',
    funnels: 'MAQUILEROS - ETAPAS',
    chats: 'MAQUILEROS - CHAT',
    multimedia: 'MAQUILEROS - MULTIMEDIA',
    directory: 'MAQUILEROS - DIRECTORIO',
    automation: 'MAQUILEROS - AUTOMATIZACIONES',
    analytics: 'MAQUILEROS - ANALITICA',
    settings: 'MAQUILEROS - AJUSTES'
  };

  function moduleList(){
    return Object.keys(moduleTitles);
  }

  function linkifyText(text){
    const t = String(text || '');
    // match URLs, www-prefixed, emails, and phone-like strings
    const combined = /(https?:\/\/[^\s<]+|www\.[^\s<]+|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}|\+?\d[\d\-\s().]{6,}\d)/gi;
    const frag = document.createDocumentFragment();
    let lastIndex = 0;
    let m;
    while((m = combined.exec(t)) !== null){
      const idx = m.index;
      if(idx > lastIndex){
        frag.appendChild(document.createTextNode(t.slice(lastIndex, idx)));
      }
      const token = m[0];
      let a = document.createElement('a');
      a.className = 'msg-link';

      if(/@/.test(token)){
        // email
        a.href = 'mailto:' + token;
        a.textContent = token;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      } else if(/^(https?:\/\/|www\.)/i.test(token)){
        // url
        let href = token;
        if(!/^https?:\/\//i.test(href)) href = 'http://' + href;
        a.href = href;
        a.textContent = token;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      } else {
        // phone-like
        const raw = token.replace(/[^+\d]/g, '');
        if(raw.length >= 7){
          a.href = 'tel:' + raw;
          a.textContent = token;
        } else {
          // fallback: not a phone
          frag.appendChild(document.createTextNode(token));
          lastIndex = idx + token.length;
          continue;
        }
      }

      frag.appendChild(a);
      lastIndex = idx + token.length;
    }
    if(lastIndex < t.length) frag.appendChild(document.createTextNode(t.slice(lastIndex)));
    return frag;
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

  function pendingClientCountForChat(chat){
    const meta = getMeta(chat && (chat.phone || chat.id));
    const lastInboundTs = normalizeTimestamp(meta.lastInboundTs || (chat && chat.lastInboundTs) || 0);
    const lastOutboundTs = normalizeTimestamp(meta.lastOutboundTs || (chat && chat.lastOutboundTs) || 0);
    const lastSeenTs = normalizeTimestamp(meta.lastSeenTs || 0);
    const latestCheckpointTs = Math.max(lastSeenTs, lastOutboundTs);
    if(!lastInboundTs || lastInboundTs <= latestCheckpointTs) return 0;
    const fromMeta = toPositiveInt(meta.pendingClientCount || meta.unreadCount);
    return fromMeta > 0 ? fromMeta : 1;
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
    let funnel = uniqueValues(raw && raw.funnel).length ? uniqueValues(raw.funnel) : fallback.funnel.slice();
    if(!funnel.some((s) => String(s).toLowerCase() === 'archivados')) funnel.push('Archivados');
    const agentsRaw = uniqueValues(raw && raw.agents);
    const statuses = uniqueValues(raw && raw.statuses).length ? uniqueValues(raw.statuses) : fallback.statuses.slice();
    const agents = ['No asignado'].concat(agentsRaw.filter((n) => String(n).toLowerCase() !== 'no asignado'));
    return { funnel, agents, statuses };
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
  }

  function resetSettingsDraftFromSaved(){
    draftCrmConfig = cloneCrmConfig(crmConfig);
    draftQuickReplies = Array.isArray(quickReplies) ? quickReplies.slice() : DEFAULT_QUICK_REPLIES.slice();
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

  function normalizeQuickReplyCode(value){
    return String(value || '')
      .trim()
      .toLowerCase()
      .replace(/^\/+/, '')
      .replace(/[^a-z0-9_-]/g, '');
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
      out.push({ id, code: finalCode, text });
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

  function renderQuickRepliesSettings(){
    if(!quickReplyListEl) return;
    quickReplyListEl.innerHTML = '';
    ensureSettingsDraft();
    const list = Array.isArray(draftQuickReplies) ? draftQuickReplies : [];
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
      textEl.textContent = String(reply && reply.text || '');
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
      row.appendChild(removeBtn);
      frag.appendChild(row);
    });
    quickReplyListEl.appendChild(frag);
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

  function isDemoEverythingEnabled(){
    try{ return localStorage.getItem(DEMO_EVERYTHING_ENABLED_KEY) === '1'; }
    catch(_e){ return false; }
  }

  function setDemoEverythingEnabled(enabled){
    try{ localStorage.setItem(DEMO_EVERYTHING_ENABLED_KEY, enabled ? '1' : '0'); }catch(_e){}
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

  function hasRealConversationActivity(chat){
    const digits = phoneKey(chat && (chat.phone || chat.id || ''));
    if(isKnownFakeDemoPhone(digits)) return false;
    const lastTs = normalizeTimestamp(chat && (chat.lastTimestamp || chat.updatedAt || chat.timestamp || 0));
    const preview = String(chat && (chat.lastText || chat.lastMessagePreview || '') || '').trim();
    const direction = String(chat && (chat.lastDirection || chat.direction || '') || '').trim().toLowerCase();
    const hasDirection = direction === 'in' || direction === 'inbound' || direction === 'received' || direction === 'out' || direction === 'outbound' || direction === 'sent';
    return !!(lastTs || preview || hasDirection);
  }

  function isKnownFakeDemoPhone(digits){
    const d = String(digits || '').replace(/\D+/g, '');
    // Legacy demo batch generated numbers like 52155000018, 52155000022, etc.
    return /^5215500\d{4}$/.test(d);
  }

  function purgeFakeLeadsDataset(realPhonesSet){
    const safeRealPhones = realPhonesSet instanceof Set ? realPhonesSet : new Set();

    setDemoClientsEnabled(false);
    setDemoEverythingEnabled(false);
    saveDemoClientPhones([]);
    try{ localStorage.removeItem(DEMO_MULTIMEDIA_ITEMS_KEY); }catch(_e){}

    Object.keys(crmMeta || {}).forEach((key) => {
      const phone = phoneKey(key);
      const meta = crmMeta[key] || {};
      if((meta.isDemoClient || isKnownFakeDemoPhone(phone)) && phone){
        delete crmMeta[key];
      }
    });
    saveCrmMeta();

    localImportedLeads = (localImportedLeads || []).filter((lead) => {
      const phone = phoneKey(lead && lead.phone);
      if(isKnownFakeDemoPhone(phone)) return false;
      return !!(phone && safeRealPhones.has(phone));
    });
    saveLocalImportedLeads();

    if(demoClientsEnabledEl) demoClientsEnabledEl.checked = false;
    if(demoEverythingEnabledEl) demoEverythingEnabledEl.checked = false;
    showDemoClientsMessage('Clientes demo desactivados.');
    showDemoEverythingMessage('Datos de prueba de todo desactivados.');
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

  function createDemoClientsBatch(){
    const total = 50;
    const now = Date.now();
    const phones = [];
    const activeStages = (crmConfig.funnel || []).filter((stage) => String(stage).toLowerCase() !== 'archivados');

    for(let i = 1; i <= total; i += 1){
      const phone = '5215500' + String(i).padStart(4, '0');
      const name = 'Cliente Demo ' + String(i).padStart(2, '0');
      phones.push(phone);

      const read = i > 20;
  const ageMs = randomDemoAgeMs();
      const lastMessageTs = now - ageMs;
      const lastSeenTs = read ? (lastMessageTs + (5 * 60 * 1000)) : Math.max(0, lastMessageTs - (25 * 60 * 1000));
      const stage = pickFrom(activeStages, 'Cliente nuevo');
      const status = pickFrom(crmConfig.statuses, 'Pendiente');
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
        lastMessagePreview: read ? 'Seguimiento demo' : 'Hola, necesito informacion',
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
      removeDemoClientsBatch();
      setDemoClientsEnabled(false);
      if(demoEverythingEnabledEl) demoEverythingEnabledEl.checked = false;
      setDemoEverythingEnabled(false);
      showDemoEverythingMessage('Datos de prueba de todo desactivados.');
      showDemoClientsMessage('Clientes demo desactivados.');
    }

    if(demoClientsEnabledEl) demoClientsEnabledEl.checked = enable;

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
      setDemoClientsEnabled(true);
      setDemoEverythingEnabled(true);
      if(demoClientsEnabledEl) demoClientsEnabledEl.checked = true;
      showDemoClientsMessage('Clientes demo activos como base del paquete completo.');
      showDemoEverythingMessage('Se activaron datos de prueba de todo.');
    } else {
      removeDemoEverythingBatch();
      setDemoEverythingEnabled(false);
      setDemoClientsEnabled(false);
      if(demoClientsEnabledEl) demoClientsEnabledEl.checked = false;
      showDemoClientsMessage('Clientes demo desactivados.');
      showDemoEverythingMessage('Datos de prueba de todo desactivados.');
    }

    if(demoEverythingEnabledEl) demoEverythingEnabledEl.checked = enable;

    await loadChats();
    renderDashboard();
    renderFunnelsStatusList();
    renderFunnelsBoard();
    await buildDirectoryRows();
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

  function formatMoneyMXN(value){
    const n = Number(value || 0);
    const safe = Number.isFinite(n) ? n : 0;
    return '$' + safe.toLocaleString('es-MX', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  function formatDateEsLong(date){
    try{
      return new Intl.DateTimeFormat('es-MX', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);
    }catch(_e){
      return formatDateOnly(date.getTime());
    }
  }

  function formatRangeLabel(fromMs, toMs){
    const from = new Date(fromMs);
    const to = new Date(toMs);
    const dd1 = String(from.getUTCDate()).padStart(2, '0');
    const mm1 = String(from.getUTCMonth() + 1).padStart(2, '0');
    const yy1 = from.getUTCFullYear();
    const dd2 = String(to.getUTCDate()).padStart(2, '0');
    const mm2 = String(to.getUTCMonth() + 1).padStart(2, '0');
    const yy2 = to.getUTCFullYear();
    return dd1 + '/' + mm1 + '/' + yy1 + ' - ' + dd2 + '/' + mm2 + '/' + yy2;
  }

  function pctChange(current, previous){
    const c = Number(current || 0);
    const p = Number(previous || 0);
    if(!p) return c ? 100 : 0;
    return Math.round(((c - p) / p) * 100);
  }

  function setAnalyticsMetric(valueEl, subEl, deltaEl, value, unitLabel, previousValue){
    const val = Number(value || 0);
    const prev = Number(previousValue || 0);
    if(valueEl) valueEl.textContent = String(val);
    if(subEl) subEl.textContent = String(val) + ' ' + unitLabel;
    if(deltaEl){
      const pct = pctChange(val, prev);
      deltaEl.textContent = (pct >= 0 ? '+' : '') + String(pct) + '%';
      deltaEl.style.color = pct < 0 ? '#dc2626' : '#16a34a';
    }
  }

  function setAnalyticsRevenue(valueEl, subEl, deltaEl, value, previousValue){
    const val = Number(value || 0);
    const prev = Number(previousValue || 0);
    if(valueEl) valueEl.textContent = formatMoneyMXN(val);
    if(subEl) subEl.textContent = formatMoneyMXN(val) + ' MXN';
    if(deltaEl){
      const pct = pctChange(val, prev);
      deltaEl.textContent = (pct >= 0 ? '+' : '') + String(pct) + '%';
      deltaEl.style.color = pct < 0 ? '#dc2626' : '#16a34a';
    }
  }

  function analyticsRangeFromInputs(){
    const fromVal = String(analyticsFromEl && analyticsFromEl.value || '').trim();
    const toVal = String(analyticsToEl && analyticsToEl.value || '').trim();
    if(!fromVal || !toVal) return null;
    const from = new Date(fromVal + 'T00:00:00.000Z').getTime();
    const to = new Date(toVal + 'T23:59:59.999Z').getTime();
    if(!Number.isFinite(from) || !Number.isFinite(to) || to < from) return null;
    return { from, to };
  }

  function inUtcRange(ts, range){
    const n = normalizeTimestamp(ts);
    if(!n || !range) return false;
    return n >= range.from && n <= range.to;
  }

  function computeAnalytics(range){
    const rows = getLeadRows();
    const prevSpan = (range.to - range.from) + 1;
    const prevRange = { from: range.from - prevSpan, to: range.from - 1 };

    const sumHistoryBy = (predicate, targetRange) => {
      let count = 0;
      Object.keys(crmMeta || {}).forEach((key) => {
        const list = Array.isArray(crmMeta[key] && crmMeta[key].historyMovements) ? crmMeta[key].historyMovements : [];
        list.forEach((item) => {
          if(!inUtcRange(item && item.ts, targetRange)) return;
          if(predicate(item)) count += 1;
        });
      });
      return count;
    };

    const revenueInRange = (targetRange) => rows.reduce((acc, row) => {
      const meta = getMeta(row.phone);
      const amount = Number(meta.revenue || meta.amount || 0);
      if(!amount) return acc;
      const closeTs = Number(meta.closedAt || row.lastTs || 0);
      return inUtcRange(closeTs, targetRange) ? acc + amount : acc;
    }, 0);

    const leadsNew = rows.filter((row) => {
      const ts = Number(row.openedAt || row.lastTs || 0);
      return inUtcRange(ts, range);
    }).length;
    const leadsNewPrev = rows.filter((row) => {
      const ts = Number(row.openedAt || row.lastTs || 0);
      return inUtcRange(ts, prevRange);
    }).length;

    const msgOut = sumHistoryBy((item) => String(item && item.action || '').toLowerCase() === 'mensaje enviado', range);
    const msgOutPrev = sumHistoryBy((item) => String(item && item.action || '').toLowerCase() === 'mensaje enviado', prevRange);
    const msgIn = sumHistoryBy((item) => String(item && item.action || '').toLowerCase().includes('mensaje recibido'), range);
    const msgInPrev = sumHistoryBy((item) => String(item && item.action || '').toLowerCase().includes('mensaje recibido'), prevRange);

    const won = rows.filter((row) => String(row.funnel || '').toLowerCase().includes('cierre') && inUtcRange(row.lastTs, range)).length;
    const wonPrev = rows.filter((row) => String(row.funnel || '').toLowerCase().includes('cierre') && inUtcRange(row.lastTs, prevRange)).length;

    const unattended = rows.filter((row) => {
      const unattendedNow = String(row.user || '').toLowerCase() === 'no asignado' || String(row.stage || '').toLowerCase() === 'pendiente';
      return unattendedNow && inUtcRange(row.lastTs || row.openedAt, range);
    }).length;
    const unattendedPrev = rows.filter((row) => {
      const unattendedNow = String(row.user || '').toLowerCase() === 'no asignado' || String(row.stage || '').toLowerCase() === 'pendiente';
      return unattendedNow && inUtcRange(row.lastTs || row.openedAt, prevRange);
    }).length;

    const revenue = revenueInRange(range);
    const revenuePrev = revenueInRange(prevRange);

    const byAgent = new Map();
    const pushAgent = (name) => {
      const key = String(name || 'No asignado');
      if(!byAgent.has(key)){
        byAgent.set(key, { name: key, leadsNew: 0, msgOut: 0, revenue: 0, won: 0, unattended: 0 });
      }
      return byAgent.get(key);
    };

    crmConfig.agents
      .filter((name) => String(name || '').trim() && String(name || '').toLowerCase() !== 'no asignado')
      .forEach((name) => pushAgent(name));

    rows.forEach((row) => {
      const agentName = String(row.user || 'No asignado');
      const bucket = pushAgent(agentName);
      const ts = Number(row.lastTs || row.openedAt || 0);
      if(inUtcRange(ts, range)){
        bucket.leadsNew += 1;
        if(String(row.funnel || '').toLowerCase().includes('cierre')) bucket.won += 1;
        if(String(row.user || '').toLowerCase() === 'no asignado' || String(row.stage || '').toLowerCase() === 'pendiente') bucket.unattended += 1;
      }
      const meta = getMeta(row.phone);
      const amount = Number(meta.revenue || meta.amount || 0);
      if(amount && inUtcRange(Number(meta.closedAt || ts || 0), range)) bucket.revenue += amount;
      const history = Array.isArray(meta.historyMovements) ? meta.historyMovements : [];
      history.forEach((item) => {
        if(!inUtcRange(item && item.ts, range)) return;
        if(String(item && item.user || '').trim() !== agentName) return;
        if(String(item && item.action || '').toLowerCase() === 'mensaje enviado') bucket.msgOut += 1;
      });
    });

    return {
      leadsNew, leadsNewPrev,
      msgIn, msgInPrev,
      msgOut, msgOutPrev,
      revenue, revenuePrev,
      won, wonPrev,
      unattended, unattendedPrev,
      agents: Array.from(byAgent.values()).sort((a, b) => a.name.localeCompare(b.name, 'es'))
    };
  }

  function renderAnalytics(){
    if(!analyticsFromEl || !analyticsToEl) return;

    if(!analyticsRange.from || !analyticsRange.to){
      const today = new Date();
      const to = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
      const from = new Date(to.getTime() - (24 * 60 * 60 * 1000));
      analyticsRange.from = formatDateOnly(from.getTime());
      analyticsRange.to = formatDateOnly(to.getTime());
      analyticsFromEl.value = analyticsRange.from;
      analyticsToEl.value = analyticsRange.to;
    }

    const range = analyticsRangeFromInputs();
    if(!range) return;

    if(analyticsRangeLabelEl){
      analyticsRangeLabelEl.textContent = 'Leads por rango de fechas: ' + formatRangeLabel(range.from, range.to);
    }
    if(analyticsUpdatedEl){
      const now = new Date();
      const dd = String(now.getDate()).padStart(2, '0');
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const yyyy = now.getFullYear();
      analyticsUpdatedEl.textContent = 'Esta informacion fue actualizada por ultima vez el ' + dd + '/' + mm + '/' + yyyy + '.';
    }

    const stats = computeAnalytics(range);
    setAnalyticsMetric(analyticsLeadsNewValueEl, analyticsLeadsNewSubEl, analyticsLeadsNewDeltaEl, stats.leadsNew, 'Leads', stats.leadsNewPrev);
    setAnalyticsMetric(analyticsMsgInValueEl, analyticsMsgInSubEl, analyticsMsgInDeltaEl, stats.msgIn, 'Mensajes', stats.msgInPrev);
    setAnalyticsMetric(analyticsMsgOutValueEl, analyticsMsgOutSubEl, analyticsMsgOutDeltaEl, stats.msgOut, 'Mensajes', stats.msgOutPrev);
    setAnalyticsRevenue(analyticsRevenueValueEl, analyticsRevenueSubEl, analyticsRevenueDeltaEl, stats.revenue, stats.revenuePrev);
    setAnalyticsMetric(analyticsWonValueEl, analyticsWonSubEl, analyticsWonDeltaEl, stats.won, 'Leads', stats.wonPrev);
    setAnalyticsMetric(analyticsUnattendedValueEl, analyticsUnattendedSubEl, analyticsUnattendedDeltaEl, stats.unattended, 'Leads', stats.unattendedPrev);

    if(analyticsAgentsBodyEl){
      analyticsAgentsBodyEl.innerHTML = '';
      const frag = document.createDocumentFragment();
      stats.agents.forEach((agent) => {
        const tr = document.createElement('tr');
        tr.innerHTML = [
          '<td>' + escapeHtml(agent.name) + '</td>',
          '<td>' + String(agent.leadsNew) + '</td>',
          '<td>' + String(agent.msgOut) + '</td>',
          '<td>' + escapeHtml(formatMoneyMXN(agent.revenue)) + '</td>',
          '<td>' + String(agent.won) + '</td>',
          '<td>' + String(agent.unattended) + '</td>'
        ].join('');
        frag.appendChild(tr);
      });
      if(!stats.agents.length){
        const tr = document.createElement('tr');
        tr.innerHTML = '<td colspan="6" class="analytics-empty">Sin datos para el periodo seleccionado.</td>';
        frag.appendChild(tr);
      }
      analyticsAgentsBodyEl.appendChild(frag);
    }
  }

  function getSystemUserName(){
    const fromOperator = String(window.__OPERATOR_NAME__ || '').trim();
    if(fromOperator) return fromOperator;
    try{
      const fromStorage = String(localStorage.getItem('waCurrentUserName') || '').trim();
      if(fromStorage) return fromStorage;
    }catch(_e){}
    const authUser = window.auth && window.auth.currentUser ? window.auth.currentUser : null;
    const fromAuth = String(authUser && (authUser.displayName || authUser.email || authUser.uid) || '').trim();
    if(fromAuth) return fromAuth.split('@')[0];
    return 'Usuario';
  }

  function getLeadRows(){
    const merged = new Map();
    const defaultBoard = funnelBoards[0] || 'VENTAS MENUDEO';

    chats.forEach((chat) => {
      const phone = phoneKey(chat.phone || chat.id);
      if(!phone) return;
      if(isKnownFakeDemoPhone(phone)) return;
      const meta = getMeta(phone);
      if(meta.deleted) return;
      const boardName = normalizeFunnelBoardName(meta.funnelBoard || defaultBoard) || defaultBoard;
      merged.set(phone, {
        id: phone,
        phone,
        name: chat.name || ('+' + phone),
        board: boardName,
        funnel: meta.funnel || chat.funnel || crmConfig.funnel[0],
        stage: meta.status || chat.status || crmConfig.statuses[0],
        user: meta.agent || chat.assignedTo || 'No asignado',
        archived: !!meta.archived,
        read: chat.read !== false,
        integration: String(meta.integration || chat.integration || 'whatsapp').toLowerCase(),
        labels: Array.isArray(meta.labels) ? meta.labels : [],
        lastText: String(meta.lastMessagePreview || chat.lastText || '').trim(),
        lastTs: normalizeTimestamp(chat.lastTimestamp || meta.lastMessageTs || 0),
        openedAt: Number(meta.openedAt || 0),
        lastSeenTs: Number(meta.lastSeenTs || 0),
        lastInboundTs: Number(meta.lastInboundTs || 0),
        lastOutboundTs: Number(meta.lastOutboundTs || 0)
      });
    });

    return Array.from(merged.values()).sort((a,b) => Number(b.lastTs || 0) - Number(a.lastTs || 0));
  }

  function renderLeadFilterOptions(rows){
    const unique = (arr) => Array.from(new Set(arr.filter(Boolean))).sort();
    const stages = unique(rows.map((r) => r.funnel));
    const statuses = unique(rows.map((r) => r.stage));
    const users = unique(rows.map((r) => r.user));

    if(leadFilterStage){
      const prev = leadFilterStage.value;
      leadFilterStage.innerHTML = '<option value="">Todas</option>';
      stages.forEach((value) => {
        const op = document.createElement('option');
        op.value = value;
        op.textContent = value;
        leadFilterStage.appendChild(op);
      });
      leadFilterStage.value = stages.includes(prev) ? prev : '';
    }

    if(leadFilterStatus){
      const prev = leadFilterStatus.value;
      leadFilterStatus.innerHTML = '<option value="">Todos</option>';
      statuses.forEach((value) => {
        const op = document.createElement('option');
        op.value = value;
        op.textContent = value;
        leadFilterStatus.appendChild(op);
      });
      leadFilterStatus.value = statuses.includes(prev) ? prev : '';
    }

    if(leadFilterUser){
      const prev = leadFilterUser.value;
      leadFilterUser.innerHTML = '<option value="">Todos</option>';
      users.forEach((value) => {
        const op = document.createElement('option');
        op.value = value;
        op.textContent = value;
        leadFilterUser.appendChild(op);
      });
      leadFilterUser.value = users.includes(prev) ? prev : '';
    }
  }

  function getLeadStateFilter(){
    const selectedRadio = document.querySelector('input[name="leadStateFilter"]:checked');
    return selectedRadio ? selectedRadio.value : 'all';
  }

  function renderLeadTable(){
    if(!leadPopupTableBody) return;
    const query = String(leadPopupSearchInput && leadPopupSearchInput.value || '').trim().toLowerCase();
    const state = getLeadStateFilter();
    const dateValue = String(leadFilterDate && leadFilterDate.value || '').trim();
    const stageValue = String(leadFilterStage && leadFilterStage.value || '').trim();
    const statusValue = String(leadFilterStatus && leadFilterStatus.value || '').trim();
    const userValue = String(leadFilterUser && leadFilterUser.value || '').trim();

    const filtered = leadSearchRows.filter((row) => {
      if(state === 'active' && row.archived) return false;
      if(state === 'archived' && !row.archived) return false;
      if(query){
        const rowText = (row.name + ' ' + row.phone + ' ' + row.user + ' ' + row.funnel + ' ' + row.stage).toLowerCase();
        if(!rowText.includes(query)) return false;
      }
      if(dateValue && formatDateOnly(row.lastTs) !== dateValue) return false;
      if(stageValue && row.funnel !== stageValue) return false;
      if(statusValue && row.stage !== statusValue) return false;
      if(userValue && row.user !== userValue) return false;
      return true;
    });

    leadPopupTableBody.innerHTML = '';
    const frag = document.createDocumentFragment();

    filtered.forEach((row) => {
      const tr = document.createElement('tr');
      tr.style.cursor = 'pointer';
      tr.innerHTML = [
        '<td><div class="lead-user"><div class="lead-avatar">' + escapeHtml((row.name || row.phone).slice(0,2).toUpperCase()) + '</div><div>' + escapeHtml(row.name || ('+' + row.phone)) + '</div></div></td>',
        '<td>' + escapeHtml(row.funnel || '-') + '</td>',
        '<td>' + escapeHtml(row.stage || '-') + '</td>',
        '<td>' + escapeHtml(row.user || 'No asignado') + '</td>'
      ].join('');

      tr.addEventListener('click', async () => {
        const candidate = chats.find((c) => phoneKey(c.phone || c.id) === row.phone);
        if(candidate){
          await selectContact(candidate);
          setActiveModule('chats');
        }
        if(leadSearchBackdrop) leadSearchBackdrop.classList.remove('open');
      });

      frag.appendChild(tr);
    });

    if(!filtered.length){
      const tr = document.createElement('tr');
      tr.innerHTML = '<td colspan="4" style="color:#64748b;padding:10px;">Sin leads para los filtros seleccionados.</td>';
      frag.appendChild(tr);
    }

    leadPopupTableBody.appendChild(frag);
  }

  function openLeadSearchPopup(){
    leadSearchRows = getLeadRows();
    renderLeadFilterOptions(leadSearchRows);
    renderLeadTable();
    if(leadSearchBackdrop){
      leadSearchBackdrop.classList.add('open');
      leadSearchBackdrop.setAttribute('aria-hidden', 'false');
    }
    if(leadPopupSearchInput) leadPopupSearchInput.focus();
  }

  function renderDashboard(){
    const userName = getSystemUserName();
    if(dashGreetingEl) dashGreetingEl.textContent = 'Hola, ' + userName + ' 👋';

    if(dashSummaryDateEl){
      const d = new Date();
      d.setDate(d.getDate() - 1);
      const dd = String(d.getDate()).padStart(2, '0');
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const yyyy = d.getFullYear();
      dashSummaryDateEl.textContent = 'Resumen de la actividad de tus leads del: ' + dd + '/' + mm + '/' + yyyy;
    }

    const rows = getLeadRows();
    const generated = rows.length;
    const won = rows.filter((r) => String(r.funnel || '').toLowerCase().includes('cierre')).length;
    const unattended = rows.filter((r) => String(r.user || '').toLowerCase() === 'no asignado' || String(r.stage || '').toLowerCase() === 'pendiente').length;

    if(dashLeadsGeneratedEl) dashLeadsGeneratedEl.textContent = String(generated);
    if(dashLeadsWonEl) dashLeadsWonEl.textContent = String(won);
    if(dashLeadsUnattendedEl) dashLeadsUnattendedEl.textContent = String(unattended);

    if(dashTeamListEl){
      const assignedUsers = new Set(rows.map((r) => String(r.user || '').trim()).filter((u) => u && u.toLowerCase() !== 'no asignado'));
      const teamUsers = crmConfig.agents.filter((a) => String(a).toLowerCase() !== 'no asignado');
      const source = teamUsers.length ? teamUsers : Array.from(assignedUsers);
      dashTeamListEl.innerHTML = '';
      const frag = document.createDocumentFragment();
      source.forEach((user) => {
        const online = assignedUsers.has(user);
        const row = document.createElement('div');
        row.className = 'team-row';
        row.innerHTML = '<span>' + escapeHtml(user) + '</span><span class="team-state ' + (online ? 'on' : 'off') + '">' + (online ? 'Conectado' : 'Sin actividad') + '</span>';
        frag.appendChild(row);
      });
      if(!source.length){
        const row = document.createElement('div');
        row.className = 'team-row';
        row.innerHTML = '<span>Sin usuarios configurados</span><span class="team-state off">Sin actividad</span>';
        frag.appendChild(row);
      }
      dashTeamListEl.appendChild(frag);
    }
  }

  function setTopbarByModule(moduleName){
    const isFunnels = moduleName === 'funnels';
    if(topLeadSearchBtn){
      topLeadSearchBtn.style.display = isFunnels ? 'none' : 'flex';
      topLeadSearchBtn.style.pointerEvents = isFunnels ? 'none' : 'auto';
    }
    if(topFunnelsControls){
      topFunnelsControls.style.display = isFunnels ? 'flex' : 'none';
      topFunnelsControls.style.pointerEvents = isFunnels ? 'auto' : 'none';
      topFunnelsControls.classList.toggle('active', isFunnels);
      topFunnelsControls.setAttribute('aria-hidden', isFunnels ? 'false' : 'true');
    }
    if(!isFunnels) setAddLeadPopoverOpen(false);
    if(isFunnels) renderFunnelsBoardHeader();
  }

  function renderAddLeadTargets(){
    if(!addLeadTargetEl) return;
    const current = addLeadTargetEl.value;
    const options = Array.isArray(funnelBoards) ? funnelBoards.slice() : [];
    addLeadTargetEl.innerHTML = '';
    options.forEach((boardName) => {
      const op = document.createElement('option');
      op.value = boardName;
      op.textContent = boardName;
      addLeadTargetEl.appendChild(op);
    });
    if(options.includes(current)) addLeadTargetEl.value = current;
    else if(options.length) addLeadTargetEl.value = activeFunnelBoardName;
  }

  function setAddLeadPopoverOpen(open){
    addLeadPopoverOpen = !!open;
    if(addLeadPopoverEl){
      addLeadPopoverEl.classList.toggle('open', addLeadPopoverOpen);
      addLeadPopoverEl.setAttribute('aria-hidden', addLeadPopoverOpen ? 'false' : 'true');
    }
    if(addLeadPopoverOpen){
      renderAddLeadTargets();
      if(addLeadNameEl) addLeadNameEl.focus();
    }
  }

  function setFunnelsFiltersOpen(open){
    funnelsFiltersOpen = !!open;
    if(funnelsFiltersEl) funnelsFiltersEl.classList.toggle('open', funnelsFiltersOpen);
  }

  function selectedRadioValue(name, fallback){
    const checked = document.querySelector('input[name="' + name + '"]:checked');
    return checked ? checked.value : fallback;
  }

  function renderFunnelsStatusList(){
    if(!funnelsStatusListEl) return;
    const previous = selectedRadioValue('funnelStatusFilter', 'all');
    const statuses = Array.isArray(crmConfig.statuses) ? crmConfig.statuses : [];

    funnelsStatusListEl.innerHTML = '';
    const list = ['all'].concat(statuses);
    list.forEach((status) => {
      const label = document.createElement('label');
      label.className = 'funnels-radio-item';
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'funnelStatusFilter';
      input.value = status;
      input.checked = (previous === status) || (previous === 'all' && status === 'all');
      input.addEventListener('change', () => {
        funnelsFilterState.status = selectedRadioValue('funnelStatusFilter', 'all');
        renderFunnelsBoard();
      });
      label.appendChild(input);
      label.appendChild(document.createTextNode(status === 'all' ? 'Todos los estatus' : status));
      funnelsStatusListEl.appendChild(label);
    });
  }

  function refreshFunnelsUsersOptions(rows){
    if(!funnelsUserFilterEl) return;
    const previous = funnelsUserFilterEl.value;
    const users = Array.from(new Set((rows || []).map((row) => String(row.user || '').trim()).filter(Boolean))).sort();
    funnelsUserFilterEl.innerHTML = '<option value="">Todos</option>';
    users.forEach((user) => {
      const option = document.createElement('option');
      option.value = user;
      option.textContent = user;
      funnelsUserFilterEl.appendChild(option);
    });
    funnelsUserFilterEl.value = users.includes(previous) ? previous : '';
  }

  function funnelBoardColumns(){
    const base = (Array.isArray(crmConfig.funnel) && crmConfig.funnel.length)
      ? crmConfig.funnel.slice()
      : ['Pendiente', 'Cliente nuevo', 'Asignado', 'Contactado', 'Cierre', 'Archivados'];
    if(!base.some((stage) => String(stage || '').toLowerCase() === 'archivados')) base.push('Archivados');
    return base;
  }

  function syncFunnelsFilterStateFromUi(){
    funnelsFilterState.search = '';
    funnelsFilterState.message = selectedRadioValue('funnelMsgFilter', 'all');
    funnelsFilterState.date = String(funnelsDateFilterEl && funnelsDateFilterEl.value || '').trim();
    funnelsFilterState.status = selectedRadioValue('funnelStatusFilter', 'all');
    funnelsFilterState.channel = selectedRadioValue('funnelChannelFilter', 'all');
    funnelsFilterState.tags = String(funnelsTagSearchEl && funnelsTagSearchEl.value || '').trim().toLowerCase();
    funnelsFilterState.user = String(funnelsUserFilterEl && funnelsUserFilterEl.value || '').trim();
  }

  function applyFunnelsFilters(rows){
    syncFunnelsFilterStateFromUi();
    return (rows || []).filter((row) => {
      if(funnelsFilterState.search){
        const haystack = [row.name, row.phone, row.user, row.funnel, row.stage, (row.labels || []).join(' ')].join(' ').toLowerCase();
        if(!haystack.includes(funnelsFilterState.search)) return false;
      }
      if(funnelsFilterState.message === 'read' && row.read === false) return false;
      if(funnelsFilterState.message === 'unread' && row.read !== false) return false;
      if(funnelsFilterState.date && formatDateOnly(row.lastTs) !== funnelsFilterState.date) return false;
      if(funnelsFilterState.status !== 'all' && row.stage !== funnelsFilterState.status) return false;
      if(funnelsFilterState.channel !== 'all' && String(row.integration || 'whatsapp') !== funnelsFilterState.channel) return false;
      if(funnelsFilterState.tags){
        const tags = (Array.isArray(row.labels) ? row.labels : []).join(' ').toLowerCase();
        if(!tags.includes(funnelsFilterState.tags)) return false;
      }
      if(funnelsFilterState.user && row.user !== funnelsFilterState.user) return false;
      return true;
    });
  }

  function updateLeadFunnel(phoneDigits, nextFunnel){
    const key = phoneKey(phoneDigits);
    if(!key || !nextFunnel) return;
    const archived = String(nextFunnel).toLowerCase() === 'archivados';
    setMeta(key, { funnel: nextFunnel, archived });

    chats = chats.map((chat) => {
      const chatKey = phoneKey(chat.phone || chat.id);
      if(chatKey !== key) return chat;
      return Object.assign({}, chat, { funnel: nextFunnel, archived });
    });

    if(selected && phoneKey(selected.phone || selected.id) === key){
      selected.funnel = nextFunnel;
      selected.archived = archived;
      syncToolbarFromSelection();
    }

    renderChats();
    renderDashboard();
    const activePanel = document.querySelector('.wa-panel.active');
    if(activePanel && activePanel.dataset.panel === 'directory'){
      buildDirectoryRows();
    }
  }

  function bindFunnelColumnDropzone(columnEl, funnelName){
    columnEl.addEventListener('dragover', (ev) => {
      ev.preventDefault();
      columnEl.classList.add('drag-over');
    });
    columnEl.addEventListener('dragleave', () => {
      columnEl.classList.remove('drag-over');
    });
    columnEl.addEventListener('drop', (ev) => {
      ev.preventDefault();
      columnEl.classList.remove('drag-over');
      const draggingStage = String(ev.dataTransfer && ev.dataTransfer.getData('application/x-funnel-stage') || '').trim();
      if(draggingStage){
        if(reorderFunnelStage(draggingStage, funnelName)) renderFunnelsBoard();
        return;
      }
      const phone = String(ev.dataTransfer && ev.dataTransfer.getData('text/plain') || '').trim();
      if(!phone) return;
      updateLeadFunnel(phone, funnelName);
      renderFunnelsBoard();
    });
  }

  function animateFunnelBoardReflow(boardEl, mutateDom){
    if(!boardEl || typeof mutateDom !== 'function') return;
    const tracked = Array.from(boardEl.children).filter((el) =>
      el.classList && (el.classList.contains('funnel-col') || el.classList.contains('funnel-col-placeholder'))
    );
    const firstRects = new Map(tracked.map((el) => [el, el.getBoundingClientRect()]));
    mutateDom();
    const after = Array.from(boardEl.children).filter((el) =>
      el.classList && (el.classList.contains('funnel-col') || el.classList.contains('funnel-col-placeholder'))
    );
    after.forEach((el) => {
      const first = firstRects.get(el);
      if(!first) return;
      const last = el.getBoundingClientRect();
      const dx = first.left - last.left;
      const dy = first.top - last.top;
      if(Math.abs(dx) < 1 && Math.abs(dy) < 1) return;
      el.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
      requestAnimationFrame(() => {
        el.style.transform = 'translate(0,0)';
      });
    });
  }

  function cleanupFunnelColumnDragArtifacts(){
    document.querySelectorAll('.funnel-col-placeholder').forEach((el) => {
      try{ el.remove(); }catch(_e){}
    });
    document.querySelectorAll('.funnel-col.funnel-col-floating').forEach((el) => {
      try{
        el.classList.remove('funnel-col-floating');
        el.style.left = '';
        el.style.top = '';
        el.style.width = '';
        el.style.height = '';
        if(el.parentElement === document.body) el.remove();
      }catch(_e){}
    });
  }

  function bindFunnelColumnHeaderDrag(headEl, columnEl, stageName){
    if(!headEl || !columnEl || !stageName) return;
    headEl.addEventListener('pointerdown', (downEv) => {
      if(downEv.button !== 0) return;
      const targetEl = downEv.target;
      if(targetEl && targetEl.closest && targetEl.closest('.funnel-col-tools')) return;
      if(!funnelsBoardEl) return;

      cleanupFunnelColumnDragArtifacts();
      downEv.preventDefault();
      const boardEl = funnelsBoardEl;
      const pointerId = downEv.pointerId;
      const rect = columnEl.getBoundingClientRect();
      const offsetX = downEv.clientX - rect.left;
      const offsetY = downEv.clientY - rect.top;

      const placeholder = document.createElement('section');
      placeholder.className = 'funnel-col funnel-col-placeholder';
      placeholder.style.width = rect.width + 'px';
      placeholder.style.height = rect.height + 'px';

      boardEl.insertBefore(placeholder, columnEl);

      const floating = columnEl;
      floating.classList.add('funnel-col-floating');
      floating.style.width = rect.width + 'px';
      floating.style.height = rect.height + 'px';
      floating.style.left = (downEv.clientX - offsetX) + 'px';
      floating.style.top = (downEv.clientY - offsetY) + 'px';
      document.body.appendChild(floating);

      const moveFloating = (clientX, clientY) => {
        floating.style.left = (clientX - offsetX) + 'px';
        floating.style.top = (clientY - offsetY) + 'px';
      };

      const onMove = (moveEv) => {
        if(moveEv.pointerId !== pointerId) return;
        moveFloating(moveEv.clientX, moveEv.clientY);

        const siblings = Array.from(boardEl.querySelectorAll('.funnel-col')).filter((el) =>
          el !== floating && !el.classList.contains('funnel-col-placeholder')
        );
        let insertBeforeEl = null;
        for(let i = 0; i < siblings.length; i += 1){
          const siblingRect = siblings[i].getBoundingClientRect();
          if(moveEv.clientX < (siblingRect.left + siblingRect.width / 2)){
            insertBeforeEl = siblings[i];
            break;
          }
        }

        const shouldAppend = !insertBeforeEl;
        const sameSpot = shouldAppend
          ? placeholder === boardEl.lastElementChild
          : placeholder.nextSibling === insertBeforeEl;
        if(sameSpot) return;

        animateFunnelBoardReflow(boardEl, () => {
          if(shouldAppend) boardEl.appendChild(placeholder);
          else boardEl.insertBefore(placeholder, insertBeforeEl);
        });
      };

      const onEnd = (endEv) => {
        if(endEv.pointerId !== pointerId) return;
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup', onEnd);
        window.removeEventListener('pointercancel', onEnd);
        window.removeEventListener('blur', forceEnd);
        headEl.removeEventListener('lostpointercapture', onEnd);

        if(boardEl.contains(placeholder)) boardEl.insertBefore(floating, placeholder);
        if(placeholder && placeholder.parentElement) placeholder.remove();
        floating.classList.remove('funnel-col-floating');
        floating.style.left = '';
        floating.style.top = '';
        floating.style.width = '';
        floating.style.height = '';

        const nextOrder = Array.from(boardEl.querySelectorAll('.funnel-col'))
          .map((el) => String(el.dataset.stage || '').trim())
          .filter(Boolean);
        if(nextOrder.length){
          crmConfig.funnel = nextOrder;
          saveCrmConfig();
          renderSettingsForm();
          populateToolbarOptions();
          renderAddLeadTargets();
          renderFunnelsBoard();
        }
      };

      const forceEnd = () => {
        try{
          onEnd({ pointerId });
        }catch(_e){}
      };

      try{ headEl.setPointerCapture(pointerId); }catch(_e){}

      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onEnd);
      window.addEventListener('pointercancel', onEnd);
      window.addEventListener('blur', forceEnd);
      headEl.addEventListener('lostpointercapture', onEnd);
    });
  }

  function renderFunnelsBoard(){
    if(!funnelsBoardEl) return;
    renderFunnelsBoardHeader();
    cleanupFunnelColumnDragArtifacts();
    const allRows = getLeadRows();
    const boardRows = allRows.filter((row) => String(row.board || '') === String(activeFunnelBoardName || ''));
    refreshFunnelsUsersOptions(boardRows);
    const now = Date.now();

    const getPriorityMeta = (row) => {
      const ageMs = Math.max(0, now - Number(row.lastTs || 0));
      const ageMinutes = Math.floor(ageMs / 60000);
      const criticalMinutes = REPLY_SLA_MINUTES;
      const highMinutes = Math.max(2, Math.floor(REPLY_SLA_MINUTES * 0.6));
      const mediumMinutes = Math.max(1, Math.floor(REPLY_SLA_MINUTES * 0.3));
      const unread = row.read === false;
      const hasOpened = Number(row.openedAt || row.lastSeenTs || 0) > 0;
      const waitingCustomerReply = Number(row.lastInboundTs || 0) > Number(row.lastOutboundTs || 0);
      const waitingSinceTs = waitingCustomerReply ? Number(row.lastInboundTs || row.lastTs || 0) : Number(row.lastTs || 0);
      const waitingMinutes = Math.max(0, Math.floor((now - waitingSinceTs) / 60000));
      const slaOverdue = waitingCustomerReply && waitingMinutes >= criticalMinutes;
      let level = 'Bajo';
      let rank = 0;

      if((unread && ageMinutes >= criticalMinutes) || slaOverdue){ level = 'Critico'; rank = 3; }
      else if((unread && ageMinutes >= highMinutes) || (waitingCustomerReply && waitingMinutes >= highMinutes)){ level = 'Alto'; rank = 2; }
      else if(unread || waitingCustomerReply || ageMinutes >= mediumMinutes){ level = 'Medio'; rank = 1; }

      const colorByLevel = {
        Critico: '#dc2626',
        Alto: '#f97316',
        Medio: '#eab308',
        Bajo: '#16a34a'
      };

      const reasonParts = [];
      const lastMessageLabel = formatMessageTimestampForReason(row.lastTs);
      if(unread){
        reasonParts.push('No abierto');
        reasonParts.push('Ultimo mensaje: ' + lastMessageLabel);
      } else if(waitingCustomerReply){
        reasonParts.push(hasOpened ? 'Abierto sin responder' : 'Pendiente respuesta');
        reasonParts.push('Ultimo mensaje: ' + lastMessageLabel);
        if(slaOverdue){
          reasonParts.push('SLA vencido');
        } else {
          reasonParts.push('SLA en tiempo');
        }
      } else {
        reasonParts.push('Al dia');
        reasonParts.push('Ultimo mensaje: ' + lastMessageLabel);
      }

      return {
        level,
        rank,
        color: colorByLevel[level] || '#16a34a',
        reason: reasonParts.join(' | '),
        ageMs,
        unread,
        waitingCustomerReply,
        waitingMinutes,
        slaOverdue
      };
    };

    const priorityScore = (row) => {
      const meta = getPriorityMeta(row);
      const waitingBoost = meta.waitingCustomerReply ? (12 * 60 * 60 * 1000) : 0;
      const overdueBoost = meta.slaOverdue ? (18 * 60 * 60 * 1000) : 0;
      return (meta.rank * 10 * 24 * 60 * 60 * 1000) + (meta.unread ? (24 * 60 * 60 * 1000) : 0) + waitingBoost + overdueBoost + meta.ageMs;
    };
    const filteredRows = applyFunnelsFilters(boardRows)
      .sort((a,b) => priorityScore(b) - priorityScore(a));

    if(funnelsPriorityQueueEl){
      const queueRows = filteredRows.slice(0, 5);
      funnelsPriorityQueueEl.innerHTML = '';

      const label = document.createElement('span');
      label.className = 'funnels-priority-label';
      label.textContent = 'Por atender ahora';
      funnelsPriorityQueueEl.appendChild(label);

      if(!queueRows.length){
        const empty = document.createElement('span');
        empty.className = 'funnels-priority-empty';
        empty.textContent = 'No hay clientes en la vista actual';
        funnelsPriorityQueueEl.appendChild(empty);
      } else {
        queueRows.forEach((row) => {
          const meta = getPriorityMeta(row);
          const pill = document.createElement('button');
          pill.type = 'button';
          pill.className = 'funnels-priority-pill';
          pill.title = meta.reason;
          pill.innerHTML = [
            '<span class="funnels-priority-dot" style="background:' + meta.color + '"></span>',
            '<span>' + escapeHtml(row.name || ('+' + row.phone)) + '</span>',
            '<span>' + escapeHtml(meta.level) + '</span>'
          ].join('');
          pill.addEventListener('click', async () => {
            await openFullChatOverlayByPhone(row.phone, row.name);
          });
          funnelsPriorityQueueEl.appendChild(pill);
        });
      }
    }

    const stages = funnelBoardColumns();

    funnelsBoardEl.innerHTML = '';
    const fragment = document.createDocumentFragment();

    stages.forEach((stageName) => {
      const column = document.createElement('section');
      column.className = 'funnel-col';
      column.dataset.stage = stageName;

      const stageRows = filteredRows.filter((row) => row.funnel === stageName);
      column.innerHTML = [
        '<div class="funnel-col-head">',
        inlineRenameStage === stageName
          ? '<input type="text" class="funnel-col-title-input" data-funnel-inline-rename="1" value="' + escapeHtml(inlineRenameValue || stageName) + '" aria-label="Nuevo nombre de etapa">'
          : '<div class="funnel-col-title">' + escapeHtml(stageName) + '</div>',
        '<div class="funnel-col-head-right">',
        '<div class="funnel-col-count">' + stageRows.length + '</div>',
        '<div class="funnel-col-tools">',
        '<button type="button" class="funnel-col-menu-btn" aria-label="Opciones de etapa" title="Opciones de etapa">⋮</button>',
        '<div class="funnel-col-menu">',
        '<button type="button" class="funnel-col-menu-item" data-action="rename">Cambiar nombre</button>',
        '<button type="button" class="funnel-col-menu-item" data-action="add">Agregar etapa</button>',
        '<button type="button" class="funnel-col-menu-item" data-action="stalled">Marcar lead estancado</button>',
        '</div>',
        '</div>',
        '</div>',
        '</div>',
        '<div class="funnel-col-body"></div>'
      ].join('');

      const headEl = column.querySelector('.funnel-col-head');
      const menuBtn = column.querySelector('.funnel-col-menu-btn');
      const menuEl = column.querySelector('.funnel-col-menu');
      const body = column.querySelector('.funnel-col-body');
      bindFunnelColumnDropzone(column, stageName);

      if(headEl && inlineRenameStage !== stageName){
        headEl.classList.add('drag-handle');
        bindFunnelColumnHeaderDrag(headEl, column, stageName);
      }

      const renameInputEl = column.querySelector('[data-funnel-inline-rename="1"]');
      if(renameInputEl){
        renameInputEl.addEventListener('click', (ev) => ev.stopPropagation());
        renameInputEl.addEventListener('input', () => {
          inlineRenameValue = renameInputEl.value;
        });
        renameInputEl.addEventListener('keydown', (ev) => {
          ev.stopPropagation();
          if(ev.key === 'Enter'){
            ev.preventDefault();
            commitInlineRenameStage(stageName);
          } else if(ev.key === 'Escape'){
            ev.preventDefault();
            cancelInlineRenameStage();
          }
        });
        renameInputEl.addEventListener('blur', () => {
          if(inlineRenameStage === stageName) commitInlineRenameStage(stageName);
        });
      }

      if(menuBtn && menuEl){
        menuBtn.addEventListener('click', (ev) => {
          ev.stopPropagation();
          const isOpen = menuEl.classList.contains('open');
          document.querySelectorAll('.funnel-col-menu.open').forEach((menu) => menu.classList.remove('open'));
          menuEl.classList.toggle('open', !isOpen);
        });
        menuEl.addEventListener('click', async (ev) => {
          ev.stopPropagation();
          const target = ev.target;
          const action = target && target.getAttribute ? target.getAttribute('data-action') : '';
          if(!action) return;

          if(action === 'rename'){
            startInlineRenameStage(stageName);
          } else if(action === 'add'){
            startInlineAddStageAfter(stageName);
          } else if(action === 'stalled'){
            const currentMinutes = getStageStalledMinutes(stageName);
            const ok = await openDirModal('Leads estancados en ' + stageName, (root) => {
              const row = document.createElement('div');
              row.className = 'dir-modal-row';
              row.innerHTML = '<label>Minutos para considerar lead estancado</label><input id="waStageStalledMinutesInput" class="wa-auth-input" type="number" min="1" step="1" value="' + String(currentMinutes) + '">';
              root.appendChild(row);
            });
            if(ok){
              const input = document.getElementById('waStageStalledMinutesInput');
              const minutes = Math.max(1, Math.floor(Number(input && input.value || currentMinutes)));
              if(Number.isFinite(minutes)){
                setStageStalledMinutes(stageName, minutes);
                renderFunnelsBoard();
              }
            }
          }
          menuEl.classList.remove('open');
        });
      }

      if(!body) return;
      if(!stageRows.length){
        const empty = document.createElement('div');
        empty.className = 'funnel-empty';
        empty.textContent = 'Sin clientes en esta etapa';
        body.appendChild(empty);
      } else {
        stageRows.forEach((row) => {
          const card = document.createElement('article');
          card.className = 'funnel-card';
          card.draggable = true;
          card.addEventListener('dragstart', (ev) => {
            if(ev.dataTransfer){
              ev.dataTransfer.setData('text/plain', row.phone);
              ev.dataTransfer.effectAllowed = 'move';
            }
          });
          card.addEventListener('click', async () => {
            await openFullChatOverlayByPhone(row.phone, row.name);
          });

          const lastMessageAt = row.lastTs ? formatChatTime(row.lastTs) : '--:--';
          const avatarSeed = encodeURIComponent(String(row.phone || row.name || 'lead'));
          const rowPriorityMeta = getPriorityMeta(row);
          const priorityColor = rowPriorityMeta.color;
          const priorityLabel = rowPriorityMeta.level;
          const pendingCount = pendingClientCountForChat(row);
          const stalledMinutes = getStageStalledMinutes(stageName);
          const stalledNow = Number(row.lastTs || 0) > 0 && (now - Number(row.lastTs || 0)) >= (stalledMinutes * 60 * 1000);
          const unreadBubbleHtml = pendingCount > 0
            ? '<span class="funnel-unread-count" title="Mensajes pendientes de cliente">' + escapeHtml(pendingCount > 99 ? '99+' : String(pendingCount)) + '</span>'
            : '';
          const stalledBadgeHtml = stalledNow
            ? '<span class="funnel-badge stalled" title="Lead estancado en esta etapa">Estancado</span>'
            : '';
          const priorityBadgeHtml = '<span class="funnel-priority-badge" style="background:' + priorityColor + '">' + escapeHtml(priorityLabel) + '</span>';
          const lastMessageText = String(row.lastText || '').trim() || 'Sin mensaje reciente';
          card.innerHTML = [
            '<div class="funnel-priority-line" style="background:' + priorityColor + '"></div>',
            '<div class="funnel-card-head">',
            '<img class="funnel-avatar" src="https://i.pravatar.cc/64?u=' + avatarSeed + '" alt="Foto de cliente">',
            '<div class="funnel-card-main">',
            '<div class="funnel-card-title">' + escapeHtml(row.name || ('+' + row.phone)) + '</div>',
            '<div class="funnel-card-sub">+' + escapeHtml(row.phone) + '</div>',
            '<div class="funnel-card-reason" title="Ultimo mensaje">' + escapeHtml(lastMessageText) + '</div>',
            '<div class="funnel-card-meta">',
            stalledBadgeHtml,
            priorityBadgeHtml,
            '</div>',
            '</div>',
            unreadBubbleHtml,
            '<div class="funnel-card-time">' + escapeHtml(lastMessageAt) + '</div>',
            '</div>'
          ].join('');
          body.appendChild(card);
        });
      }

      fragment.appendChild(column);

      if(inlineAddAfterStage === stageName){
        const draftColumn = document.createElement('section');
        draftColumn.className = 'funnel-col funnel-col-draft';
        draftColumn.innerHTML = [
          '<div class="funnel-col-head">',
          '<input type="text" class="funnel-col-title-input" data-funnel-inline-add="1" value="' + escapeHtml(inlineAddValue || '') + '" placeholder="Nombre de nueva etapa" aria-label="Nombre de nueva etapa">',
          '<div class="funnel-col-head-right"><div class="funnel-col-count">0</div></div>',
          '</div>',
          '<div class="funnel-col-body"><div class="funnel-empty">Escribe el nombre de la nueva etapa y presiona Enter.</div></div>'
        ].join('');

        const addInputEl = draftColumn.querySelector('[data-funnel-inline-add="1"]');
        if(addInputEl){
          addInputEl.addEventListener('click', (ev) => ev.stopPropagation());
          addInputEl.addEventListener('input', () => {
            inlineAddValue = addInputEl.value;
          });
          addInputEl.addEventListener('keydown', (ev) => {
            ev.stopPropagation();
            if(ev.key === 'Enter'){
              ev.preventDefault();
              commitInlineAddStage();
            } else if(ev.key === 'Escape'){
              ev.preventDefault();
              cancelInlineAddStage();
            }
          });
          addInputEl.addEventListener('blur', () => {
            if(inlineAddAfterStage === stageName) commitInlineAddStage();
          });
        }

        fragment.appendChild(draftColumn);
      }
    });

    funnelsBoardEl.appendChild(fragment);

    document.addEventListener('click', () => {
      document.querySelectorAll('.funnel-col-menu.open').forEach((menu) => menu.classList.remove('open'));
    }, { once: true });
  }

  function resetFunnelsFilters(){
    if(funnelsDateFilterEl) funnelsDateFilterEl.value = '';
    if(funnelsTagSearchEl) funnelsTagSearchEl.value = '';
    if(funnelsUserFilterEl) funnelsUserFilterEl.value = '';
    const msgDefault = document.querySelector('input[name="funnelMsgFilter"][value="all"]');
    if(msgDefault) msgDefault.checked = true;
    const statusDefault = document.querySelector('input[name="funnelStatusFilter"][value="all"]');
    if(statusDefault) statusDefault.checked = true;
    const channelDefault = document.querySelector('input[name="funnelChannelFilter"][value="all"]');
    if(channelDefault) channelDefault.checked = true;
    renderFunnelsBoard();
  }

  async function addLeadFromFunnels(){
    const name = String(addLeadNameEl && addLeadNameEl.value || '').trim();
    if(!name){
      alert('Nombre requerido.');
      if(addLeadNameEl) addLeadNameEl.focus();
      return;
    }

    const prefix = String(addLeadPrefixEl && addLeadPrefixEl.value || '').trim();
    const phoneInput = String(addLeadPhoneEl && addLeadPhoneEl.value || '').trim();
    const phone = phoneKey(prefix + phoneInput);
    if(!isReasonablePhoneDigits(phone)){
      alert('Telefono invalido. Usa entre 8 y 15 digitos.');
      if(addLeadPhoneEl) addLeadPhoneEl.focus();
      return;
    }

    const existingChat = chats.find((chat) => phoneKey(chat.phone || chat.id) === phone);
    const existingImported = localImportedLeads.find((lead) => phoneKey(lead.phone) === phone);
    const selectedBoard = normalizeFunnelBoardName(addLeadTargetEl && addLeadTargetEl.value || activeFunnelBoardName) || activeFunnelBoardName;

    const preferredFunnel = (funnelBoardColumns().find((stage) => String(stage).toLowerCase() !== 'archivados') || 'Cliente nuevo');
    const preferredStatus = (crmConfig.statuses && crmConfig.statuses[0]) ? crmConfig.statuses[0] : 'Pendiente';
    setMeta(phone, {
      funnelBoard: selectedBoard,
      funnel: preferredFunnel,
      status: preferredStatus,
      archived: false,
      deleted: false,
      read: true
    });

    if(existingChat){
      existingChat.name = name;
    } else if(existingImported){
      existingImported.name = name;
    } else {
      localImportedLeads.push({ name, phone });
      const uniq = new Map();
      localImportedLeads.forEach((lead) => {
        const key = phoneKey(lead.phone);
        if(key) uniq.set(key, { name: String(lead.name || '').trim() || 'Importado', phone: key });
      });
      localImportedLeads = Array.from(uniq.values());
    }

    saveLocalImportedLeads();
    setAddLeadPopoverOpen(false);
    if(addLeadNameEl) addLeadNameEl.value = '';
    if(addLeadPhoneEl) addLeadPhoneEl.value = '';
    renderDashboard();
    renderFunnelsStatusList();
    renderFunnelsBoard();
    const activePanel = document.querySelector('.wa-panel.active');
    if(activePanel && activePanel.dataset.panel === 'directory'){
      await buildDirectoryRows();
    }
    alert('Lead agregado correctamente.');
  }

  function csvEscape(v){
    const s = String(v == null ? '' : v);
    if(/[",\n;]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
    return s;
  }

  function escapeHtml(v){
    return String(v == null ? '' : v)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function initialsOf(value){
    const txt = String(value || '').trim();
    if(!txt) return '--';
    const parts = txt.split(/\s+/).filter(Boolean);
    if(parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  }

  function downloadCsv(filename, rows){
    const csv = rows.map((r) => r.map(csvEscape).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  function directoryVisibleRows(){
    return directoryRows.filter((r) => {
      if(r.deleted) return false;
      if(directoryFilter === 'active') return !r.archived;
      if(directoryFilter === 'archived') return !!r.archived;
      return true;
    });
  }

  function updateDirectoryTabs(){
    const allTabs = [dirTabAll, dirTabActive, dirTabArchived];
    allTabs.forEach((tab) => {
      if(!tab) return;
      const isActive = tab.dataset.dirFilter === directoryFilter;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
  }

  function updateDirectorySelectedInfo(){
    if(dirSelectedInfo) dirSelectedInfo.textContent = directorySelected.size + ' leads seleccionados';
    if(dirCheckAll){
      const visible = directoryVisibleRows();
      dirCheckAll.checked = visible.length > 0 && visible.every((r) => directorySelected.has(r.id));
    }
  }

  function renderDirectoryTable(){
    if(!dirTableBody) return;
    updateDirectoryTabs();
    const rows = directoryVisibleRows();
    dirTableBody.innerHTML = '';
    const frag = document.createDocumentFragment();

    rows.forEach((row) => {
      const tr = document.createElement('tr');
      const checked = directorySelected.has(row.id) ? 'checked' : '';
      const estadoClass = row.archived ? 'archived' : 'active';
      const estadoText = row.archived ? 'Archivado' : 'Activo';
      tr.innerHTML = [
        '<td><input type="checkbox" data-dir-check="' + row.id + '" ' + checked + '></td>',
        '<td><span class="dir-badge ' + estadoClass + '">' + estadoText + '</span></td>',
        '<td>' + escapeHtml(row.name || row.phone) + '<span class="dir-sub">+' + escapeHtml(row.phone) + '</span></td>',
        '<td>' + escapeHtml(row.lastText || '-') + '<span class="dir-sub">' + escapeHtml(formatDateTime(row.lastTs)) + '</span></td>',
        '<td>' + escapeHtml(row.firstText || '-') + '<span class="dir-sub">' + escapeHtml(formatDateTime(row.firstTs)) + '</span></td>',
        '<td>' + escapeHtml(row.user || 'No asignado') + '</td>',
        '<td>' + escapeHtml(row.funnel || '-') + '</td>',
        '<td>' + escapeHtml(row.status || '-') + '</td>'
      ].join('');
      frag.appendChild(tr);
    });

    dirTableBody.appendChild(frag);
    updateDirectorySelectedInfo();
  }

  async function getConversationSummary(phone){
    const key = phoneKey(phone);
    if(!key) return { firstText:'', firstTs:0, lastText:'', lastTs:0 };
    if(directoryDetailCache.has(key)) return directoryDetailCache.get(key);

    try{
      const resp = await fetch('/wa/conversation?phone=' + encodeURIComponent(key) + '&limit=1000');
      const data = resp.ok ? await resp.json().catch(() => null) : null;
      const msgs = data && Array.isArray(data.messages) ? data.messages : [];
      msgs.sort((a,b) => Number(a.timestamp || 0) - Number(b.timestamp || 0));
      const first = msgs[0] || {};
      const last = msgs[msgs.length - 1] || {};
      const summary = {
        firstText: String(first.text || first.caption || ''),
        firstTs: normalizeTimestamp(first.timestamp || 0),
        lastText: String(last.text || last.caption || ''),
        lastTs: normalizeTimestamp(last.timestamp || 0)
      };
      directoryDetailCache.set(key, summary);
      return summary;
    }catch(_e){
      const empty = { firstText:'', firstTs:0, lastText:'', lastTs:0 };
      directoryDetailCache.set(key, empty);
      return empty;
    }
  }

  async function buildDirectoryRows(){
    const baseRows = chats
      .filter((c) => !getMeta(c.phone || c.id).deleted)
      .map((c) => {
        const meta = getMeta(c.phone || c.id);
        const phone = phoneKey(c.phone || c.id);
        return {
          id: phone,
          phone,
          name: c.name || 'Sin nombre',
          user: meta.agent || c.assignedTo || 'No asignado',
          funnel: meta.funnel || c.funnel || crmConfig.funnel[0],
          status: meta.status || c.status || crmConfig.statuses[0],
          archived: !!meta.archived,
          deleted: !!meta.deleted,
          labels: Array.isArray(meta.labels) ? meta.labels : [],
          firstText: '',
          firstTs: 0,
          lastText: c.lastText || '',
          lastTs: normalizeTimestamp(c.lastTimestamp || 0)
        };
      });

    const importedRows = localImportedLeads
      .filter((r) => !getMeta(r.phone).deleted)
      .map((r) => {
        const meta = getMeta(r.phone);
        return {
          id: phoneKey(r.phone),
          phone: phoneKey(r.phone),
          name: r.name || 'Importado',
          user: meta.agent || 'No asignado',
          funnel: meta.funnel || crmConfig.funnel[0],
          status: meta.status || crmConfig.statuses[0],
          archived: !!meta.archived,
          deleted: !!meta.deleted,
          labels: Array.isArray(meta.labels) ? meta.labels : [],
          firstText: '',
          firstTs: 0,
          lastText: String(meta.lastMessagePreview || ''),
          lastTs: normalizeTimestamp(meta.lastMessageTs || 0)
        };
      });

    const merged = new Map();
    baseRows.concat(importedRows).forEach((r) => { if(r.id) merged.set(r.id, r); });
    directoryRows = Array.from(merged.values());
    renderDirectoryTable();

    // Hydrate message summaries async
    const tasks = directoryRows.slice(0, 120).map(async (row) => {
      const sum = await getConversationSummary(row.phone);
      row.firstText = sum.firstText || row.firstText;
      row.firstTs = sum.firstTs || row.firstTs;
      row.lastText = row.lastText || sum.lastText;
      row.lastTs = row.lastTs || sum.lastTs;
    });
    await Promise.all(tasks);
    renderDirectoryTable();
  }

  function selectedDirectoryRows(){
    return directoryRows.filter((r) => directorySelected.has(r.id) && !r.deleted);
  }

  function setRowsMeta(rows, patchBuilder){
    rows.forEach((row) => {
      const patch = typeof patchBuilder === 'function' ? patchBuilder(row) : patchBuilder;
      setMeta(row.phone, patch || {});
      Object.assign(row, patch || {});
    });
  }

  function openDirModal(title, bodyBuilder){
    if(!dirModalBackdrop || !dirModalBody || !dirModalTitle || !dirModalConfirmBtn) return Promise.resolve(null);
    dirModalTitle.textContent = title;
    dirModalBody.innerHTML = '';
    bodyBuilder(dirModalBody);
    dirModalBackdrop.classList.add('open');
    return new Promise((resolve) => {
      dirModalResolver = resolve;
    });
  }

  function closeDirModal(result){
    if(dirModalBackdrop) dirModalBackdrop.classList.remove('open');
    if(dirModalResolver){
      const done = dirModalResolver;
      dirModalResolver = null;
      done(result);
    }
  }

  async function bulkAssignUsers(){
    const rows = selectedDirectoryRows();
    if(!rows.length) return;
    const result = await openDirModal('Asignar usuario', (root) => {
      const row = document.createElement('div');
      row.className = 'dir-modal-row';
      row.innerHTML = '<label>Agente</label><select id="dirModalAgent"></select>';
      root.appendChild(row);
      const sel = row.querySelector('#dirModalAgent');
      crmConfig.agents.forEach((a) => { const op = document.createElement('option'); op.value = a; op.textContent = a; sel.appendChild(op); });
    });
    if(!result) return;
    const sel = document.getElementById('dirModalAgent');
    const agent = sel ? sel.value : 'No asignado';
    rows.forEach((row) => {
      addLeadHistory(row.phone, 'Cambio de usuario', agent === 'No asignado' ? 'Se desasigno el lead (accion masiva).' : ('Asignado a ' + agent + ' (accion masiva).'));
    });
    setRowsMeta(rows, { user: agent, assignedTo: agent === 'No asignado' ? null : agent, agent });
    renderDirectoryTable();
  }

  async function bulkMoveFunnelStatus(){
    const rows = selectedDirectoryRows();
    if(!rows.length) return;
    const result = await openDirModal('Mover etapa o estatus', (root) => {
      const a = document.createElement('div');
      a.className = 'dir-modal-row';
      a.innerHTML = '<label>Etapa</label><select id="dirModalFunnel"></select>';
      root.appendChild(a);
      const b = document.createElement('div');
      b.className = 'dir-modal-row';
      b.innerHTML = '<label>Estatus</label><select id="dirModalStatus"></select>';
      root.appendChild(b);
      const sf = a.querySelector('#dirModalFunnel');
      const ss = b.querySelector('#dirModalStatus');
      crmConfig.funnel.forEach((x) => { const op = document.createElement('option'); op.value=x; op.textContent=x; sf.appendChild(op); });
      crmConfig.statuses.forEach((x) => { const op = document.createElement('option'); op.value=x; op.textContent=x; ss.appendChild(op); });
    });
    if(!result) return;
    const sf = document.getElementById('dirModalFunnel');
    const ss = document.getElementById('dirModalStatus');
    const funnel = sf ? sf.value : crmConfig.funnel[0];
    const status = ss ? ss.value : crmConfig.statuses[0];
    rows.forEach((row) => {
      addLeadHistory(row.phone, 'Cambio masivo de etapa/estatus', 'Etapa: ' + funnel + ' | Estatus: ' + status);
    });
    setRowsMeta(rows, (row) => ({ funnel, status, archived: String(funnel).toLowerCase() === 'archivados' }));
    renderDirectoryTable();
  }

  async function bulkAssignTags(){
    const rows = selectedDirectoryRows();
    if(!rows.length) return;
    const result = await openDirModal('Asignar etiquetas', (root) => {
      const row = document.createElement('div');
      row.className = 'dir-modal-row';
      row.innerHTML = '<label>Etiquetas (separadas por coma)</label><textarea id="dirModalTags" rows="4" placeholder="vip, seguimiento, pago pendiente"></textarea>';
      root.appendChild(row);
    });
    if(!result) return;
    const tx = document.getElementById('dirModalTags');
    const tags = String(tx ? tx.value : '').split(',').map((s) => s.trim()).filter(Boolean);
    rows.forEach((row) => {
      addLeadHistory(row.phone, 'Etiquetas', tags.length ? ('Etiquetas: ' + tags.join(', ')) : 'Se limpiaron etiquetas.');
    });
    setRowsMeta(rows, { labels: tags });
    renderDirectoryTable();
  }

  function exportRows(rows, filename){
    const header = ['Estado','Nombre','Telefono','Ultimo mensaje','Fecha ultimo','Primer mensaje','Fecha primero','Usuario','Etapa','Estatus','Etiquetas'];
    const data = rows.map((r) => [
      r.archived ? 'Archivado' : 'Activo',
      r.name,
      '+' + r.phone,
      r.lastText || '',
      formatDateTime(r.lastTs),
      r.firstText || '',
      formatDateTime(r.firstTs),
      r.user || 'No asignado',
      r.funnel || '',
      r.status || '',
      (r.labels || []).join('|')
    ]);
    downloadCsv(filename, [header].concat(data));
  }

  function bulkToggleState(){
    const rows = selectedDirectoryRows();
    if(!rows.length) return;
    rows.forEach((row) => {
      addLeadHistory(row.phone, row.archived ? 'Reactivado' : 'Archivado', 'Cambio de estado masivo desde Directorio.');
    });
    setRowsMeta(rows, (r) => {
      const nextArchived = !r.archived;
      const archivedLabel = crmConfig.funnel.find((f) => String(f).toLowerCase() === 'archivados') || 'Archivados';
      const defaultFunnel = crmConfig.funnel.find((f) => String(f).toLowerCase() !== 'archivados') || 'Cliente nuevo';
      return { archived: nextArchived, funnel: nextArchived ? archivedLabel : defaultFunnel };
    });
    renderDirectoryTable();
  }

  function bulkDelete(){
    const rows = selectedDirectoryRows();
    if(!rows.length) return;

    const confirmDelete = confirm('Estas seguro de eliminar los clientes seleccionados? Esta accion es irreversible.');
    if(!confirmDelete) return;

    const deletingIds = new Set(rows.map((r) => phoneKey(r.phone)));
    rows.forEach((row) => {
      addLeadHistory(row.phone, 'Eliminado', 'Lead eliminado desde Directorio.');
    });
    setRowsMeta(rows, { deleted: true });
    chats = chats.filter((c) => !deletingIds.has(phoneKey(c.phone || c.id)));
    if(selected && deletingIds.has(phoneKey(selected.phone || selected.id))){
      selected = null;
      updateHeader();
      syncToolbarFromSelection();
      updateComposerState();
    }
    directorySelected = new Set();
    renderDirectoryTable();
    renderChats();
  }

  function isReasonablePhoneDigits(digits){
    return /^\d{8,15}$/.test(String(digits || ''));
  }

  function formatDisplayPhone(p){
    const raw = String(p || '').trim();
    if(!raw) return '';
    const digits = raw.replace(/\D+/g, '');
    if(!isReasonablePhoneDigits(digits)) return raw;
    if(/^\d{10}$/.test(digits)) return '+52' + digits;
    return '+' + digits;
  }

  function formatChatTime(ts){
    const n = normalizeTimestamp(ts);
    if(!n) return '';
    try{
      return new Date(n).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }catch(_e){
      return '';
    }
  }

  function formatMinutesAgo(minutes){
    const safeMinutes = Math.max(0, Number(minutes || 0));
    if(safeMinutes < 1) return 'menos de 1 min';
    if(safeMinutes < 60) return safeMinutes + ' min';
    const hours = Math.floor(safeMinutes / 60);
    const mins = safeMinutes % 60;
    if(hours < 24) return hours + ' h' + (mins ? ' ' + mins + ' min' : '');
    const days = Math.floor(hours / 24);
    const remHours = hours % 24;
    return days + ' d' + (remHours ? ' ' + remHours + ' h' : '');
  }

  function formatMessageTimestampForReason(ts){
    const n = normalizeTimestamp(ts);
    if(!n) return '--:--';
    const d = new Date(n);
    const nowDate = new Date();
    const isSameDay = d.getFullYear() === nowDate.getFullYear() && d.getMonth() === nowDate.getMonth() && d.getDate() === nowDate.getDate();
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    if(isSameDay) return 'Hoy ' + hh + ':' + mm;
    const dd = String(d.getDate()).padStart(2, '0');
    const mon = String(d.getMonth() + 1).padStart(2, '0');
    return dd + '/' + mon + ' ' + hh + ':' + mm;
  }

  function splitTags(raw){
    return String(raw || '')
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  function normalizeTagLabel(raw){
    return String(raw || '').replace(/\s+/g, ' ').trim();
  }

  function uniqueTags(tags){
    const out = [];
    const seen = new Set();
    (Array.isArray(tags) ? tags : []).forEach((tag) => {
      const label = normalizeTagLabel(tag);
      if(!label) return;
      const key = label.toLowerCase();
      if(seen.has(key)) return;
      seen.add(key);
      out.push(label);
    });
    return out;
  }

  function renderTagsChips(){
    if(!attrTagsChipsEl) return;
    attrTagsChipsEl.innerHTML = '';
    const frag = document.createDocumentFragment();
    uniqueTags(selectedTagsDraft).forEach((tag) => {
      const chip = document.createElement('span');
      chip.className = 'wa-tag-chip';
      chip.textContent = tag;

      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'wa-tag-remove';
      remove.textContent = 'x';
      remove.setAttribute('aria-label', 'Quitar tag ' + tag);
      remove.disabled = !selected || !!(attrTagsEl && attrTagsEl.disabled);
      remove.addEventListener('click', () => {
        selectedTagsDraft = uniqueTags(selectedTagsDraft).filter((it) => it.toLowerCase() !== tag.toLowerCase());
        renderTagsChips();
        saveSelectedAttributes({ syncServer: true, trackHistory: true, refreshUi: false });
      });

      chip.appendChild(remove);
      frag.appendChild(chip);
    });
    attrTagsChipsEl.appendChild(frag);
  }

  function addTagFromInput(){
    if(!attrTagsEl) return;
    const raw = normalizeTagLabel(attrTagsEl.value);
    if(!raw) return;
    selectedTagsDraft = uniqueTags(selectedTagsDraft.concat([raw]));
    attrTagsEl.value = '';
    renderTagsChips();
    saveSelectedAttributes({ syncServer: true, trackHistory: true, refreshUi: false });
  }

  function getSelectedClientMeta(){
    if(!selected) return null;
    const meta = getMeta(selected.phone);
    return {
      name: String(selected.name || '').trim(),
      phone: formatDisplayPhone(selected.phone || ''),
      email: String(selected.email || '').trim(),
      company: String(selected.company || '').trim(),
      tags: Array.isArray(selected.tags) ? selected.tags : splitTags(selected.tags),
      notes: Array.isArray(meta.notes) ? meta.notes : [],
      scheduledMessages: Array.isArray(meta.scheduledMessages) ? meta.scheduledMessages : [],
      pinnedMessages: Array.isArray(meta.pinnedMessages) ? meta.pinnedMessages : []
    };
  }

  function renderSimpleList(listEl, items, emptyText){
    if(!listEl) return;
    const values = Array.isArray(items) ? items : [];
    listEl.innerHTML = '';
    if(!values.length){
      listEl.innerHTML = '<li class="wa-list-empty">' + escapeHtml(emptyText) + '</li>';
      return;
    }
    const frag = document.createDocumentFragment();
    values.forEach((value) => {
      const li = document.createElement('li');
      li.className = 'wa-list-item';
      li.textContent = String(value || '');
      frag.appendChild(li);
    });
    listEl.appendChild(frag);
  }

  function setRightPanelDisabled(disabled){
    [
      attrNameEl, attrEmailEl, attrCompanyEl, attrTagsEl,
      quickAddBtn, quickRepliesBtn, scheduleEventBtn, scheduleMessageBtn, sendAudioBtn
    ].forEach((el) => {
      if(!el) return;
      el.disabled = !!disabled;
    });
    if(attrTagsChipsEl){
      Array.from(attrTagsChipsEl.querySelectorAll('.wa-tag-remove')).forEach((btn) => {
        btn.disabled = !!disabled;
      });
    }
  }

  function setRightTab(tabName){
    const next = String(tabName || 'attributes').trim() || 'attributes';
    activeRightTab = next;
    rightTabButtons.forEach((btn) => {
      const isActive = btn.getAttribute('data-right-tab') === next;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
    rightTabPanes.forEach((pane) => {
      const isActive = pane.getAttribute('data-right-pane') === next;
      pane.classList.toggle('active', isActive);
    });
  }

  function renderClientRightPanel(){
    const data = getSelectedClientMeta();
    const activeEl = document.activeElement;
    const editingName = !!(attrNameEl && activeEl === attrNameEl);
    const editingEmail = !!(attrEmailEl && activeEl === attrEmailEl);
    const editingCompany = !!(attrCompanyEl && activeEl === attrCompanyEl);
    const editingTags = !!(attrTagsEl && activeEl === attrTagsEl);

    if(!data){
      if(attrNameEl && !editingName) attrNameEl.value = '';
      if(attrPhoneEl) attrPhoneEl.value = '';
      if(attrEmailEl && !editingEmail) attrEmailEl.value = '';
      if(attrCompanyEl && !editingCompany) attrCompanyEl.value = '';
      if(!editingTags){
        selectedTagsDraft = [];
        if(attrTagsEl) attrTagsEl.value = '';
      }
      renderTagsChips();
      renderSimpleList(notesListEl, [], 'Sin notas.');
      renderSimpleList(scheduledListEl, [], 'Sin mensajes programados.');
      renderSimpleList(pinnedListEl, [], 'Sin mensajes destacados.');
      setRightPanelDisabled(true);
      return;
    }

    if(attrNameEl && !editingName) attrNameEl.value = data.name;
    if(attrPhoneEl) attrPhoneEl.value = data.phone;
    if(attrEmailEl && !editingEmail) attrEmailEl.value = data.email;
    if(attrCompanyEl && !editingCompany) attrCompanyEl.value = data.company;
    if(!editingTags){
      selectedTagsDraft = uniqueTags(data.tags);
      if(attrTagsEl) attrTagsEl.value = '';
    }
    renderTagsChips();
    renderSimpleList(notesListEl, data.notes, 'Sin notas.');
    renderSimpleList(scheduledListEl, data.scheduledMessages, 'Sin mensajes programados.');
    renderSimpleList(pinnedListEl, data.pinnedMessages, 'Sin mensajes destacados.');
    setRightPanelDisabled(false);
  }

  function syncSelectedHeaderName(name){
    if(!selected) return;
    const display = String(name || '').trim();
    if(nameEl){
      nameEl.textContent = display || formatDisplayPhone(selected.phone || '');
    }
    if(avatarEl){
      avatarEl.textContent = (display || selected.phone || '--').slice(0, 2).toUpperCase();
    }
  }

  function buildSelectedAttributesPatch(){
    return {
      name: String(attrNameEl && attrNameEl.value || '').trim(),
      email: String(attrEmailEl && attrEmailEl.value || '').trim(),
      company: String(attrCompanyEl && attrCompanyEl.value || '').trim(),
      tags: uniqueTags(selectedTagsDraft)
    };
  }

  async function persistSelectedAttributesToServer(phone, patch){
    const key = phoneKey(phone);
    if(!key) return;
    await fetch('/wa/client-attributes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: key,
        name: String(patch && patch.name || '').trim(),
        email: String(patch && patch.email || '').trim(),
        company: String(patch && patch.company || '').trim(),
        tags: Array.isArray(patch && patch.tags) ? patch.tags : []
      })
    });
  }

  async function flushSelectedAttributesQueue(){
    if(selectedAttributesSaveInFlight) return;
    selectedAttributesSaveInFlight = true;
    while(selectedAttributesQueued){
      const next = selectedAttributesQueued;
      selectedAttributesQueued = null;
      try{
        await persistSelectedAttributesToServer(next.phone, next.patch);
      }catch(e){
        console.warn('persistSelectedAttributesToServer', e);
      }
    }
    selectedAttributesSaveInFlight = false;
  }

  function queueSelectedAttributesServerSave(phone, patch){
    selectedAttributesQueued = {
      phone: phoneKey(phone),
      patch: Object.assign({}, patch || {})
    };
    flushSelectedAttributesQueue();
  }

  function saveSelectedAttributes(options){
    if(!selected) return;
    const opts = Object.assign({ syncServer: true, trackHistory: true, refreshUi: true }, options || {});
    const patch = buildSelectedAttributesPatch();
    const phone = phoneKey(selected.phone);
    const sig = JSON.stringify({
      p: phone,
      n: patch.name,
      e: patch.email,
      c: patch.company,
      t: patch.tags
    });
    if(sig === lastSelectedAttributesSig) return;
    lastSelectedAttributesSig = sig;
    setMeta(selected.phone, patch);
    if(opts.trackHistory){
      addLeadHistory(selected.phone, 'Actualizacion de ficha', 'Se editaron atributos del lead.');
    }
    selected.name = patch.name;
    selected.email = patch.email;
    selected.company = patch.company;
    selected.tags = patch.tags.slice();
    if(opts.refreshUi){
      updateHeader();
      renderChats();
      renderFunnelsBoard();
    } else {
      syncSelectedHeaderName(patch.name);
    }

    if(opts.syncServer){
      queueSelectedAttributesServerSave(selected.phone, patch);
    }
  }

  function scheduleSelectedAttributesAutosave(){
    if(selectedAttributesSaveTimer){
      clearTimeout(selectedAttributesSaveTimer);
    }
    selectedAttributesSaveTimer = setTimeout(() => {
      selectedAttributesSaveTimer = null;
      saveSelectedAttributes({ syncServer: true, trackHistory: false, refreshUi: false });
    }, 700);
  }

  function appendItemToSelected(type, text){
    if(!selected) return;
    const meta = getMeta(selected.phone);
    const key = type === 'notes' ? 'notes' : (type === 'scheduled' ? 'scheduledMessages' : 'pinnedMessages');
    const current = Array.isArray(meta[key]) ? meta[key].slice() : [];
    current.unshift(String(text || '').trim());
    setMeta(selected.phone, { [key]: current });
    const label = key === 'notes' ? 'nota' : (key === 'scheduledMessages' ? 'mensaje programado' : 'mensaje destacado');
    addLeadHistory(selected.phone, 'Actualizacion CRM', 'Se agrego ' + label + '.');
    renderClientRightPanel();
  }

  function resolveQuickAddType(){
    if(activeRightTab === 'notes') return 'notes';
    if(activeRightTab === 'messages') return 'pinned';
    return 'notes';
  }

  function doQuickAdd(){
    if(!selected){
      alert('Selecciona un cliente primero.');
      return;
    }
    const type = resolveQuickAddType();
    const label = type === 'notes' ? 'nota' : (type === 'scheduled' ? 'mensaje programado' : 'mensaje destacado');
    const text = prompt('Escribe el ' + label + ':', '');
    if(text == null) return;
    const trimmed = String(text || '').trim();
    if(!trimmed) return;
    appendItemToSelected(type, trimmed);
  }

  function setComposerMoreMenuOpen(open){
    const isOpen = !!open;
    if(composerMoreMenuEl){
      composerMoreMenuEl.classList.toggle('open', isOpen);
      composerMoreMenuEl.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    }
  }

  function insertTextInComposer(text){
    if(!msgInput) return;
    const value = msgInput.value || '';
    const next = value ? (value + '\n' + text) : text;
    msgInput.value = next;
    msgInput.focus();
  }

  function promptQuickReply(){
    const options = (Array.isArray(quickReplies) && quickReplies.length) ? quickReplies.slice(0, 9) : DEFAULT_QUICK_REPLIES.slice();
    const lines = options.map((item, i) => String(i + 1) + ') /' + String(item && item.code || '') + ' - ' + String(item && item.text || '')).join('\n');
    const selected = prompt(
      'Respuesta rapida:\n' + lines + '\n\nEscribe 1-' + String(options.length) + ' o escribe tu propia respuesta:',
      '1'
    );
    if(selected == null) return;
    const trimmed = String(selected || '').trim();
    const idx = Number(trimmed);
    if(Number.isInteger(idx) && idx >= 1 && idx <= options.length){
      insertTextInComposer(String(options[idx - 1] && options[idx - 1].text || ''));
      return;
    }
    if(trimmed) insertTextInComposer(trimmed);
  }

  function promptScheduleEvent(){
    if(!selected){
      alert('Selecciona un cliente primero.');
      return;
    }
    const text = prompt('Detalles del evento (fecha, hora, lugar):', 'Evento ' + new Date().toLocaleString());
    if(text == null) return;
    const trimmed = String(text || '').trim();
    if(!trimmed) return;
    appendItemToSelected('scheduled', '[Evento] ' + trimmed);
  }

  function promptScheduleMessage(){
    if(!selected){
      alert('Selecciona un cliente primero.');
      return;
    }
    const text = prompt('Mensaje a programar:', 'Te contacto en unos minutos.');
    if(text == null) return;
    const trimmed = String(text || '').trim();
    if(!trimmed) return;
    appendItemToSelected('scheduled', '[Programado] ' + trimmed);
  }

  function triggerUploadAnyFile(){
    if(uploadAnyFileInputEl) uploadAnyFileInputEl.click();
  }

  function promptSendLocation(){
    const text = prompt('Pega la ubicacion o enlace de mapa:', 'https://maps.google.com/?q=');
    if(text == null) return;
    const trimmed = String(text || '').trim();
    if(!trimmed) return;
    insertTextInComposer('[Ubicacion] ' + trimmed);
  }

  function notifySendAudio(){
    alert('Funcion de audio lista para integrar. Puedes conectar aqui la captura/subida de audio.');
  }

  function runComposerMenuAction(action){
    if(action === 'add-note'){
      if(!selected){
        alert('Selecciona un cliente primero.');
      } else {
        const text = prompt('Escribe la nota:', '');
        if(text != null && String(text || '').trim()) appendItemToSelected('notes', text);
      }
    } else if(action === 'schedule-event'){
      promptScheduleEvent();
    } else if(action === 'upload-file'){
      triggerUploadAnyFile();
    } else if(action === 'send-location'){
      promptSendLocation();
    } else if(action === 'quick-replies'){
      promptQuickReply();
    } else if(action === 'schedule-message'){
      promptScheduleMessage();
    }
  }

  function insertEmojiInComposer(){
    if(!msgInput) return;
    const value = msgInput.value || '';
    const emoji = '🙂';
    const start = typeof msgInput.selectionStart === 'number' ? msgInput.selectionStart : value.length;
    const end = typeof msgInput.selectionEnd === 'number' ? msgInput.selectionEnd : value.length;
    msgInput.value = value.slice(0, start) + emoji + value.slice(end);
    msgInput.focus();
    const nextPos = start + emoji.length;
    msgInput.setSelectionRange(nextPos, nextPos);
  }

  function renderSelectOptions(selectEl, options, selectedValue){
    if(!selectEl) return;
    selectEl.innerHTML = '';
    (options || []).forEach((opt) => {
      const option = document.createElement('option');
      option.value = opt;
      option.textContent = opt;
      if(String(opt) === String(selectedValue || '')) option.selected = true;
      selectEl.appendChild(option);
    });
  }

  function renderSettingsForm(){
    ensureSettingsDraft();
    renderCatalogTable();
    renderFunnelsSettings();
    if(demoClientsEnabledEl) demoClientsEnabledEl.checked = isDemoClientsEnabled();
    if(demoEverythingEnabledEl) demoEverythingEnabledEl.checked = isDemoEverythingEnabled();
    renderQuickRepliesSettings();
    renderUsersTable();
  }

  function renderFunnelsSettings(){
    if(!primaryFunnelBoardListEl) return;
    primaryFunnelBoardListEl.innerHTML = '';
    const options = Array.isArray(funnelBoards) ? funnelBoards.slice() : [];
    if(!options.length){
      primaryFunnelBoardListEl.innerHTML = '<div class="wa-settings-list-empty">No hay embudos creados.</div>';
      return;
    }
    const activePrimary = String(draftPrimaryFunnelBoardName || primaryFunnelBoardName || options[0]);
    const frag = document.createDocumentFragment();
    options.forEach((name) => {
      const row = document.createElement('label');
      row.className = 'wa-settings-list-row';
      row.innerHTML = [
        '<span class="wa-settings-list-name">' + escapeHtml(name) + '</span>',
        '<input type="checkbox" data-primary-board="' + escapeHtml(name) + '" ' + (name === activePrimary ? 'checked' : '') + '>'
      ].join('');
      const input = row.querySelector('input[data-primary-board]');
      if(input){
        input.addEventListener('change', () => {
          draftPrimaryFunnelBoardName = name;
          markSettingsDirty();
          renderFunnelsSettings();
        });
      }
      frag.appendChild(row);
    });
    primaryFunnelBoardListEl.appendChild(frag);
  }

  function setSettingsTab(tabName){
    const next = ['crm','funnels','users','replies'].includes(String(tabName || '')) ? String(tabName) : 'crm';
    if(next === 'users' && !currentUserIsAdmin){
      setAuthError('Necesitas permisos de administrador para gestionar usuarios.');
      setAuthBackdropOpen(true);
      return;
    }
    activeSettingsTab = next;
    settingsTabButtons.forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-settings-tab') === next);
    });
    if(settingsPaneCrmEl) settingsPaneCrmEl.classList.toggle('active', next === 'crm');
    if(settingsPaneFunnelsEl) settingsPaneFunnelsEl.classList.toggle('active', next === 'funnels');
    if(settingsPaneUsersEl) settingsPaneUsersEl.classList.toggle('active', next === 'users');
    if(settingsPaneRepliesEl) settingsPaneRepliesEl.classList.toggle('active', next === 'replies');
    if(next === 'users') fetchFirebaseUsers();
  }

  function removeAgentUser(name){
    if(!currentUserIsAdmin) return;
    const target = String(name || '').trim();
    if(!target) return;
    delete agentEmailMap[target];
    saveAgentEmailMap();
    crmConfig.agents = ['No asignado'].concat(
      crmConfig.agents.filter((item) => String(item || '').trim().toLowerCase() !== target.toLowerCase() && String(item || '').toLowerCase() !== 'no asignado')
    );
    saveCrmConfig();
    renderSettingsForm();
    populateToolbarOptions();
    renderDashboard();
    renderAnalytics();
    fetchFirebaseUsers();
  }

  function addAgentUser(email){
    if(!currentUserIsAdmin) return;
    showUsersMessage('');
    const safeEmail = normalizeEmail(email);
    if(!isLikelyEmail(safeEmail)){
      showUsersMessage('Ingresa un correo valido para registrar al agente.');
      return;
    }
    const target = resolveAgentNameFromEmail(safeEmail);
    if(!target){
      showUsersMessage('No se pudo resolver el nombre del agente desde el correo.');
      return;
    }
    const exists = crmConfig.agents.some((item) => String(item || '').trim().toLowerCase() === target.toLowerCase());
    if(exists) return;
    agentEmailMap[target] = safeEmail;
    saveAgentEmailMap();
    crmConfig.agents = crmConfig.agents.concat([target]);
    saveCrmConfig();
    renderSettingsForm();
    populateToolbarOptions();
    renderDashboard();
    renderAnalytics();
    fetchFirebaseUsers();
    showUsersMessage('Agente registrado desde correo: ' + safeEmail);
  }

  function renderUsersTable(){
    if(!usersTableBodyEl) return;
    usersTableBodyEl.innerHTML = '';
    if(addUserBtnEl) addUserBtnEl.disabled = !currentUserIsAdmin;
    if(userNameInputEl) userNameInputEl.disabled = !currentUserIsAdmin;

    if(!currentUserIsAdmin){
      const tr = document.createElement('tr');
      tr.innerHTML = '<td colspan="3" style="color:#64748b;padding:10px;">Solo administradores pueden agregar o quitar usuarios.</td>';
      usersTableBodyEl.appendChild(tr);
      return;
    }

    const firebaseByDisplayName = new Map();
    const firebaseByEmailPrefix = new Map();
    firebaseAuthUsers.forEach((u) => {
      const display = String(u && u.displayName || '').trim().toLowerCase();
      const email = String(u && u.email || '').trim().toLowerCase();
      const prefix = email.split('@')[0] || '';
      if(display && !firebaseByDisplayName.has(display)) firebaseByDisplayName.set(display, u);
      if(prefix && !firebaseByEmailPrefix.has(prefix)) firebaseByEmailPrefix.set(prefix, u);
    });

    const users = crmConfig.agents.filter((name) => String(name || '').toLowerCase() !== 'no asignado');
    let renderedRows = 0;
    const frag = document.createDocumentFragment();
    users.forEach((userName) => {
      const tr = document.createElement('tr');
      const tdName = document.createElement('td');
      tdName.textContent = userName;
      const tdEmail = document.createElement('td');
      const key = String(userName || '').trim().toLowerCase();
      const mappedEmail = normalizeEmail(agentEmailMap[userName]);
      const match = (mappedEmail && firebaseAuthUsers.find((u) => normalizeEmail(u && u.email) === mappedEmail)) || firebaseByDisplayName.get(key) || firebaseByEmailPrefix.get(key.replace(/\s+/g, '')) || null;
      tdEmail.textContent = match && match.email ? match.email : '-';
      const tdAction = document.createElement('td');
      const permsBtn = document.createElement('button');
      permsBtn.className = 'wa-pill-btn';
      permsBtn.type = 'button';
      permsBtn.style.background = '#0f766e';
      permsBtn.textContent = 'Permisos';
      const identityKey = match && match.email
        ? normalizeIdentityKey(match.email, 'email')
        : normalizeIdentityKey(userName, 'name');
      permsBtn.addEventListener('click', () => openPermissionsEditor(identityKey, userName));
      const btn = document.createElement('button');
      btn.className = 'wa-pill-btn';
      btn.type = 'button';
      btn.style.background = '#ef4444';
      btn.textContent = 'Quitar';
      btn.addEventListener('click', () => removeAgentUser(userName));
      tdAction.appendChild(permsBtn);
      tdAction.appendChild(btn);
      tr.appendChild(tdName);
      tr.appendChild(tdEmail);
      tr.appendChild(tdAction);
      frag.appendChild(tr);
      renderedRows += 1;
    });

    const knownEmails = new Set(users.map((name) => {
      const key = String(name || '').trim().toLowerCase();
      const match = firebaseByDisplayName.get(key) || firebaseByEmailPrefix.get(key.replace(/\s+/g, '')) || null;
      return String(match && match.email || '').trim().toLowerCase();
    }).filter(Boolean));

    firebaseAuthUsers.forEach((u) => {
      const email = String(u && u.email || '').trim();
      if(!email || knownEmails.has(email.toLowerCase())) return;
      const tr = document.createElement('tr');
      const tdName = document.createElement('td');
      tdName.textContent = String(u.displayName || '(sin nombre)');
      const tdEmail = document.createElement('td');
      tdEmail.textContent = email;
      const tdAction = document.createElement('td');
      const permsBtn = document.createElement('button');
      permsBtn.className = 'wa-pill-btn';
      permsBtn.type = 'button';
      permsBtn.style.background = '#0f766e';
      permsBtn.textContent = 'Permisos';
      permsBtn.addEventListener('click', () => openPermissionsEditor(normalizeIdentityKey(email, 'email'), email));
      const addBtn = document.createElement('button');
      addBtn.className = 'wa-pill-btn';
      addBtn.type = 'button';
      addBtn.style.background = '#2563eb';
      addBtn.textContent = 'Registrar';
      addBtn.addEventListener('click', () => addAgentUser(email));
      tdAction.appendChild(permsBtn);
      tdAction.appendChild(addBtn);
      tr.appendChild(tdName);
      tr.appendChild(tdEmail);
      tr.appendChild(tdAction);
      frag.appendChild(tr);
      renderedRows += 1;
    });

    if(!renderedRows){
      const tr = document.createElement('tr');
      tr.innerHTML = '<td colspan="3" style="color:#64748b;padding:10px;">Sin usuarios configurados.</td>';
      frag.appendChild(tr);
    }
    usersTableBodyEl.appendChild(frag);
  }

  async function fetchFirebaseUsers(){
    if(!currentUserIsAdmin || !window.auth || !window.auth.currentUser){
      firebaseAuthUsers = [];
      renderUsersTable();
      return;
    }
    try{
      const token = await window.auth.currentUser.getIdToken(true);
      const resp = await fetch('/admin/firebase-users', {
        headers: { Authorization: 'Bearer ' + token }
      });
      const data = await resp.json().catch(() => null);
      if(!resp.ok){
        firebaseAuthUsers = [];
        renderUsersTable();
        return;
      }
      firebaseAuthUsers = Array.isArray(data && data.users) ? data.users : [];
    }catch(_e){
      firebaseAuthUsers = [];
    }
    renderUsersTable();
  }

  function setAuthError(message){
    if(authErrorEl) authErrorEl.textContent = String(message || '');
  }

  function setAuthBackdropOpen(open){
    const isOpen = !!open;
    if(authBackdropEl){
      authBackdropEl.classList.toggle('open', isOpen);
      authBackdropEl.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    }
  }

  function updateAuthStatusText(){
    const authUser = window.auth && window.auth.currentUser ? window.auth.currentUser : null;
    const role = currentUserIsAdmin ? 'admin' : 'usuario';
    const label = authUser ? ('Estado de sesion: ' + String(authUser.email || authUser.uid || 'Autenticado') + ' (' + role + ')') : 'Estado de sesion: sin autenticar';
    if(authStatusEl) authStatusEl.textContent = label;

    const usersTabBtn = settingsTabButtons.find((btn) => btn.getAttribute('data-settings-tab') === 'users');
    if(usersTabBtn){
      usersTabBtn.disabled = !currentUserIsAdmin;
      usersTabBtn.title = currentUserIsAdmin ? 'Gestion de usuarios' : 'Solo admin';
      usersTabBtn.style.opacity = currentUserIsAdmin ? '1' : '.55';
      usersTabBtn.style.cursor = currentUserIsAdmin ? 'pointer' : 'not-allowed';
    }
  }

  async function doEmailLogin(){
    if(!window.auth || !authEmailEl || !authPasswordEl) return;
    const email = String(authEmailEl.value || '').trim();
    const pass = String(authPasswordEl.value || '').trim();
    if(!email || !pass){
      setAuthError('Correo y contrasena son obligatorios.');
      return;
    }
    setAuthError('');
    try{
      const cred = await window.auth.signInWithEmailAndPassword(email, pass);
      const authUser = cred && cred.user ? cred.user : (window.auth.currentUser || null);
      const tokenResult = authUser ? await authUser.getIdTokenResult(true) : null;
      currentUserIsAdmin = !!(tokenResult && tokenResult.claims && (tokenResult.claims.admin === true || tokenResult.claims.role === 'admin'));
      const display = String(authUser && (authUser.displayName || authUser.email || authUser.uid) || '').trim();
      if(display){
        try{ localStorage.setItem('waCurrentUserName', display.split('@')[0]); }catch(_e){}
      }
      updateAuthStatusText();
      renderUsersTable();
      fetchFirebaseUsers();
      setAuthBackdropOpen(false);
      renderDashboard();
      renderAnalytics();
    }catch(err){
      const code = String(err && err.code || '').trim();
      if(code === 'auth/operation-not-allowed'){
        setAuthError('Email/Contrasena esta desactivado en Firebase. Activalo en Authentication > Sign-in method.');
      } else if(code === 'auth/wrong-password' || code === 'auth/invalid-credential'){
        setAuthError('Correo o contrasena incorrectos.');
      } else if(code === 'auth/user-not-found'){
        setAuthError('No existe una cuenta con ese correo.');
      } else if(code === 'auth/too-many-requests'){
        setAuthError('Demasiados intentos. Espera unos minutos e intenta de nuevo.');
      } else {
        setAuthError(err && err.message ? err.message : 'No se pudo iniciar sesion.');
      }
    }
  }

  async function doLogout(){
    if(!window.auth) return;
    try{
      await window.auth.signOut();
      currentUserIsAdmin = false;
      firebaseAuthUsers = [];
      updateAuthStatusText();
      renderUsersTable();
      setAuthBackdropOpen(true);
    }catch(err){
      setAuthError(err && err.message ? err.message : 'No se pudo cerrar sesion.');
    }
  }

  function bindFirebaseAuthUi(){
    if(!window.auth || typeof window.auth.onAuthStateChanged !== 'function') return;
    window.auth.onAuthStateChanged(async (user) => {
      try{
        const tokenResult = user ? await user.getIdTokenResult(true) : null;
        currentUserIsAdmin = !!(tokenResult && tokenResult.claims && (tokenResult.claims.admin === true || tokenResult.claims.role === 'admin'));
      }catch(_e){
        currentUserIsAdmin = false;
      }
      updateAuthStatusText();
      renderUsersTable();
      applyModulePermissionsToRail();
      if(user){
        const label = String(user.displayName || user.email || user.uid || '').trim();
        if(label){
          try{ localStorage.setItem('waCurrentUserName', label.split('@')[0]); }catch(_e){}
        }
        setAuthBackdropOpen(false);
        fetchFirebaseUsers();
      } else {
        firebaseAuthUsers = [];
        setAuthBackdropOpen(true);
      }
    });
  }

  function populateToolbarOptions(){
    renderSelectOptions(funnelSelectEl, crmConfig.funnel, crmConfig.funnel[0]);
    renderSelectOptions(agentSelectEl, crmConfig.agents, 'No asignado');
    renderSelectOptions(statusSelectEl, crmConfig.statuses, crmConfig.statuses[0]);
    syncToolbarFromSelection();
  }

  function syncToolbarFromSelection(){
    const fallbackFunnel = crmConfig.funnel[0] || 'Cliente nuevo';
    const fallbackStatus = crmConfig.statuses[0] || 'Pendiente';
    const fallbackAgent = 'No asignado';

    if(!selected){
      if(funnelSelectEl){ funnelSelectEl.value = fallbackFunnel; funnelSelectEl.disabled = true; }
      if(agentSelectEl){ agentSelectEl.value = fallbackAgent; agentSelectEl.disabled = true; }
      if(statusSelectEl){ statusSelectEl.value = fallbackStatus; statusSelectEl.disabled = true; }
      if(archiveBtn) archiveBtn.disabled = true;
      if(closeWonBtn) closeWonBtn.disabled = true;
      if(closeWonBtn){
        closeWonBtn.classList.remove('success');
        closeWonBtn.setAttribute('aria-pressed', 'false');
      }
      if(archiveBtn){
        archiveBtn.classList.remove('danger');
        archiveBtn.setAttribute('aria-pressed', 'false');
        archiveBtn.title = 'Archivar';
        archiveBtn.setAttribute('aria-label', 'Archivar');
      }
      return;
    }

    const meta = getMeta(selected.phone);
    const selectedFunnel = meta.funnel || selected.funnel || fallbackFunnel;
    const selectedStatus = meta.status || selected.status || fallbackStatus;
    const selectedAgent = meta.agent || selected.assignedTo || fallbackAgent;

    if(funnelSelectEl){ funnelSelectEl.disabled = false; funnelSelectEl.value = crmConfig.funnel.includes(selectedFunnel) ? selectedFunnel : fallbackFunnel; }
    if(agentSelectEl){ agentSelectEl.disabled = false; agentSelectEl.value = crmConfig.agents.includes(selectedAgent) ? selectedAgent : fallbackAgent; }
    if(statusSelectEl){ statusSelectEl.disabled = false; statusSelectEl.value = crmConfig.statuses.includes(selectedStatus) ? selectedStatus : fallbackStatus; }
    if(archiveBtn){
      archiveBtn.disabled = false;
      archiveBtn.classList.toggle('danger', !!selected.archived);
      archiveBtn.setAttribute('aria-pressed', selected.archived ? 'true' : 'false');
      const label = selected.archived ? 'Volver a activar' : 'Archivar';
      archiveBtn.title = label;
      archiveBtn.setAttribute('aria-label', label);
    }
    const isInCloseStage = String(selectedFunnel || '').toLowerCase().includes('cierre');
    if(closeWonBtn){
      closeWonBtn.disabled = false;
      closeWonBtn.classList.toggle('success', isInCloseStage);
      closeWonBtn.setAttribute('aria-pressed', isInCloseStage ? 'true' : 'false');
    }
  }

  function setActiveModule(moduleName){
    if(moduleName === 'multimedia'){
      setMultimediaOpen(true);
      return;
    }
    if(fullChatOverlayOpen && moduleName !== 'chats'){
      closeFullChatOverlay(false);
    }
    const activeBtnNow = railButtons.find((btn) => btn.classList.contains('active'));
    const currentModuleNow = activeBtnNow ? (activeBtnNow.dataset.module || '') : '';
    if(currentModuleNow === 'settings' && moduleName !== 'settings'){
      if(!confirmDiscardUnsavedSettings()) return;
      resetSettingsDraftFromSaved();
    }
    if(!hasModuleAccess(moduleName)){
      const fallback = moduleList().find((m) => hasModuleAccess(m));
      if(!fallback) return;
      moduleName = fallback;
    }
    railButtons.forEach((btn) => {
      const isActive = btn.dataset.module === moduleName;
      btn.classList.toggle('active', isActive);
    });
    panels.forEach((panel) => {
      panel.classList.toggle('active', panel.dataset.panel === moduleName);
    });
    if(moduleTitleEl){
      moduleTitleEl.textContent = moduleTitles[moduleName] || moduleTitles.chats;
    }
    setTopbarByModule(moduleName);
    if(moduleName === 'directory'){
      buildDirectoryRows();
    }
    if(moduleName === 'funnels'){
      renderFunnelsStatusList();
      renderFunnelsBoard();
    }
    if(moduleName === 'analytics'){
      renderAnalytics();
    }
    if(moduleName === 'chats'){
      updateHeader();
      syncToolbarFromSelection();
    }
  }

  function bindRail(){
    railButtons.forEach((btn) => {
      btn.addEventListener('click', () => setActiveModule(btn.dataset.module || 'chats'));
    });
    if(railToggleBtn){
      railToggleBtn.addEventListener('click', () => {
        const expandedNow = railEl && railEl.classList.contains('expanded');
        setRailExpanded(!expandedNow);
      });
    }
  }

  function dedupeConversations(list){
    const map = new Map();
    (list||[]).forEach((raw)=>{
      try{
        const phoneRaw = String((raw && (raw.phone||raw.phoneNumber||raw.id)) || '');
        const digits = (phoneRaw||'').replace(/\D+/g,'');
        if(!isReasonablePhoneDigits(digits)) return;
        if(isKnownFakeDemoPhone(digits)) return;
        const key = phoneKey(digits);
        const existing = map.get(key) || {};
        const lastTs = normalizeTimestamp(raw.lastTimestamp||raw.updatedAt||raw.timestamp||0);
        const existTs = normalizeTimestamp(existing.lastTimestamp||existing.updatedAt||0);
        const merged = Object.assign({}, existing, raw);
        const rawPhone = String(raw.phone || raw.phoneNumber || raw.id || '').trim();
        const existingPreview = String(existing.lastText || existing.lastMessagePreview || '').trim();
        const rawPreview = String(raw.lastText || raw.lastMessagePreview || '').trim();
        merged.phone = choosePreferredPhoneVariant(existing.phone || digits, rawPhone || digits);
        merged._serverPhones = Array.from(new Set([...(existing._serverPhones||[]), String(raw.phone||raw.phoneNumber||raw.id||'')]));
        merged.lastTimestamp = Math.max(lastTs, existTs);
        if(lastTs >= existTs){
          merged.lastText = rawPreview || existingPreview;
        } else {
          merged.lastText = existingPreview || rawPreview;
        }
        if(!merged.lastMessagePreview) merged.lastMessagePreview = merged.lastText || rawPreview || existingPreview;
        if(existing.name && !merged.name) merged.name = existing.name;
        if(existing.assignedTo && !merged.assignedTo) merged.assignedTo = existing.assignedTo;
        map.set(key, merged);
      }catch(_e){}
    });
    return Array.from(map.values()).sort((a,b)=> (b.lastTimestamp||0)-(a.lastTimestamp||0));
  }

  function isInboundDirection(value){
    const v = String(value || '').trim().toLowerCase();
    return v === 'in' || v === 'inbound' || v === 'received';
  }

  function ensureAudioUnlocked(){
    audioUnlockedByUser = true;
    try{
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if(!AudioCtx) return;
      if(!incomingAudioCtx) incomingAudioCtx = new AudioCtx();
      if(incomingAudioCtx.state === 'suspended') incomingAudioCtx.resume();
    }catch(_e){}
  }

  function playIncomingNotificationSound(){
    if(!audioUnlockedByUser) return;
    try{
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if(!AudioCtx) return;
      if(!incomingAudioCtx) incomingAudioCtx = new AudioCtx();
      if(incomingAudioCtx.state === 'suspended') incomingAudioCtx.resume();
      const now = incomingAudioCtx.currentTime;
      const master = incomingAudioCtx.createGain();
      master.gain.setValueAtTime(0.0001, now);
      master.connect(incomingAudioCtx.destination);

      function scheduleTone(startAt, freq, duration){
        const osc = incomingAudioCtx.createOscillator();
        const gain = incomingAudioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startAt);
        gain.gain.setValueAtTime(0.0001, startAt);
        gain.gain.exponentialRampToValueAtTime(0.14, startAt + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
        osc.connect(gain);
        gain.connect(master);
        osc.start(startAt);
        osc.stop(startAt + duration + 0.01);
      }

      // Two-tone alert with stronger attack for easier perception.
      scheduleTone(now, 1040, 0.12);
      scheduleTone(now + 0.14, 760, 0.16);
      master.gain.exponentialRampToValueAtTime(0.9, now + 0.02);
      master.gain.exponentialRampToValueAtTime(0.0001, now + 0.34);
    }catch(_e){}
  }

  async function loadChats(){
    try{
      if(isDemoClientsEnabled()) keepDemoClientsInsideTwoHourWindow();
      const resp = await fetch('/wa/conversations?limit=100');
      if(!resp.ok) throw new Error('HTTP ' + resp.status);
      const data = await resp.json();
      let shouldPlayInboundSound = false;
      const mappedChats = dedupeConversations(Array.isArray(data.conversations)? data.conversations : []).map((chat) => {
        const meta = getMeta(chat.phone || chat.id);
        const phone = phoneKey(chat.phone || chat.id);
        const board = normalizeFunnelBoardName(meta.funnelBoard || primaryFunnelBoardName) || primaryFunnelBoardName;
        if(phone && !String(meta.funnelBoard || '').trim()){
          setMeta(phone, { funnelBoard: board });
        }
        const lastTs = normalizeTimestamp(chat.lastTimestamp || chat.updatedAt || 0);
        const lastDirection = String(chat.lastDirection || chat.direction || '').trim();
        if(phone){
          const prevInboundTs = Number(inboundNotifiedTsByPhone.get(phone) || 0);
          if(!didInitInboundNotificationState){
            if(isInboundDirection(lastDirection) && lastTs > 0){
              inboundNotifiedTsByPhone.set(phone, lastTs);
            } else if(!inboundNotifiedTsByPhone.has(phone)){
              inboundNotifiedTsByPhone.set(phone, prevInboundTs);
            }
          } else if(isInboundDirection(lastDirection) && lastTs > prevInboundTs){
            inboundNotifiedTsByPhone.set(phone, lastTs);
            shouldPlayInboundSound = true;
          }
        }
        const lastSeenTs = Number(meta.lastSeenTs || 0);
        const computedRead = typeof meta.read === 'boolean' ? meta.read : (lastTs > 0 ? lastSeenTs >= lastTs : true);
        const preview = String(meta.lastMessagePreview || chat.lastText || chat.lastMessagePreview || '').trim();
        const displayName = String(chat.name || chat.clientName || chat.displayName || '').trim();
        const hasMetaAgent = Object.prototype.hasOwnProperty.call(meta || {}, 'agent');
        const metaAgentRaw = String(meta && meta.agent || '').trim();
        const resolvedAssignedTo = hasMetaAgent
          ? ((metaAgentRaw && metaAgentRaw.toLowerCase() !== 'no asignado') ? metaAgentRaw : null)
          : (chat.assignedTo || null);
        return Object.assign({}, chat, {
          name: displayName,
          lastText: preview,
          funnel: meta.funnel || chat.funnel || crmConfig.funnel[0],
          status: meta.status || chat.status || crmConfig.statuses[0],
          assignedTo: resolvedAssignedTo,
          archived: !!meta.archived,
          deleted: !!meta.deleted,
          read: computedRead,
          pendingClientCount: computedRead ? 0 : pendingClientCountForChat(Object.assign({}, chat, { read: computedRead }))
        });
      });
      chats = mappedChats.filter((chat) => {
        const phone = phoneKey(chat && (chat.phone || chat.id));
        if(!phone) return false;
        const meta = getMeta(phone);
        if(meta && meta.isDemoClient) return false;
        return hasRealConversationActivity(chat);
      });

      purgeFakeLeadsDataset(new Set(chats.map((c) => phoneKey(c.phone || c.id)).filter(Boolean)));
      renderChats();

      if(selected){
        const selectedDigits = String(selected.phone || '').replace(/\D+/g,'');
        const selectedRefreshed = chats.find((it) => String(it.phone || '').replace(/\D+/g,'') === selectedDigits);
        if(selectedRefreshed){
          selected = selectedRefreshed;
          updateHeader();
          syncToolbarFromSelection();
        }
      }

      if(!selected){
        updateHeader();
        syncToolbarFromSelection();
      }

      if(chats.length && !mediaHydrated){
        harvestMediaFromRecentChats();
      }
      const activePanel = document.querySelector('.wa-panel.active');
      if(activePanel && activePanel.dataset.panel === 'directory'){
        buildDirectoryRows();
      }
      if(activePanel && activePanel.dataset.panel === 'funnels'){
        renderFunnelsStatusList();
        renderFunnelsBoard();
      }
      renderDashboard();
      renderAnalytics();
      if(!didInitInboundNotificationState){
        didInitInboundNotificationState = true;
      } else if(shouldPlayInboundSound){
        playIncomingNotificationSound();
      }
    }catch(e){
      console.warn('loadChats', e);
      if(contactsList){
        contactsList.innerHTML = '<div style="color:#64748b;padding:8px;">No se pudieron cargar conversaciones.</div>';
      }
    }
  }

  function renderChats(){
    if(!contactsList) return;
    contactsList.innerHTML = '';
    const frag = document.createDocumentFragment();
    const q = ((searchInput && searchInput.value) || '').trim().toLowerCase();
    let list = chats.filter((c)=>{
      if(!q) return true;
      const name = (c.name||'').toLowerCase();
      const phone = String(c.phone||'');
      return name.includes(q) || phone.includes(q) || (c.lastText||'').toLowerCase().includes(q);
    });
    list = list.filter((c) => !c.deleted);
    const currentUser = String(getSystemUserName() || '').trim().toLowerCase();
    if(activeChatFilter === 'assigned'){
      list = list.filter((c) => String(c.assignedTo || '').trim().toLowerCase() === currentUser);
    } else if(activeChatFilter === 'unread'){
      list = list.filter((c) => pendingClientCountForChat(c) > 0);
    } else if(activeChatFilter === 'archived'){
      list = list.filter((c) => !!c.archived);
    } else {
      list = list.filter((c) => !c.archived);
    }
    try{ list = dedupeConversations(list); }catch(_e){}
    if(list.length===0){
      contactsList.innerHTML = '<div style="color:#64748b;padding:8px;">Sin chats</div>';
      return;
    }

    list.forEach((c)=>{
      const row = document.createElement('div');
      row.className='wa-contact-row';
      row.style.display='flex';
      row.style.alignItems='center';
      row.style.justifyContent='space-between';

      const left = document.createElement('div');
      left.style.display='flex';
      left.style.alignItems='center';
      left.style.flex='1';
      left.style.gap='6px';
      left.style.textAlign='left';
      left.style.border='none';
      left.style.background='transparent';
      left.style.padding='4px';

      const avatar = document.createElement('div');
      avatar.className='wa-avatar';
      avatar.classList.add('wa-contact-avatar');
      avatar.textContent = (c.name||c.phone||'--').slice(0,2).toUpperCase();

      const txt = document.createElement('div');
      txt.className = 'wa-contact-main';

      const head = document.createElement('div');
      head.className = 'wa-contact-head';

      const title = document.createElement('div');
      title.className='wa-contact-title';
      title.textContent = c.name || formatDisplayPhone(c.phone || '');

      const timeEl = document.createElement('div');
      timeEl.className = 'wa-contact-time';
      timeEl.textContent = formatChatTime(c.lastTimestamp || c.updatedAt || 0);

      const pendingCount = pendingClientCountForChat(c);
      if(pendingCount > 0){
        const unreadCountEl = document.createElement('span');
        unreadCountEl.className = 'wa-unread-count';
        unreadCountEl.textContent = pendingCount > 99 ? '99+' : String(pendingCount);
        unreadCountEl.title = 'Mensajes pendientes de cliente';
        head.appendChild(unreadCountEl);
      }

      const preview = document.createElement('div');
      preview.className='wa-contact-preview';
      preview.textContent = c.lastText || '';

      head.appendChild(title);
      head.appendChild(timeEl);
      txt.appendChild(head);
      txt.appendChild(preview);
      left.appendChild(avatar);
      left.appendChild(txt);
      left.addEventListener('click', ()=> selectContact(c));

      const rowWrap = document.createElement('div');
      rowWrap.style.display='flex';
      rowWrap.style.alignItems='center';
      rowWrap.style.width='100%';
      rowWrap.appendChild(left);
      row.appendChild(rowWrap);
      frag.appendChild(row);
    });

    contactsList.appendChild(frag);
  }

  function updateHeader(){
    if(!selected){
      if(nameEl) nameEl.textContent = 'Selecciona un contacto';
      if(phoneEl) phoneEl.textContent = '';
      if(avatarEl) avatarEl.textContent = '--';
      if(assignedBadgeEl) assignedBadgeEl.style.display = 'none';
      if(chatsPanelEl) chatsPanelEl.classList.add('wa-no-chat-selected');
      renderConversationWelcomeSlot();
      renderClientRightPanel();
      return;
    }
    if(chatsPanelEl) chatsPanelEl.classList.remove('wa-no-chat-selected');
    if(nameEl){
      nameEl.textContent = selected.name || formatDisplayPhone(selected.phone || '');
    }
    if(phoneEl){
      phoneEl.textContent = formatDisplayPhone(selected.phone || '');
    }
    if(avatarEl){
      avatarEl.textContent = (selected.name || selected.phone || '--').slice(0, 2).toUpperCase();
    }
    if(assignedBadgeEl){
      const meta = getMeta(selected.phone);
      const hasMetaAgent = Object.prototype.hasOwnProperty.call(meta || {}, 'agent');
      const assignedRaw = String(hasMetaAgent ? meta.agent : (selected.assignedTo || '')).trim();
      const isAssigned = !!assignedRaw && assignedRaw.toLowerCase() !== 'no asignado';
      assignedBadgeEl.style.display = isAssigned ? 'inline-block' : 'none';
    }
    renderClientRightPanel();
  }

  async function selectContact(c){
    if(!c) return;
    suppressPollingUntil = Date.now() + 2500;
    selected = c;
    const now = Date.now();
    const seenTs = normalizeTimestamp(c.lastTimestamp || c.updatedAt || now) || now;
    selected.read = true;
    selected.pendingClientCount = 0;
    setMeta(c.phone, { read: true, openedAt: now, lastSeenTs: seenTs, pendingClientCount: 0 });
    updateHeader();
    syncToolbarFromSelection();
    clearReplyContext();
    lastLoadedPhoneDigits = '';
    lastLoadedConversationTs = 0;
    lastLoadedConversationSig = '';
    await loadConversation(c);
    scrollConversationToBottom(true);
    updateComposerState();
  }

  function scrollConversationToBottom(force){
    if(!convEl) return;
    // Respect suppression flag set when focusing a message unless forced
    if(!force && Date.now() < Number(suppressAutoScrollUntil || 0)) return;
    const doScroll = () => {
      try{ convEl.scrollTop = convEl.scrollHeight; }
      catch(_e){}
    };
    // immediate
    doScroll();
    // ensure after rendering/layout with rAF
    try{ requestAnimationFrame(() => { try{ requestAnimationFrame(doScroll); }catch(_e){} }); }catch(_e){}
    // additional retries in case images/media load after initial render
    setTimeout(doScroll, 80);
    setTimeout(doScroll, 300);
  }

  function isConversationNearBottom(thresholdPx){
    if(!convEl) return true;
    const threshold = Number.isFinite(Number(thresholdPx)) ? Number(thresholdPx) : 72;
    const distance = convEl.scrollHeight - convEl.scrollTop - convEl.clientHeight;
    return distance <= threshold;
  }

  function updateComposerState(){
    if(!msgInput || !sendBtn) return;
    if(!selected){
      msgInput.placeholder = 'Selecciona un contacto para escribir...';
      msgInput.disabled = true;
      sendBtn.disabled = true;
      sendBtn.style.opacity = '0.6';
      if(emojiBtn) emojiBtn.disabled = true;
      if(quickAddBtn) quickAddBtn.disabled = true;
    } else {
      msgInput.placeholder = 'Escribe un mensaje...';
      msgInput.disabled = false;
      sendBtn.disabled = false;
      sendBtn.style.opacity = '1';
      if(emojiBtn) emojiBtn.disabled = false;
      if(quickAddBtn) quickAddBtn.disabled = false;
    }
  }

  async function assignToAgent(agentName){
    if(!selected) return;
    const normalized = String(agentName || '').trim();
    const value = normalized || 'No asignado';
    setMeta(selected.phone, { agent: value });
    addLeadHistory(selected.phone, 'Cambio de usuario', value === 'No asignado' ? 'Se desasigno el lead.' : ('Asignado a ' + value));
    selected.assignedTo = value === 'No asignado' ? null : value;
    updateHeader();
    renderChats();

    if(value !== 'No asignado'){
      try{
        await fetch('/wa/assign', {
          method: 'POST',
          headers: { 'Content-Type':'application/json' },
          body: JSON.stringify({ phone: String(selected.phone || ''), assignedTo: value })
        });
      }catch(_e){}
    }
  }

  function onFunnelChange(){
    if(!selected || !funnelSelectEl) return;
    const previousFunnel = String(selected.funnel || crmConfig.funnel[0] || 'Sin etapa');
    const value = funnelSelectEl.value || crmConfig.funnel[0];
    selected.funnel = value;
    const archiveSelectedByFunnel = String(value).toLowerCase() === 'archivados';
    selected.archived = archiveSelectedByFunnel;
    setMeta(selected.phone, { funnel: value, archived: archiveSelectedByFunnel });
    addLeadHistory(selected.phone, 'Cambio de etapa', 'Cambio la etapa de ' + previousFunnel + ' a ' + value);
    renderChats();
    syncToolbarFromSelection();
  }

  async function onAgentChange(){
    if(!selected || !agentSelectEl) return;
    await assignToAgent(agentSelectEl.value || 'No asignado');
    syncToolbarFromSelection();
  }

  function onStatusChange(){
    if(!selected || !statusSelectEl) return;
    const value = statusSelectEl.value || crmConfig.statuses[0];
    selected.status = value;
    setMeta(selected.phone, { status: value });
    addLeadHistory(selected.phone, 'Cambio de estatus', 'Nuevo estatus: ' + value);
  }

  function archiveSelected(){
    if(!selected) return;
    const willArchive = !selected.archived;
    const archivedLabel = crmConfig.funnel.find((s) => String(s).toLowerCase() === 'archivados') || 'Archivados';
    const defaultFunnel = crmConfig.funnel.find((s) => String(s).toLowerCase() !== 'archivados') || 'Cliente nuevo';
    setMeta(selected.phone, { archived: willArchive, funnel: willArchive ? archivedLabel : defaultFunnel });
    const selectedDigits = phoneKey(selected.phone);
    chats = chats.map((c) => phoneKey(c.phone) === selectedDigits ? Object.assign({}, c, { archived: willArchive, funnel: willArchive ? archivedLabel : defaultFunnel }) : c);
    selected.archived = willArchive;
    selected.funnel = willArchive ? archivedLabel : defaultFunnel;
    addLeadHistory(selected.phone, willArchive ? 'Archivado' : 'Reactivado', willArchive ? 'Lead movido a Archivados.' : 'Lead regresado a activo.');
    renderChats();
    syncToolbarFromSelection();
    const next = chats.find((c) => !c.archived);
    if(next) selectContact(next);
  }

  function closeWonSelected(){
    if(!selected) return;
    const closeLabel = crmConfig.funnel.find((s) => String(s).toLowerCase().includes('cierre')) || 'Cierre';
    setMeta(selected.phone, { funnel: closeLabel });
    addLeadHistory(selected.phone, 'Cierre', 'Lead movido a ' + closeLabel);
    selected.funnel = closeLabel;
    if(funnelSelectEl) funnelSelectEl.value = closeLabel;
    syncToolbarFromSelection();
    renderChats();
  }

  function normalizeMediaKind(url, mime){
    const src = (String(url || '') + ' ' + String(mime || '')).toLowerCase();
    if(src.includes('sticker') || src.includes('webp')) return 'Sticker';
    if(src.includes('video')) return 'Video';
    if(src.includes('image') || /\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(src)) return 'Imagen';
    return 'Archivo';
  }

  function findMediaUrl(msg){
    if(!msg || typeof msg !== 'object') return '';
    const directKeys = ['mediaUrl','url','fileUrl','imageUrl','videoUrl','documentUrl'];
    for(const key of directKeys){
      if(typeof msg[key] === 'string' && msg[key].trim()) return msg[key].trim();
    }
    if(msg.media && typeof msg.media.url === 'string') return msg.media.url.trim();
    if(msg.attachment && typeof msg.attachment.url === 'string') return msg.attachment.url.trim();
    if(msg.image && typeof msg.image.link === 'string') return msg.image.link.trim();
    if(msg.video && typeof msg.video.link === 'string') return msg.video.link.trim();
    // document may be nested under different keys/structures
    if(msg.document && typeof msg.document === 'string' && msg.document.trim()) return msg.document.trim();
    if(msg.document && typeof msg.document === 'object'){
      const doc = msg.document;
      const tryKeys = ['url','link','fileUrl','downloadUrl','path','uri'];
      for(const k of tryKeys){
        if(typeof doc[k] === 'string' && doc[k].trim()) return doc[k].trim();
      }
      if(doc.file && typeof doc.file.url === 'string' && doc.file.url.trim()) return doc.file.url.trim();
    }
    if(msg.mediaId) return '/wa/media/' + encodeURIComponent(String(msg.mediaId));
    return '';
  }

  function normalizeMessageDirection(msg){
    const raw = String(msg && (msg.direction || msg.flow || msg.messageDirection || msg.fromMe || '') || '').toLowerCase();
    if(raw === 'out' || raw === 'outbound' || raw === 'sent' || raw === 'true' || raw === '1') return 'out';
    if(raw === 'in' || raw === 'inbound' || raw === 'received' || raw === 'false' || raw === '0') return 'in';
    return 'in';
  }

  function extractConversationFlowStats(messages){
    let lastInboundTs = 0;
    let lastOutboundTs = 0;
    const list = Array.isArray(messages) ? messages : [];
    list.forEach((msg) => {
      const ts = Number(msg && (msg.timestamp || msg.createdAt || msg.sentAt) || 0);
      if(!ts) return;
      const direction = normalizeMessageDirection(msg);
      if(direction === 'out') lastOutboundTs = Math.max(lastOutboundTs, ts);
      else lastInboundTs = Math.max(lastInboundTs, ts);
    });
    return { lastInboundTs, lastOutboundTs };
  }

  function renderConversationEmptyState(message){
    if(!convEl) return;
    convEl.innerHTML = '';
    const empty = document.createElement('div');
    empty.className = 'wa-conversation-empty';
    empty.textContent = String(message || 'Sin mensajes en esta conversacion.');
    convEl.appendChild(empty);
    scrollConversationToBottom();
  }

  function getWelcomeLogoDataUrl(){
    try{
      return String(localStorage.getItem(CHAT_WELCOME_LOGO_KEY) || '').trim();
    }catch(_e){
      return '';
    }
  }

  function renderConversationWelcomeSlot(){
    if(!convEl) return;
    convEl.innerHTML = '';

    const slot = document.createElement('div');
    slot.className = 'wa-conversation-logo-slot';

    const logoUrl = getWelcomeLogoDataUrl();
    if(logoUrl){
      const logo = document.createElement('img');
      logo.className = 'wa-conversation-logo';
      logo.src = logoUrl;
      logo.alt = 'Logo';
      slot.appendChild(logo);
    }

    convEl.appendChild(slot);
  }

  function messageTimestamp(msg){
    const ts = normalizeTimestamp(msg?.timestamp || msg?.createdAt || msg?.sentAt || 0);
    return Number.isFinite(ts) && ts > 0 ? ts : Date.now();
  }

  function ingestMediaFromMessages(contact, messages){
    if(!Array.isArray(messages)) return;
    const contactLabel = (contact && (contact.name || formatDisplayPhone(contact.phone || ''))) || 'Cliente';
    const phone = String((contact && contact.phone) || '').replace(/\D+/g, '');

    messages.forEach((m, idx) => {
      const mediaUrl = findMediaUrl(m);
      if(!mediaUrl) return;

      const ts = messageTimestamp(m);
      const mime = m.mimeType || m.type || '';
      const kind = normalizeMediaKind(mediaUrl, mime);
      const fileName = String(m.fileName || m.filename || m.caption || kind);
      const id = String(m.id || (mediaUrl + '_' + ts + '_' + idx));

      mediaItems.set(id, {
        id,
        kind,
        fileName,
        url: mediaUrl,
        phone,
        contactLabel,
        timestamp: ts
      });
    });

    renderMediaList();
  }

  function renderMediaList(){
    if(!mediaListEl) return;
    const sorted = Array.from(mediaItems.values()).sort((a,b) => Number(b.timestamp || 0) - Number(a.timestamp || 0));

    if(!sorted.length){
      mediaListEl.innerHTML = '<div style="color:#64748b">Sin archivos multimedia aun.</div>';
      return;
    }

    const frag = document.createDocumentFragment();
    sorted.forEach((item) => {
      const row = document.createElement('div');
      row.className = 'media-row';

      const main = document.createElement('div');
      main.className = 'media-main';

      const title = document.createElement('div');
      title.className = 'media-title';
      title.textContent = item.kind + ': ' + item.fileName;

      const sub = document.createElement('div');
      sub.className = 'media-sub';
      sub.textContent = (item.contactLabel || 'Cliente') + (item.phone ? ' | +' + item.phone : '');

      const link = document.createElement('a');
      link.className = 'media-sub';
      link.href = item.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = item.url;

      const date = document.createElement('div');
      date.className = 'media-date';
      date.textContent = new Date(item.timestamp).toLocaleString();

      main.appendChild(title);
      main.appendChild(sub);
      main.appendChild(link);
      row.appendChild(main);
      row.appendChild(date);
      frag.appendChild(row);
    });

    mediaListEl.innerHTML = '';
    mediaListEl.appendChild(frag);
  }

  function loadPersistedStringSet(key){
    try{
      const parsed = JSON.parse(localStorage.getItem(key) || '[]');
      if(!Array.isArray(parsed)) return new Set();
      return new Set(parsed.map((x) => String(x || '')).filter(Boolean));
    }catch(_e){
      return new Set();
    }
  }

  function savePersistedStringSet(key, setRef){
    try{ localStorage.setItem(key, JSON.stringify(Array.from(setRef || new Set()))); }catch(_e){}
  }

  function isVideoLike(value){
    const src = String(value || '').toLowerCase();
    return src.includes('video') || /\.(mp4|mov|mkv|webm|avi)$/i.test(src);
  }

  function isImageLike(value){
    const src = String(value || '').toLowerCase();
    return src.includes('image') || /\.(jpg|jpeg|png|gif|webp|bmp|heic)$/i.test(src);
  }

  function isDocumentLike(value){
    const src = String(value || '').toLowerCase();
    return src.includes('document') || /\.(pdf|doc|docx|xls|xlsx|ppt|pptx|txt|csv|zip|rar)$/i.test(src);
  }

  function extractLinksFromText(text){
    const raw = String(text || '');
    if(!raw) return [];
    const list = [];
    const re = /(https?:\/\/[^\s<>"]+)/ig;
    let m = re.exec(raw);
    while(m){
      list.push(String(m[1] || '').trim());
      m = re.exec(raw);
    }
    return Array.from(new Set(list.filter(Boolean)));
  }

  function messageTextPreview(msg){
    return String(msg && (msg.text || msg.caption || msg.body || '') || '').trim();
  }

  function multimediaSenderMeta(contact, msg){
    const direction = normalizeMessageDirection(msg);
    if(direction === 'out') return { senderType: 'me', senderLabel: 'Tu' };
    const label = String(contact && contact.name || '').trim() || formatDisplayPhone((contact && contact.phone) || '');
    return { senderType: 'others', senderLabel: label || 'Cliente' };
  }

  function multimediaMonthLabel(ts){
    const safeTs = normalizeTimestamp(ts || 0) || Date.now();
    try{
      return new Intl.DateTimeFormat('es-MX', { month: 'long', year: 'numeric' }).format(new Date(safeTs));
    }catch(_e){
      const d = new Date(safeTs);
      return String(d.getMonth() + 1).padStart(2, '0') + '/' + d.getFullYear();
    }
  }

  function rowActionButton(label, action, itemId){
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = label;
    btn.setAttribute('data-mm-action', action);
    btn.setAttribute('data-item-id', itemId);
    return btn;
  }

  function renderMultimediaEmpty(message){
    if(!mediaContentEl) return;
    mediaContentEl.innerHTML = '';
    const empty = document.createElement('div');
    empty.className = 'wa-media-empty';
    empty.textContent = String(message || 'Sin resultados para este filtro.');
    mediaContentEl.appendChild(empty);
  }

  function getMultimediaFilteredItems(){
    const search = String(multimediaState.search || '').trim().toLowerCase();
    const sender = String(multimediaState.senderFilter || 'all');
    const order = String(multimediaState.order || 'desc');

    const list = multimediaState.items.filter((item) => {
      if(multimediaState.hiddenIds.has(item.id)) return false;
      if(multimediaState.activeTab === 'assets' && item.kind !== 'asset') return false;
      if(multimediaState.activeTab === 'docs' && item.kind !== 'doc') return false;
      if(multimediaState.activeTab === 'links' && item.kind !== 'link') return false;
      if(sender !== 'all' && item.senderType !== sender) return false;
      if(search){
        const hay = [item.title, item.comment, item.senderLabel, item.contactLabel, item.url].join(' ').toLowerCase();
        if(!hay.includes(search)) return false;
      }
      return true;
    });

    list.sort((a, b) => order === 'asc'
      ? Number(a.timestamp || 0) - Number(b.timestamp || 0)
      : Number(b.timestamp || 0) - Number(a.timestamp || 0));

    return list;
  }

  function multimediaItemHint(item){
    return [
      item && item.url,
      item && item.mimeType,
      item && item.mediaHint,
      item && item.title
    ].filter(Boolean).join(' ').toLowerCase();
  }

  function isMultimediaVideoItem(item){
    return isVideoLike(multimediaItemHint(item));
  }

  function formatMediaDuration(seconds){
    const n = Number(seconds || 0);
    if(!Number.isFinite(n) || n <= 0) return '--:--';
    const total = Math.max(0, Math.round(n));
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    if(h > 0) return String(h) + ':' + String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
    return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  }

  function ensureMultimediaViewer(){
    if(multimediaViewerRefs) return multimediaViewerRefs;

    const backdrop = document.createElement('div');
    backdrop.className = 'wa-media-viewer-backdrop';
    backdrop.setAttribute('aria-hidden', 'true');

    const stage = document.createElement('div');
    stage.className = 'wa-media-viewer-stage';

    const mediaWrap = document.createElement('div');
    mediaWrap.className = 'wa-media-viewer-media';

    const actions = document.createElement('div');
    actions.className = 'wa-media-viewer-actions';

    const makeIconBtn = (action, title, svg) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'wa-media-viewer-icon';
      btn.setAttribute('title', title);
      btn.setAttribute('aria-label', title);
      btn.setAttribute('data-mm-viewer-action', action);
      btn.innerHTML = svg;
      return btn;
    };

    const goBtn = makeIconBtn('go', 'Ir al mensaje', '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 5h10v10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="m19 5-8 8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M15 19H5V9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>');
    const forwardBtn = makeIconBtn('forward', 'Reenviar', '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="m11 7 5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>');
    const starBtn = makeIconBtn('star', 'Favorito', '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m12 4 2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 16.3 7.2 19l.9-5.4L4.2 9.7l5.4-.8L12 4Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>');
    const downloadBtn = makeIconBtn('download', 'Descargar', '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4v10" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><path d="m8 11 4 4 4-4" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 19h14" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>');
    const copyBtn = makeIconBtn('copy', 'Copiar', '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="2" stroke="currentColor" stroke-width="1.8"/><rect x="3" y="3" width="10" height="10" rx="2" stroke="currentColor" stroke-width="1.2"/></svg>');
    const closeBtn = makeIconBtn('close', 'Cerrar', '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6 18 18M18 6 6 18" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>');

    actions.appendChild(goBtn);
    actions.appendChild(forwardBtn);
    actions.appendChild(starBtn);
    actions.appendChild(downloadBtn);
    actions.appendChild(copyBtn);
    actions.appendChild(closeBtn);

    const prevBtn = document.createElement('button');
    prevBtn.type = 'button';
    prevBtn.className = 'wa-media-viewer-nav prev';
    prevBtn.setAttribute('data-mm-viewer-nav', 'prev');
    prevBtn.setAttribute('title', 'Anterior');
    prevBtn.setAttribute('aria-label', 'Anterior');
    prevBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m15 5-7 7 7 7" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    const nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'wa-media-viewer-nav next';
    nextBtn.setAttribute('data-mm-viewer-nav', 'next');
    nextBtn.setAttribute('title', 'Siguiente');
    nextBtn.setAttribute('aria-label', 'Siguiente');
    nextBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m9 5 7 7-7 7" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    stage.appendChild(mediaWrap);
    stage.appendChild(actions);
    backdrop.appendChild(prevBtn);
    backdrop.appendChild(stage);
    backdrop.appendChild(nextBtn);

    document.body.appendChild(backdrop);

    backdrop.addEventListener('click', (ev) => {
      if(ev.target === backdrop) closeMultimediaViewer();
    });

    backdrop.addEventListener('click', async (ev) => {
      const target = ev.target;
      if(!(target instanceof Element)) return;

      const navBtn = target.closest('[data-mm-viewer-nav]');
      if(navBtn){
        ev.preventDefault();
        const dir = String(navBtn.getAttribute('data-mm-viewer-nav') || '');
        moveMultimediaViewer(dir === 'prev' ? -1 : 1);
        return;
      }

      const actionBtn = target.closest('[data-mm-viewer-action]');
      if(!actionBtn) return;
      ev.preventDefault();
      const action = String(actionBtn.getAttribute('data-mm-viewer-action') || '');
      if(action === 'close'){
        closeMultimediaViewer();
        return;
      }
      const current = getMultimediaViewerCurrentItem();
      if(!current) return;
      if(action === 'copy'){
        try{
          await navigator.clipboard.writeText(current.url || current.title || '');
        }catch(_e){ alert('No se pudo copiar'); }
        return;
      }
      if(action === 'go' || action === 'forward') closeMultimediaViewer();
      await runMultimediaAction(action, current.id);
      if(action === 'star'){
        renderMultimediaViewer();
        renderMultimediaContent();
      }
    });

    multimediaViewerRefs = { backdrop, mediaWrap, prevBtn, nextBtn, starBtn };
    return multimediaViewerRefs;
  }

  function getMultimediaViewerCurrentItem(){
    const id = multimediaViewerState.ids[multimediaViewerState.index];
    if(!id) return null;
    return findMultimediaItemById(id);
  }

  function renderMultimediaViewer(){
    const refs = ensureMultimediaViewer();
    const current = getMultimediaViewerCurrentItem();
    refs.mediaWrap.innerHTML = '';
    if(!current) return;

    const hint = multimediaItemHint(current);
    if(current.url && isVideoLike(hint)){
      const video = document.createElement('video');
      video.src = current.url;
      video.controls = true;
      video.preload = 'metadata';
      video.playsInline = true;
      video.autoplay = false;
      refs.mediaWrap.appendChild(video);
    }else if(current.url && isImageLike(hint)){
      const img = document.createElement('img');
      img.src = current.url;
      img.alt = current.title || 'Imagen';
      refs.mediaWrap.appendChild(img);
    }else{
      const empty = document.createElement('div');
      empty.className = 'wa-media-viewer-empty';
      empty.textContent = current.title || 'Multimedia';
      refs.mediaWrap.appendChild(empty);
    }

    const total = multimediaViewerState.ids.length;
    refs.prevBtn.disabled = total <= 1;
    refs.nextBtn.disabled = total <= 1;
    refs.starBtn.classList.toggle('active', multimediaState.starredIds.has(current.id));
  }

  function openMultimediaViewer(itemId, items){
    const id = String(itemId || '');
    if(!id) return;
    const list = Array.isArray(items) && items.length
      ? items.map((item) => String(item && item.id || '')).filter(Boolean)
      : getMultimediaFilteredItems().filter((item) => item.kind === 'asset').map((item) => item.id);
    const index = Math.max(0, list.indexOf(id));
    multimediaViewerState.ids = list.length ? list : [id];
    multimediaViewerState.index = index;
    multimediaViewerState.open = true;
    const refs = ensureMultimediaViewer();
    refs.backdrop.classList.add('open');
    refs.backdrop.setAttribute('aria-hidden', 'false');
    renderMultimediaViewer();
  }

  function closeMultimediaViewer(){
    if(!multimediaViewerState.open || !multimediaViewerRefs) return;
    multimediaViewerState.open = false;
    multimediaViewerRefs.backdrop.classList.remove('open');
    multimediaViewerRefs.backdrop.setAttribute('aria-hidden', 'true');
    multimediaViewerRefs.mediaWrap.innerHTML = '';
  }

  function moveMultimediaViewer(step){
    if(!multimediaViewerState.open) return;
    const total = multimediaViewerState.ids.length;
    if(total <= 1) return;
    let next = multimediaViewerState.index + Number(step || 0);
    if(next < 0) next = total - 1;
    if(next >= total) next = 0;
    multimediaViewerState.index = next;
    renderMultimediaViewer();
  }

  function renderMultimediaAssets(items){
    if(!mediaContentEl) return;
    if(!items.length) return renderMultimediaEmpty('No hay fotos ni videos disponibles.');

    mediaContentEl.innerHTML = '';
    const grid = document.createElement('div');
    grid.className = 'wa-media-grid';
    const frag = document.createDocumentFragment();

    items.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'wa-media-card';
      card.style.position = 'relative';
      card.setAttribute('data-mm-open', item.id);

      const check = document.createElement('input');
      check.type = 'checkbox';
      check.className = 'wa-media-check';
      check.checked = multimediaState.selectedIds.has(item.id);
      check.setAttribute('data-mm-check', item.id);
      card.appendChild(check);

      const thumb = document.createElement('div');
      thumb.className = 'wa-media-thumb';
      const mediaHint = multimediaItemHint(item);
      if(isImageLike(mediaHint) && item.url){
        const img = document.createElement('img');
        img.alt = item.title || 'Imagen';
        img.loading = 'lazy';
        // request a low-quality server-side thumbnail when available
        img.src = getThumbnailUrl(item.url);
        thumb.appendChild(img);
      }else if(isVideoLike(mediaHint) && item.url){
        const video = document.createElement('video');
        video.src = item.url;
        video.controls = false;
        video.muted = true;
        video.preload = 'metadata';
        video.playsInline = true;
        video.style.background = '#000';
        thumb.appendChild(video);

        const badge = document.createElement('div');
        badge.className = 'wa-media-video-badge';
        badge.innerHTML = '<span class="wa-media-video-icon" aria-hidden="true"></span><span class="wa-media-video-time">' + formatMediaDuration(item.durationSec) + '</span>';
        thumb.appendChild(badge);

        const timeEl = badge.querySelector('.wa-media-video-time');
        video.addEventListener('loadedmetadata', () => {
          const seconds = Number(video.duration || 0);
          if(Number.isFinite(seconds) && seconds > 0){
            item.durationSec = Math.round(seconds);
            if(timeEl) timeEl.textContent = formatMediaDuration(item.durationSec);
          }
        });
      }else{
        thumb.textContent = 'Multimedia';
      }
      card.appendChild(thumb);

      const rowActions = document.createElement('div');
      rowActions.className = 'wa-media-row-actions';
      rowActions.style.position = 'absolute';
      rowActions.style.top = '8px';
      rowActions.style.right = '8px';
      rowActions.style.zIndex = '4';

      const menuToggle = document.createElement('button');
      menuToggle.type = 'button';
      menuToggle.className = 'wa-media-icon-btn';
      menuToggle.textContent = 'v';
      menuToggle.setAttribute('data-mm-menu-toggle', item.id);

      const menu = document.createElement('div');
      menu.className = 'wa-media-row-menu' + (multimediaState.openRowMenuId === item.id ? ' open' : '');
      menu.setAttribute('data-mm-menu', item.id);
      menu.appendChild(rowActionButton('IR AL MENSAJE', 'go', item.id));
      menu.appendChild(rowActionButton('RESPONDER', 'reply', item.id));
      menu.appendChild(rowActionButton('DESCARGAR', 'download', item.id));
      menu.appendChild(rowActionButton('COPIAR', 'copy', item.id));
      menu.appendChild(rowActionButton('REENVIAR', 'forward', item.id));
      menu.appendChild(rowActionButton(multimediaState.starredIds.has(item.id) ? 'QUITAR DESTACADO' : 'DESTACAR', 'star', item.id));
      menu.appendChild(rowActionButton('ELIMINAR', 'delete', item.id));

      rowActions.appendChild(menuToggle);
      rowActions.appendChild(menu);
      card.appendChild(rowActions);

      frag.appendChild(card);
    });

    grid.appendChild(frag);
    mediaContentEl.appendChild(grid);
  }

  function renderMultimediaTableByMonth(items, isLinks){
    if(!mediaContentEl) return;
    if(!items.length) return renderMultimediaEmpty(isLinks ? 'No hay enlaces detectados.' : 'No hay documentos detectados.');

    mediaContentEl.innerHTML = '';
    const byMonth = new Map();
    items.forEach((item) => {
      const month = multimediaMonthLabel(item.timestamp);
      if(!byMonth.has(month)) byMonth.set(month, []);
      byMonth.get(month).push(item);
    });

    Array.from(byMonth.keys()).forEach((monthKey) => {
      const title = document.createElement('div');
      title.className = 'wa-media-month';
      title.textContent = monthKey;
      mediaContentEl.appendChild(title);

      const wrap = document.createElement('div');
      wrap.className = 'wa-media-table-wrap';
      const table = document.createElement('table');
      table.className = 'wa-media-table';
      const thead = document.createElement('thead');
      const hrow = document.createElement('tr');
      if(multimediaState.selecting){
        const thSel = document.createElement('th');
        thSel.textContent = '';
        hrow.appendChild(thSel);
      }
      const thMain = document.createElement('th');
      thMain.textContent = isLinks ? 'Enlace' : 'Documento';
      const thComment = document.createElement('th');
      thComment.textContent = 'Comentarios';
      const thSender = document.createElement('th');
      thSender.textContent = 'Enviado por';
      const thActions = document.createElement('th');
      thActions.textContent = 'Acciones';
      hrow.appendChild(thMain);
      hrow.appendChild(thComment);
      hrow.appendChild(thSender);
      hrow.appendChild(thActions);
      thead.appendChild(hrow);
      table.appendChild(thead);

      const tbody = document.createElement('tbody');
      byMonth.get(monthKey).forEach((item) => {
        const tr = document.createElement('tr');

        if(multimediaState.selecting){
          const tdSel = document.createElement('td');
          const check = document.createElement('input');
          check.type = 'checkbox';
          check.checked = multimediaState.selectedIds.has(item.id);
          check.setAttribute('data-mm-check', item.id);
          tdSel.appendChild(check);
          tr.appendChild(tdSel);
        }

        const tdMain = document.createElement('td');
        if(isLinks && item.url){
          const a = document.createElement('a');
          a.href = item.url;
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          a.textContent = item.url;
          tdMain.appendChild(a);
        }else{
          tdMain.textContent = item.title || 'Documento';
        }

        const tdComment = document.createElement('td');
        tdComment.textContent = item.comment ? String(item.comment) : 'Sin comentarios';

        const tdSender = document.createElement('td');
        tdSender.textContent = String(item.senderLabel || item.contactLabel || (item.phone ? formatDisplayPhone(item.phone) : '-'));

        const tdActions = document.createElement('td');
        const rowActions = document.createElement('div');
        rowActions.className = 'wa-media-row-actions';

        const menuToggle = document.createElement('button');
        menuToggle.type = 'button';
        menuToggle.className = 'wa-media-icon-btn';
        menuToggle.textContent = 'v';
        menuToggle.setAttribute('data-mm-menu-toggle', item.id);

        const menu = document.createElement('div');
        menu.className = 'wa-media-row-menu' + (multimediaState.openRowMenuId === item.id ? ' open' : '');
        menu.setAttribute('data-mm-menu', item.id);
        // use fixed positioning and size limits; positionOpenRowMenu() will place it correctly
        menu.style.position = 'fixed';
        menu.style.minWidth = '160px';
        menu.style.maxWidth = '320px';
        menu.style.width = 'auto';
        menu.style.flexDirection = 'column';
        menu.appendChild(rowActionButton('IR AL MENSAJE', 'go', item.id));
        menu.appendChild(rowActionButton('RESPONDER', 'reply', item.id));
        menu.appendChild(rowActionButton('DESCARGAR', 'download', item.id));
        menu.appendChild(rowActionButton('COPIAR', 'copy', item.id));
        menu.appendChild(rowActionButton('REENVIAR', 'forward', item.id));
        menu.appendChild(rowActionButton(multimediaState.starredIds.has(item.id) ? 'QUITAR DESTACADO' : 'DESTACAR', 'star', item.id));
        menu.appendChild(rowActionButton('ELIMINAR', 'delete', item.id));

        rowActions.appendChild(menuToggle);
        rowActions.appendChild(menu);
        tdActions.appendChild(rowActions);

        tr.appendChild(tdMain);
        tr.appendChild(tdComment);
        tr.appendChild(tdSender);
        tr.appendChild(tdActions);
        tbody.appendChild(tr);
      });

      table.appendChild(tbody);
      wrap.appendChild(table);
      mediaContentEl.appendChild(wrap);
    });
  }

  function renderMultimediaContent(){
    if(!mediaModalEl || !mediaContentEl) return;
    mediaModalEl.classList.toggle('selecting', !!multimediaState.selecting);
    if(mediaSelectToggleEl){
      mediaSelectToggleEl.textContent = multimediaState.selecting ? 'Cancelar' : 'Seleccionar';
      mediaSelectToggleEl.classList.toggle('active', multimediaState.selecting);
    }
    const filtered = getMultimediaFilteredItems();
    if(multimediaState.loading && !filtered.length){
      renderMultimediaEmpty('Cargando contenido multimedia...');
      return;
    }
    if(multimediaState.activeTab === 'assets') renderMultimediaAssets(filtered);
    else if(multimediaState.activeTab === 'docs') renderMultimediaTableByMonth(filtered, false);
    else renderMultimediaTableByMonth(filtered, true);

    // Position any open per-row menu so it appears above the card and not clipped
    positionOpenRowMenu();
  }

  function positionOpenRowMenu(){
    try{
      if(!multimediaState.openRowMenuId) return;
      const id = String(multimediaState.openRowMenuId || '');
      const menu = document.querySelector('.wa-media-row-menu[data-mm-menu="' + id + '"]');
      const toggle = document.querySelector('[data-mm-menu-toggle="' + id + '"]');
      if(!menu || !toggle) return;
      // ensure menu uses fixed positioning so it's not clipped inside cards
      menu.style.position = 'fixed';
      menu.style.zIndex = '4000';
      menu.style.display = 'flex';

      const rect = toggle.getBoundingClientRect();
      const menuRect = menu.getBoundingClientRect();
      const spaceAbove = rect.top;
      const spaceBelow = window.innerHeight - rect.bottom;
      const preferAbove = spaceAbove > menuRect.height + 8 || spaceBelow < menuRect.height + 8;

      // compute left aligned to toggle's right edge (but keep within viewport)
      let left = rect.right - menuRect.width;
      if(left + menuRect.width > window.innerWidth - 8) left = window.innerWidth - menuRect.width - 8;
      if(left < 8) left = 8;

      let top;
      if(preferAbove){
        top = rect.top - menuRect.height - 6; // above toggle
      }else{
        top = rect.bottom + 6; // below toggle
      }
      // clamp top within viewport
      if(top < 8) top = 8;
      if(top + menuRect.height > window.innerHeight - 8) top = window.innerHeight - menuRect.height - 8;

      menu.style.left = left + 'px';
      menu.style.top = top + 'px';
    }catch(_e){}
  }

  async function collectMultimediaIndex(force){
    const hasLegacyItems = multimediaState.items.some((it) => it && it.kind === 'asset' && !it.mediaHint);
    const shouldRefresh = !!force || hasLegacyItems || !multimediaState.items.length || (Date.now() - Number(multimediaState.lastIndexedAt || 0) > 120000);
    if(!shouldRefresh) return;
    multimediaState.loading = true;
    renderMultimediaContent();

    try{
      const limit = 2000;
      const resp = await fetch('/wa/media-index?limit=' + encodeURIComponent(limit));
      if(!resp.ok){
        throw new Error('media-index request failed');
      }
      const data = await resp.json().catch(() => null);
      const items = Array.isArray(data && data.items) ? data.items : [];
      if(Array.isArray(items) && items.length){
        // normalize items into expected structure
        multimediaState.items = items.map((it) => {
          return Object.assign({ id: it.id, kind: it.kind || 'asset', title: it.title || it.fileName || '', comment: it.comment || '', senderType: it.senderType || 'others', senderLabel: it.senderLabel || it.contactLabel || '', phone: it.phone || '', contactLabel: it.contactLabel || it.phone || '', timestamp: Number(it.timestamp || 0) || Date.now(), url: it.url || (it.mediaId ? ('/wa/media/' + encodeURIComponent(String(it.mediaId))) : null), mimeType: it.mimeType || it.type || '', fileName: it.fileName || it.name || '', messageId: it.messageId || '', messageKey: it.messageKey || '' }, it || {});
        }).sort((a,b) => Number(b.timestamp||0) - Number(a.timestamp||0));
        multimediaState.lastIndexedAt = Date.now();
        multimediaState.loading = false;
        renderMultimediaContent();
        return;
      }
      // fallback: server returned empty — perform a limited prioritized client-side scan
      console.warn('media-index empty, falling back to prioritized conversation scan');
    }catch(e){
      console.warn('collectMultimediaIndex failed, will fallback', e && e.message);
    }

    // --- fallback implementation ---
    try{
      const convResp = await fetch('/wa/conversations?limit=300');
      const convData = convResp.ok ? await convResp.json().catch(() => null) : null;
      const convs = Array.isArray(convData && convData.conversations) ? convData.conversations : [];
      const prioritized = [];
      const rest = [];
      const mediaHintRe = /\.(jpg|jpeg|png|gif|webp|pdf|mp4|mov|mkv|avi|docx?|xlsx?|pptx?|zip|rar)/i;
      const hasLinkRe = /https?:\/\/|www\./i;
      const now = Date.now();
      const recentThreshold = now - (30 * 24 * 60 * 60 * 1000);
      convs.forEach((c) =>{
        const lastText = String(c.lastText || c.lastMessagePreview || '');
        const lastTs = normalizeTimestamp(c.lastTimestamp || c.updatedAt || 0) || 0;
        if(hasLinkRe.test(lastText) || mediaHintRe.test(lastText) || lastTs >= recentThreshold){ prioritized.push(c); }
        else rest.push(c);
      });
      const queue = prioritized.concat(rest).slice(0, 120); // limit to 120 chats for fallback
      const map = new Map();
      const CONC = 8;
      const LIMIT = 200;
      const workers = [];
      for(let i=0;i<CONC;i++){
        workers.push((async function(){
          while(queue.length){
            const chat = queue.shift(); if(!chat) break;
            const phone = phoneKey(chat && (chat.phone || chat.id));
            if(!isReasonablePhoneDigits(phone)) continue;
            try{
              const r = await fetch('/wa/conversation?phone=' + encodeURIComponent(phone) + '&limit=' + LIMIT);
              if(!r.ok) continue;
              const d = await r.json().catch(()=>null);
              const list = Array.isArray(d && d.messages) ? d.messages : [];
              const contactLabel = String(chat && chat.name || '').trim() || formatDisplayPhone(phone);
              list.forEach((msg, idx) => {
                const ts = messageTimestamp(msg);
                const text = messageTextPreview(msg);
                const messageId = String(msg && (msg.id || msg.messageId || msg.waId || '') || '').trim() || ('idx_' + idx + '_' + ts);
                const mediaUrl = findMediaUrl(msg);
                const mime = String(msg && (msg.mimeType || msg.type || '') || '').trim();
                const fileName = String(msg && (msg.fileName || msg.filename || '') || '').trim();
                if(msg && (msg.sticker || String(msg.type || '').toLowerCase() === 'sticker')){
                  extractLinksFromText(text).forEach((url) => {
                    const id = 'l|' + phone + '|' + messageId + '|' + url;
                    if(!map.has(id)) map.set(id, { id, kind:'link', title: url, url, phone, contactLabel, timestamp: ts, messageId });
                  });
                  return;
                }
                if(mediaUrl || fileName){
                  const hint = [mediaUrl, mime, fileName, text].filter(Boolean).join(' ');
                  const kind = isImageLike(hint) || isVideoLike(hint) ? 'asset' : (isDocumentLike(hint) ? 'doc' : 'asset');
                  const id = 'm|' + phone + '|' + messageId + '|' + kind + '|' + (mediaUrl || fileName || '');
                  if(!map.has(id)) map.set(id, { id, kind, title: fileName || (kind==='doc'?'Documento':'Archivo'), url: mediaUrl||null, mimeType: mime||null, fileName: fileName||null, phone, contactLabel, timestamp: ts, messageId });
                }
                extractLinksFromText(text).forEach((url) => {
                  const id = 'l|' + phone + '|' + messageId + '|' + url;
                  if(!map.has(id)) map.set(id, { id, kind:'link', title: url, url, phone, contactLabel, timestamp: ts, messageId });
                });
              });
            }catch(_e){}
            // incremental render
            multimediaState.items = Array.from(map.values()).sort((a,b)=>Number(b.timestamp||0)-Number(a.timestamp||0));
            multimediaState.lastIndexedAt = Date.now();
            renderMultimediaContent();
          }
        })());
      }
      await Promise.all(workers);
      multimediaState.items = Array.from(map.values()).sort((a,b)=>Number(b.timestamp||0)-Number(a.timestamp||0));
      multimediaState.lastIndexedAt = Date.now();
      multimediaState.loading = false;
      renderMultimediaContent();
      return;
    }catch(fbErr){
      console.warn('fallback collect failed', fbErr && fbErr.message);
      multimediaState.loading = false;
      renderMultimediaContent();
      return;
    }
  }

  function setMultimediaTab(tabName){
    const next = (tabName === 'docs' || tabName === 'links') ? tabName : 'assets';
    multimediaState.activeTab = next;
    multimediaState.openRowMenuId = '';
    mediaTabButtons.forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-media-tab') === next);
    });
    renderMultimediaContent();
  }

  function setMultimediaSelecting(next){
    multimediaState.selecting = !!next;
    if(!multimediaState.selecting) multimediaState.selectedIds.clear();
    renderMultimediaContent();
  }

  function setMultimediaSortOpen(open){
    multimediaState.sortOpen = !!open;
    if(mediaFiltersEl){
      mediaFiltersEl.classList.toggle('open', multimediaState.sortOpen);
      mediaFiltersEl.setAttribute('aria-hidden', multimediaState.sortOpen ? 'false' : 'true');
    }
    if(mediaSortToggleEl) mediaSortToggleEl.classList.toggle('active', multimediaState.sortOpen);
  }

  function setMultimediaSearchOpen(open){
    multimediaState.searchOpen = !!open;
    if(mediaSearchInputEl){
      mediaSearchInputEl.classList.toggle('open', multimediaState.searchOpen);
      if(multimediaState.searchOpen) mediaSearchInputEl.focus();
      if(!multimediaState.searchOpen){
        mediaSearchInputEl.value = '';
        multimediaState.search = '';
      }
    }
    if(mediaSearchToggleEl) mediaSearchToggleEl.classList.toggle('active', multimediaState.searchOpen);
    renderMultimediaContent();
  }

  async function setMultimediaOpen(open){
    const isOpen = !!open;
    multimediaState.open = isOpen;
    if(mediaBackdropEl){
      mediaBackdropEl.classList.toggle('open', isOpen);
      mediaBackdropEl.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    }
    if(!isOpen){
      multimediaState.openRowMenuId = '';
      setMultimediaSelecting(false);
      closeMultimediaViewer();
      return;
    }

    multimediaState.hiddenIds = loadPersistedStringSet(MULTIMEDIA_HIDDEN_KEY);
    multimediaState.starredIds = loadPersistedStringSet(MULTIMEDIA_STARRED_KEY);
    setMultimediaTab('assets');
    setMultimediaSortOpen(false);
    setMultimediaSearchOpen(false);
    renderMultimediaContent();
    await collectMultimediaIndex(false);
  }

  function findMultimediaItemById(itemId){
    return multimediaState.items.find((item) => item.id === String(itemId || '')) || null;
  }

  function findConversationMessageForMultimediaItem(item){
    const list = Array.isArray(lastConversationMessages) ? lastConversationMessages : [];
    if(!item || !list.length) return null;

    const normalizeMediaUrlForMatch = (value) => {
      const raw = String(value || '').trim();
      if(!raw) return '';
      try{
        if(raw.startsWith('/wa/media/')) return raw.replace(/\?thumb=1$/i, '');
        const u = new URL(raw, window.location.origin);
        u.searchParams.delete('thumb');
        return (u.pathname || '') + (u.search || '');
      }catch(_e){
        return raw.replace(/\?thumb=1$/i, '');
      }
    };

    const itemUrl = normalizeMediaUrlForMatch(resolveMultimediaItemUrl(item));
    const itemFile = String(item.fileName || item.title || '').trim().toLowerCase();
    const itemMediaId = String(item.mediaId || '').trim();

    const targetMessageId = String(item.messageId || '').trim();
    const targetMessageKey = String(item.messageKey || '').trim();
    if(targetMessageId){
      const byId = list.find((m) => {
        const mid = String(m && (m.id || m.messageId || m.waId || '') || '').trim();
        return !!mid && (mid === targetMessageId || mid.startsWith(targetMessageId) || targetMessageId.startsWith(mid));
      });
      if(byId) return byId;
    }

    if(targetMessageKey){
      const byKey = list.find((m) => messageActionKey(m) === targetMessageKey);
      if(byKey) return byKey;
    }

    // Strong match by media URL / mediaId / filename.
    const byMedia = list.find((m) => {
      const msgUrl = normalizeMediaUrlForMatch(findMediaUrl(m));
      const msgFile = String(m && (m.fileName || m.filename || m.name || '') || '').trim().toLowerCase();
      const msgMediaId = String(m && (m.mediaId || '') || '').trim();
      if(itemUrl && msgUrl && (msgUrl === itemUrl || msgUrl.includes(itemUrl) || itemUrl.includes(msgUrl))) return true;
      if(itemMediaId && msgMediaId && itemMediaId === msgMediaId) return true;
      if(itemFile && msgFile && itemFile === msgFile) return true;
      return false;
    });
    if(byMedia) return byMedia;

    const itemTs = normalizeTimestamp(item.timestamp || 0);
    const itemComment = String(item.comment || '').trim().toLowerCase();
    if(itemTs){
      const byTs = list.find((m) => {
        const mts = normalizeTimestamp(messageTimestamp(m));
        if(Math.abs(mts - itemTs) > 90000) return false;
        if(!itemComment) return true;
        const txt = String(m && (m.text || m.caption || m.body || '') || '').trim().toLowerCase();
        return !itemComment || txt.includes(itemComment) || itemComment.includes(txt);
      });
      if(byTs) return byTs;
    }

    return null;
  }

  async function openChatByPhoneForMultimedia(phone, fallbackName){
    const key = phoneKey(phone);
    if(!key) return;
    const match = chats.find((c) => phoneKey(c.phone || c.id) === key) || { phone: key, name: fallbackName || ('+' + key) };
    setActiveModule('chats');
    await selectContact(match);
  }

  function resolveMultimediaItemUrl(item){
    if(!item) return '';
    const direct = String(item.url || '').trim();
    if(direct) return direct;
    const mediaId = String(item.mediaId || '').trim();
    if(mediaId) return '/wa/media/' + encodeURIComponent(mediaId);
    return '';
  }

  function getForwardableContacts(){
    const dedup = new Map();
    (Array.isArray(chats) ? chats : []).forEach((chat) => {
      const key = phoneKey(chat && (chat.phone || chat.id));
      if(!key) return;
      const current = dedup.get(key);
      const next = {
        phone: key,
        name: String(chat && chat.name || '').trim() || formatDisplayPhone(key),
        lastTs: normalizeTimestamp(chat && (chat.lastTimestamp || chat.updatedAt || chat.timestamp || 0) || 0)
      };
      if(!current || next.lastTs >= current.lastTs) dedup.set(key, next);
    });
    return Array.from(dedup.values()).sort((a, b) => Number(b.lastTs || 0) - Number(a.lastTs || 0));
  }

  function ensureMultimediaForwardPopup(){
    if(multimediaForwardRefs) return multimediaForwardRefs;

    const backdrop = document.createElement('div');
    backdrop.style.position = 'fixed';
    backdrop.style.inset = '0';
    backdrop.style.zIndex = '10120';
    backdrop.style.display = 'none';
    backdrop.style.alignItems = 'center';
    backdrop.style.justifyContent = 'center';
    backdrop.style.background = 'rgba(2,6,23,.55)';

    const modal = document.createElement('div');
    modal.style.width = 'min(560px, 94vw)';
    modal.style.maxHeight = 'min(80vh, 760px)';
    modal.style.background = '#fff';
    modal.style.border = '1px solid #dbe4ea';
    modal.style.borderRadius = '12px';
    modal.style.display = 'flex';
    modal.style.flexDirection = 'column';
    modal.style.overflow = 'hidden';

    const head = document.createElement('div');
    head.style.display = 'flex';
    head.style.flexDirection = 'column';
    head.style.gap = '8px';
    head.style.padding = '12px';
    head.style.borderBottom = '1px solid #e2e8f0';
    head.style.background = '#f8fafc';

    const title = document.createElement('div');
    title.textContent = 'Reenviar a contacto';
    title.style.fontSize = '.92rem';
    title.style.fontWeight = '800';
    title.style.color = '#0f172a';

    const search = document.createElement('input');
    search.type = 'search';
    search.placeholder = 'Buscar contacto...';
    search.style.height = '36px';
    search.style.border = '1px solid #cbd5e1';
    search.style.borderRadius = '9px';
    search.style.padding = '0 10px';
    search.style.fontSize = '.82rem';

    head.appendChild(title);
    head.appendChild(search);

    const list = document.createElement('div');
    list.style.flex = '1 1 auto';
    list.style.minHeight = '0';
    list.style.overflow = 'auto';
    list.style.padding = '8px';
    list.style.display = 'flex';
    list.style.flexDirection = 'column';
    list.style.gap = '6px';

    const foot = document.createElement('div');
    foot.style.display = 'flex';
    foot.style.justifyContent = 'flex-end';
    foot.style.gap = '8px';
    foot.style.padding = '10px 12px';
    foot.style.borderTop = '1px solid #e2e8f0';
    foot.style.background = '#fff';

    const cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.textContent = 'Cancelar';
    cancelBtn.style.height = '34px';
    cancelBtn.style.padding = '0 12px';
    cancelBtn.style.border = '1px solid #cbd5e1';
    cancelBtn.style.borderRadius = '8px';
    cancelBtn.style.background = '#fff';
    cancelBtn.style.cursor = 'pointer';

    const sendBtn = document.createElement('button');
    sendBtn.type = 'button';
    sendBtn.textContent = 'Reenviar';
    sendBtn.style.height = '34px';
    sendBtn.style.padding = '0 14px';
    sendBtn.style.border = '1px solid #0f766e';
    sendBtn.style.borderRadius = '8px';
    sendBtn.style.background = '#0f766e';
    sendBtn.style.color = '#fff';
    sendBtn.style.fontWeight = '700';
    sendBtn.style.cursor = 'pointer';

    foot.appendChild(cancelBtn);
    foot.appendChild(sendBtn);
    modal.appendChild(head);
    modal.appendChild(list);
    modal.appendChild(foot);
    backdrop.appendChild(modal);
    document.body.appendChild(backdrop);

    function close(){
      multimediaForwardState.open = false;
      backdrop.style.display = 'none';
      backdrop.setAttribute('aria-hidden', 'true');
      list.innerHTML = '';
    }

    async function confirm(){
      const phone = phoneKey(multimediaForwardState.selectedPhone);
      const item = multimediaForwardState.item;
      if(!phone || !item){
        alert('Selecciona un contacto para reenviar.');
        return;
      }
      const mediaUrl = resolveMultimediaItemUrl(item);
      const hint = [mediaUrl, item.mimeType, item.kind, item.title, item.fileName].filter(Boolean).join(' ');
      const isImage = !!mediaUrl && isImageLike(hint) && !isDocumentLike(hint);
      const textPayload = String(mediaUrl || item.comment || item.title || item.fileName || '').trim();
      if(!isImage && !textPayload){
        alert('Este elemento no tiene contenido para reenviar.');
        return;
      }

      sendBtn.disabled = true;
      try{
        const body = isImage
          ? { to: phone, imageUrl: mediaUrl, message: String(item.comment || '').trim() }
          : { to: phone, message: textPayload };
        const resp = await fetch('/send-whatsapp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
        const data = await resp.json().catch(() => ({}));
        if(!resp.ok){
          alert('No se pudo reenviar: ' + (data.error || resp.status));
          return;
        }
        close();
        alert('Reenviado correctamente.');
      }catch(_e){
        alert('No se pudo reenviar.');
      }finally{
        sendBtn.disabled = false;
      }
    }

    function renderList(){
      list.innerHTML = '';
      const q = String(multimediaForwardState.query || '').trim().toLowerCase();
      const contacts = getForwardableContacts().filter((c) => {
        if(!q) return true;
        return [c.name, c.phone, formatDisplayPhone(c.phone)].join(' ').toLowerCase().includes(q);
      });
      if(!contacts.length){
        const empty = document.createElement('div');
        empty.textContent = 'No hay contactos para mostrar.';
        empty.style.color = '#64748b';
        empty.style.fontSize = '.8rem';
        empty.style.padding = '10px';
        list.appendChild(empty);
        return;
      }
      contacts.forEach((c) => {
        const row = document.createElement('button');
        row.type = 'button';
        row.style.height = '44px';
        row.style.border = '1px solid #e2e8f0';
        row.style.borderRadius = '9px';
        row.style.background = '#fff';
        row.style.padding = '0 10px';
        row.style.display = 'flex';
        row.style.alignItems = 'center';
        row.style.justifyContent = 'space-between';
        row.style.cursor = 'pointer';
        row.style.gap = '8px';
        const selectedRow = phoneKey(multimediaForwardState.selectedPhone) === phoneKey(c.phone);
        if(selectedRow){
          row.style.borderColor = '#0f766e';
          row.style.background = '#ecfeff';
        }

        const left = document.createElement('div');
        left.style.minWidth = '0';
        left.style.display = 'flex';
        left.style.flexDirection = 'column';
        const name = document.createElement('span');
        name.textContent = c.name;
        name.style.fontSize = '.82rem';
        name.style.fontWeight = '700';
        name.style.color = '#0f172a';
        name.style.whiteSpace = 'nowrap';
        name.style.overflow = 'hidden';
        name.style.textOverflow = 'ellipsis';
        const phone = document.createElement('span');
        phone.textContent = formatDisplayPhone(c.phone);
        phone.style.fontSize = '.73rem';
        phone.style.color = '#64748b';
        left.appendChild(name);
        left.appendChild(phone);

        const ts = document.createElement('span');
        ts.textContent = formatChatTime(c.lastTs || 0);
        ts.style.fontSize = '.7rem';
        ts.style.color = '#64748b';

        row.appendChild(left);
        row.appendChild(ts);
        row.addEventListener('click', () => {
          multimediaForwardState.selectedPhone = c.phone;
          renderList();
        });
        list.appendChild(row);
      });
    }

    search.addEventListener('input', () => {
      multimediaForwardState.query = String(search.value || '');
      renderList();
    });
    cancelBtn.addEventListener('click', close);
    sendBtn.addEventListener('click', confirm);
    backdrop.addEventListener('click', (ev) => {
      if(ev.target === backdrop) close();
    });

    multimediaForwardRefs = {
      backdrop,
      search,
      renderList,
      close
    };
    return multimediaForwardRefs;
  }

  function openMultimediaForwardPopup(item){
    const refs = ensureMultimediaForwardPopup();
    multimediaForwardState.open = true;
    multimediaForwardState.item = item || null;
    multimediaForwardState.query = '';
    multimediaForwardState.selectedPhone = '';
    refs.backdrop.style.display = 'flex';
    refs.backdrop.setAttribute('aria-hidden', 'false');
    refs.search.value = '';
    refs.renderList();
    try{ refs.search.focus(); }catch(_e){}
  }

  async function runMultimediaAction(action, itemId){
    const item = findMultimediaItemById(itemId);
    if(!item) return;

    if(action === 'download'){
      if(item.url) window.open(item.url, '_blank', 'noopener');
      return;
    }
    if(action === 'go'){
      await setMultimediaOpen(false);
      // prevent automatic scroll-to-bottom while we focus the original message
      suppressAutoScrollUntil = Date.now() + 4000;
      await openChatByPhoneForMultimedia(item.phone, item.contactLabel);
      // Prefer resolved conversation message before raw ids.
      const sourceMessage = findConversationMessageForMultimediaItem(item);
      let msgId = sourceMessage ? messageActionKey(sourceMessage) : String(item.messageKey || item.messageId || '').trim();
      if(msgId){
        try{
          await focusMessageByKey(msgId);
        }catch(_e){}
      }
      return;
    }
    if(action === 'reply'){
      await setMultimediaOpen(false);
      await openChatByPhoneForMultimedia(item.phone, item.contactLabel);
      const sourceMessage = findConversationMessageForMultimediaItem(item);
      if(sourceMessage){
        const sourceKey = messageActionKey(sourceMessage);
        setReplyContextFromMessage(sourceMessage, sourceKey);
      } else {
        pendingReplyContext = {
          key: String(item.messageKey || item.messageId || item.id || ''),
          sender: String(item.senderLabel || item.contactLabel || 'Cliente'),
          text: String(item.comment || item.title || item.fileName || item.url || '[Mensaje]').slice(0, 280),
          messageId: String(item.messageId || '')
        };
        renderReplyPreview(true);
      }
      if(msgInput) msgInput.focus();
      return;
    }
    if(action === 'forward'){
      await setMultimediaOpen(false);
      openMultimediaForwardPopup(item);
      return;
    }
    if(action === 'star'){
      await setMultimediaOpen(false);
      suppressAutoScrollUntil = Date.now() + 4000;
      await openChatByPhoneForMultimedia(item.phone, item.contactLabel);

      const sourceMessage = findConversationMessageForMultimediaItem(item);
      let msgId = sourceMessage ? messageActionKey(sourceMessage) : String(item.messageKey || item.messageId || '').trim();

      if(sourceMessage && msgId){
        const messageText = String(sourceMessage.text || sourceMessage.caption || item.comment || item.title || '').trim();
        const nowStarred = !!toggleSelectedMessageStar(msgId, messageText);
        if(nowStarred) multimediaState.starredIds.add(item.id);
        else multimediaState.starredIds.delete(item.id);
        savePersistedStringSet(MULTIMEDIA_STARRED_KEY, multimediaState.starredIds);
        renderConversation(lastConversationMessages);
        renderClientRightPanel();
      }else{
        if(multimediaState.starredIds.has(item.id)) multimediaState.starredIds.delete(item.id);
        else multimediaState.starredIds.add(item.id);
        savePersistedStringSet(MULTIMEDIA_STARRED_KEY, multimediaState.starredIds);
      }

      if(msgId){
        try{ await focusMessageByKey(msgId); }catch(_e){}
      }
      return;
    }
    if(action === 'copy'){
      try{
        const text = String(resolveMultimediaItemUrl(item) || item.comment || item.title || item.fileName || '');
        if(text){
          await navigator.clipboard.writeText(text);
        }
      }catch(_e){
        try{ window.prompt('Copiar (Ctrl+C + Enter):', String(resolveMultimediaItemUrl(item) || item.comment || item.title || item.fileName || '')); }catch(__e){}
      }
      return;
    }
    if(action === 'delete'){
      await setMultimediaOpen(false);
      await openChatByPhoneForMultimedia(item.phone, item.contactLabel);
      const sourceMessage = findConversationMessageForMultimediaItem(item);
      if(sourceMessage){
        const sourceKey = messageActionKey(sourceMessage);
        openDeleteMessagePopup(sourceMessage, sourceKey);
        return;
      }

      // Fallback when original message cannot be resolved in current conversation cache.
      multimediaState.hiddenIds.add(item.id);
      savePersistedStringSet(MULTIMEDIA_HIDDEN_KEY, multimediaState.hiddenIds);
      multimediaState.selectedIds.delete(item.id);
      renderMultimediaContent();
      alert('No se encontro el mensaje original; se oculto del modulo multimedia.');
    }
  }

  function sleep(ms){ return new Promise((res) => setTimeout(res, ms)); }

  async function focusMessageByKey(messageKey){
    if(!messageKey) return false;
    const needle = String(messageKey || '');
    // try to find message element up to 40 times (~4s)
    for(let i=0;i<40;i++){
      if(!convEl) { await sleep(50); continue; }

      // 1) exact match using escaped selector
      let el = convEl.querySelector('.msg-row[data-message-key="' + cssEscapeValue(needle) + '"]');

      // 2) broad search: compare dataset values (startsWith/includes) for mismatched normalization
      if(!el){
        const rows = convEl.querySelectorAll('.msg-row');
        for(const r of rows){
          try{
            const dk = String(r.getAttribute('data-message-key') || '');
            if(!dk) continue;
            if(dk === needle || dk.startsWith(needle) || needle.startsWith(dk) || dk.indexOf(needle) >= 0 || needle.indexOf(dk) >= 0){
              el = r;
              break;
            }
          }catch(_e){}
        }
      }

      // 3) try to find corresponding message object and resolve its action key
      if(!el){
        try{
          const msgObj = findConversationMessageByKey(needle);
          if(msgObj){
            const ak = messageActionKey(msgObj) || '';
            if(ak) el = convEl.querySelector('.msg-row[data-message-key="' + cssEscapeValue(ak) + '"]');
          }
        }catch(_e){}
      }

      if(el){
        // suppress automatic "scroll to bottom" behavior for a short time
        suppressAutoScrollUntil = Date.now() + 3000;
        try{ el.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
        catch(_e){ el.scrollIntoView(); }
        try{ el.classList.add('msg-highlight'); }catch(_e){}
        setTimeout(() => { try{ el.classList.remove('msg-highlight'); }catch(_e){} }, 2200);
        return true;
      }

      await sleep(100);
    }
    return false;
  }

  async function runMultimediaBatchAction(action){
    const ids = Array.from(multimediaState.selectedIds);
    if(!ids.length) return;
    const items = ids.map(findMultimediaItemById).filter(Boolean);
    if(!items.length) return;

    if(action === 'delete'){
      items.forEach((item) => multimediaState.hiddenIds.add(item.id));
      savePersistedStringSet(MULTIMEDIA_HIDDEN_KEY, multimediaState.hiddenIds);
      setMultimediaSelecting(false);
      renderMultimediaContent();
      return;
    }
    if(action === 'star'){
      items.forEach((item) => multimediaState.starredIds.add(item.id));
      savePersistedStringSet(MULTIMEDIA_STARRED_KEY, multimediaState.starredIds);
      setMultimediaSelecting(false);
      return;
    }
    if(action === 'download'){
      items.slice(0, 12).forEach((item) => {
        if(item.url) window.open(item.url, '_blank', 'noopener');
      });
      return;
    }
    if(action === 'forward'){
      const first = items[0];
      await setMultimediaOpen(false);
      await openChatByPhoneForMultimedia(first.phone, first.contactLabel);
      if(msgInput){
        msgInput.value = items.slice(0, 5).map((item) => item.url || item.title || item.comment).filter(Boolean).join('\n');
        msgInput.focus();
      }
    }
  }

  async function harvestMediaFromRecentChats(){
    if(mediaHarvesting) return;
    mediaHarvesting = true;
    try{
      const recent = chats.slice(0, 30);
      for(const chat of recent){
        const phone = String(chat.phone || '').replace(/\D+/g, '');
        if(!isReasonablePhoneDigits(phone)) continue;
        const resp = await fetch('/wa/conversation?phone=' + encodeURIComponent(phone) + '&limit=1000');
        if(!resp.ok) continue;
        const data = await resp.json().catch(() => null);
        const msgs = data && Array.isArray(data.messages) ? data.messages : [];
        ingestMediaFromMessages(chat, msgs);
      }
      mediaHydrated = true;
    }catch(e){
      console.warn('harvestMediaFromRecentChats', e);
    }
    mediaHarvesting = false;
  }

  async function loadConversation(c){
    const phone = String(c.phone||'').replace(/\D+/g,'');
    if(!phone){
      renderConversationEmptyState('Numero invalido');
      return;
    }
    try{
      const phoneDigits = String(phone).replace(/\D+/g,'');
      if(!isReasonablePhoneDigits(phoneDigits)){
        renderConversationEmptyState('Numero invalido');
        return;
      }
      const resp = await fetch('/wa/conversation?phone='+encodeURIComponent(phoneDigits)+'&limit=1000');
      const data = resp.ok ? await resp.json().catch(()=>null) : null;
      const msgs = data && Array.isArray(data.messages) ? data.messages : [];
      lastConversationMessages = msgs.slice();
      lastLoadedPhoneDigits = phoneDigits;
      lastLoadedConversationTs = normalizeTimestamp(c.lastTimestamp || 0);

      const flow = extractConversationFlowStats(msgs);
      const latestMsg = msgs[msgs.length - 1] || {};
      const latestTs = normalizeTimestamp(latestMsg.timestamp || c.lastTimestamp || 0) || normalizeTimestamp(c.lastTimestamp || 0) || Date.now();
      const latestPreview = String(latestMsg.text || latestMsg.caption || c.lastText || '').trim();
      lastLoadedConversationSig = phoneDigits + '|' + String(lastLoadedConversationTs) + '|' + latestPreview;
      const metaBefore = getMeta(phoneDigits);
      const seenTs = Number(metaBefore.lastSeenTs || 0);
      let pendingClientCount = 0;
      msgs.forEach((msg) => {
        const ts = Number(msg && (msg.timestamp || msg.createdAt || msg.sentAt) || 0);
        if(!ts || ts <= seenTs) return;
        if(normalizeMessageDirection(msg) === 'in') pendingClientCount += 1;
      });
      const chatIsRead = !!(selected && phoneKey(selected.phone) === phoneDigits);
      setMeta(phoneDigits, {
        lastInboundTs: flow.lastInboundTs,
        lastOutboundTs: flow.lastOutboundTs,
        lastMessageTs: latestTs,
        lastMessagePreview: latestPreview,
        pendingClientCount: chatIsRead ? 0 : pendingClientCount,
        read: chatIsRead ? true : (pendingClientCount > 0 ? false : metaBefore.read)
      });

      if(selected && phoneKey(selected.phone) === phoneDigits){
        selected.pendingClientCount = 0;
        selected.read = true;
      }

      ingestMediaFromMessages(c, msgs);

      if(!msgs.length){
        renderConversationEmptyState('Sin mensajes en esta conversacion.');
      } else {
        renderConversation(msgs);
      }
    }catch(e){
      console.warn('loadConversation',e);
      renderConversationEmptyState('No se pudo cargar conversacion');
    }
  }

  function renderConversation(messages, options){
    if(!convEl) return;
    const opts = Object.assign({ forceScroll: false }, options || {});
    let shouldStickBottom = !!opts.forceScroll || isConversationNearBottom();
    // If we recently focused a message, avoid forcing the view to bottom for a short window
    if(Date.now() < Number(suppressAutoScrollUntil || 0)){
      shouldStickBottom = false;
    }
    convEl.innerHTML = '';
    openMessageMenuKey = '';
    const seen = new Set();
    const starredMessageKeys = new Set(getSelectedStarredMessageKeys());
    const hiddenMessageIds = new Set((selected && Array.isArray(getMeta(selected.phone).hiddenMessageIds)) ? getMeta(selected.phone).hiddenMessageIds.map((item) => String(item || '')) : []);
    const filtered = (messages||[]).filter((m)=>{
      const id = String(m && (m.id||m.messageId||m.waId||'')).slice(0,64);
      if(!id) return true;
      if(seen.has(id)) return false;
      seen.add(id);
      return true;
    }).filter((m) => {
      const key = messageActionKey(m);
      return !hiddenMessageIds.has(key);
    }).slice();

    filtered.sort((a,b)=> (normalizeTimestamp(a.timestamp||0) - normalizeTimestamp(b.timestamp||0)));

    const frag = document.createDocumentFragment();
    filtered.forEach((m)=>{
      const actionKey = messageActionKey(m);
      const isStarred = starredMessageKeys.has(actionKey);
      const shouldAnimateStar = isStarred && actionKey === lastStarAnimatedKey && Date.now() < lastStarAnimatedUntil;
      const row = document.createElement('div');
      row.className = 'msg-row ' + (m.direction === 'out' ? 'out' : 'in');
      row.setAttribute('data-message-key', actionKey);

      const bubble = document.createElement('div');
      bubble.className = 'msg-bubble ' + (m.direction === 'out' ? 'msg-out' : 'msg-in');
      if(isStarred) bubble.classList.add('msg-starred');
      if(shouldAnimateStar) bubble.classList.add('msg-starred-animate');
      const mediaUrl = findMediaUrl(m);
      const msgType = String(m.type || '').toLowerCase();
      const isSticker = msgType === 'sticker';
      const replySender = String(m.replyToSender || (m.replyTo && m.replyTo.sender) || '').trim();
      const replyText = String(m.replyToText || (m.replyTo && m.replyTo.text) || '').trim();
      const replyMediaUrl = String(m.replyToMediaUrl || (m.replyTo && m.replyTo.mediaUrl) || '').trim();
      const replyMimeType = String(m.replyToMimeType || (m.replyTo && m.replyTo.mimeType) || '').trim();
      const replyFileName = String(m.replyToFileName || (m.replyTo && m.replyTo.fileName) || '').trim();
      const replyKind = String(m.replyToKind || (m.replyTo && m.replyTo.kind) || '').trim();

      if(replyText || replyMediaUrl){
        const quote = document.createElement('div');
        quote.className = 'msg-reply-quote';

        const headerEl = document.createElement('div');
        headerEl.className = 'msg-reply-header';
        headerEl.textContent = (replySender || 'Tu') + ':';

        const textEl = document.createElement('div');
        textEl.className = 'msg-reply-text';
        if(replyMediaUrl && isDocumentLike([replyMediaUrl, replyMimeType, replyKind, replyText].filter(Boolean).join(' '))){
          const label = document.createElement('span');
          label.className = 'msg-reply-doc-label';
          label.textContent = replyFileName || replyText || 'Documento';
          textEl.appendChild(label);
        }else{
          textEl.textContent = replyText;
        }

        quote.appendChild(headerEl);
        quote.appendChild(textEl);
        bubble.appendChild(quote);
      }

      if(isSticker && mediaUrl){
        const img = document.createElement('img');
        img.src = mediaUrl;
        img.alt = 'Sticker';
        img.loading = 'lazy';
        img.style.maxWidth = '180px';
        img.style.maxHeight = '180px';
        img.style.borderRadius = '10px';
        img.style.display = 'block';
        img.onload = () => {
          if(shouldStickBottom || isConversationNearBottom()){
            scrollConversationToBottom();
          }
        };
        img.onerror = () => {
          const fallback = document.createElement('div');
          fallback.textContent = m.text || '[Sticker]';
          bubble.appendChild(fallback);
        };
        bubble.appendChild(img);
      } else {
        const mime = String(m.mimeType || m.type || '').toLowerCase();
        const mediaHint = (mediaUrl || '') + ' ' + mime + ' ' + String(m.fileName || m.filename || '');
        const isImage = !!mediaUrl && isImageLike(mediaHint);
        const isVideo = !!mediaUrl && isVideoLike(mediaHint);
        const isDocument = !!mediaUrl && isDocumentLike(mediaHint);
        const isAudio = !!mediaUrl && (!isImage && !isVideo && !isDocument && (mime.includes('audio') || /\.(mp3|wav|ogg|m4a)$/i.test(mediaUrl || '')));
        const rawText = String(m.text || m.caption || '').trim();
        const looksLikePlaceholder = /^\[(image|video|audio|document|file|sticker)\]$/i.test(rawText);

        if(isImage){
          const img = document.createElement('img');
          img.src = mediaUrl;
          img.alt = 'Imagen';
          img.loading = 'lazy';
          img.style.maxWidth = '220px';
          img.style.maxHeight = '220px';
          img.style.borderRadius = '10px';
          img.style.display = 'block';
          img.style.marginBottom = '6px';
          bubble.appendChild(img);
        }else if(isVideo){
          const video = document.createElement('video');
          video.controls = true;
          video.preload = 'metadata';
          video.style.maxWidth = '240px';
          video.style.maxHeight = '240px';
          video.style.borderRadius = '10px';
          video.style.display = 'block';
          video.style.marginBottom = '6px';
          video.style.background = '#000';
          video.src = mediaUrl;
          bubble.appendChild(video);
        }else if(isAudio){
          const audio = document.createElement('audio');
          audio.controls = true;
          audio.preload = 'metadata';
          audio.style.width = '220px';
          audio.style.maxWidth = '100%';
          audio.style.marginBottom = '6px';
          audio.src = mediaUrl;
          bubble.appendChild(audio);
        }else if(isDocument){
          const isPdf = mime.includes('pdf') || /\.pdf$/i.test(String(m.fileName||m.filename||mediaUrl||''));
          // Build a WhatsApp-like file card
          const card = document.createElement('div');
          card.className = 'wa-file-card';
          card.style.display = 'flex';
          card.style.alignItems = 'center';
          card.style.maxWidth = '360px';
          card.style.border = '1px solid #e6edf3';
          card.style.borderRadius = '10px';
          card.style.padding = '8px';
          card.style.marginBottom = '6px';
          card.style.background = '#ffffff';

          const thumb = document.createElement('canvas');
          thumb.className = 'wa-file-card-canvas';
          thumb.style.width = '64px';
          thumb.style.height = '64px';
          thumb.style.flex = '0 0 64px';
          thumb.style.marginRight = '10px';
          thumb.style.background = '#f1f5f9';
          // attempt to render PDF first page into canvas
          const thumbUrl = getThumbnailUrl(mediaUrl);
          if(isPdf){
            // try to load server-side thumbnail (SVG or image)
            const imgThumb = new Image();
            imgThumb.width = 64; imgThumb.height = 64;
            imgThumb.alt = 'PDF miniatura';
            imgThumb.style.width = '64px'; imgThumb.style.height = '64px';
            imgThumb.style.objectFit = 'cover';
            imgThumb.src = thumbUrl;
            imgThumb.onload = () => {
              try{ const ctx = thumb.getContext && thumb.getContext('2d'); if(ctx){ thumb.width = 64; thumb.height = 64; ctx.drawImage(imgThumb,0,0,64,64); } }catch(_e){}
            };
            imgThumb.onerror = () => {
              // fallback to client render attempt
              if(window.pdfjsLib) renderPdfThumbnail(mediaUrl, thumb, 160, 200);
            };
          } else {
            // fallback: draw simple label
            const ctx = thumb.getContext && thumb.getContext('2d');
            if(ctx){
              thumb.width = 64; thumb.height = 64;
              ctx.fillStyle = isPdf ? '#e53e3e' : '#6b7280';
              ctx.fillRect(0,0,64,64);
              ctx.fillStyle = '#fff';
              ctx.font = '700 14px sans-serif';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillText(isPdf ? 'PDF' : 'FILE', 32, 32);
            }
          }

          const info = document.createElement('div');
          info.style.flex = '1';
          info.style.minWidth = '0';

          const nameEl = document.createElement('div');
          nameEl.style.fontSize = '0.95rem';
          nameEl.style.fontWeight = '600';
          nameEl.style.color = '#0f172a';
          nameEl.style.whiteSpace = 'nowrap';
          nameEl.style.overflow = 'hidden';
          nameEl.style.textOverflow = 'ellipsis';
          nameEl.textContent = String(m.fileName || m.filename || mediaUrl || 'Archivo');

          const metaEl = document.createElement('div');
          metaEl.style.fontSize = '0.82rem';
          metaEl.style.color = '#6b7280';
          const sizeText = (Number(m.fileSize || m.size || 0) > 0) ? (Math.round(Number(m.fileSize||m.size)/102.4)/10 + ' KB') : '';
          metaEl.textContent = (isPdf ? 'Documento PDF' : 'Archivo') + (sizeText ? (' · ' + sizeText) : '');

          info.appendChild(nameEl);
          info.appendChild(metaEl);

          const action = document.createElement('a');
          action.href = mediaUrl || '#';
          action.target = '_blank';
          action.rel = 'noopener noreferrer';
          action.className = 'wa-file-download-btn';
          action.setAttribute('title', 'Descargar');
          action.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="#0b69ff"/><path d="M12 7v6m0 0l-3-3m3 3l3-3" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

          card.appendChild(thumb);
          card.appendChild(info);
          card.appendChild(action);
          bubble.appendChild(card);
        }

        if(rawText && !(mediaUrl && looksLikePlaceholder)){
          const fragText = linkifyText(rawText);
          const wrapper = document.createElement('span');
          wrapper.className = 'msg-text';
          wrapper.appendChild(fragText);
          bubble.appendChild(wrapper);
        }
      }

      const meta = document.createElement('span');
      meta.className = 'msg-meta';
      try{
        const ts = normalizeTimestamp(m.timestamp||0) || Date.now();
        meta.textContent = new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }catch(_e){
        meta.textContent = '';
      }

      if(isStarred){
        const starTail = document.createElement('span');
        starTail.className = 'msg-meta-star';
        starTail.setAttribute('title', 'Mensaje destacado');
        starTail.setAttribute('aria-label', 'Mensaje destacado');
        starTail.textContent = ' \u2605';
        meta.appendChild(starTail);
      }

      if(m.direction === 'out' || m.direction === 'in'){
        const toggleBtn = document.createElement('button');
        toggleBtn.type = 'button';
        toggleBtn.className = 'msg-actions-toggle';
        toggleBtn.setAttribute('title', 'Opciones de mensaje');
        toggleBtn.setAttribute('aria-label', 'Opciones de mensaje');
        toggleBtn.setAttribute('data-msg-menu-toggle', actionKey);
        toggleBtn.textContent = 'v';

        const menu = document.createElement('div');
        menu.className = 'msg-actions-menu';
        menu.setAttribute('data-msg-menu', actionKey);

        const actions = [
          { key: 'reply', label: 'RESPONDER' },
          { key: 'pin', label: isStarred ? 'QUITAR DESTACADO' : 'DESTACAR MENSAJE' },
          { key: 'forward', label: 'REENVIAR' },
          { key: 'delete', label: 'ELIMINAR MENSAJE', danger: true }
        ];

        actions.forEach((item) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'msg-action-item' + (item.danger ? ' danger' : '');
          btn.setAttribute('data-msg-action', item.key);
          btn.setAttribute('data-message-key', actionKey);
          btn.textContent = item.label;
          menu.appendChild(btn);
        });

        bubble.appendChild(toggleBtn);
        bubble.appendChild(menu);
      }

      bubble.appendChild(meta);

      row.appendChild(bubble);
      frag.appendChild(row);
    });

    convEl.appendChild(frag);
    if(shouldStickBottom){
      // force scroll now and a few times later to beat layout changes
      scrollConversationToBottom(true);
      try{ requestAnimationFrame(() => scrollConversationToBottom(true)); }catch(_e){}
      setTimeout(() => scrollConversationToBottom(true), 120);
      setTimeout(() => scrollConversationToBottom(true), 420);
      setTimeout(() => scrollConversationToBottom(true), 1000);
    }
  }

  function renderReplyPreview(animate){
    if(!replyPreviewEl || !replyPreviewSenderEl || !replyPreviewTextEl) return;
    if(!pendingReplyContext){
      replyPreviewEl.classList.remove('show');
      replyPreviewEl.setAttribute('aria-hidden', 'true');
      setTimeout(() => {
        if(!pendingReplyContext && replyPreviewEl) replyPreviewEl.style.display = 'none';
      }, 220);
      return;
    }

    replyPreviewSenderEl.textContent = String(pendingReplyContext.sender || 'Cliente') + ':';
    try{
      const replyText = String(pendingReplyContext.text || '');
      replyPreviewTextEl.innerHTML = '';
      const replyMediaUrl = String(pendingReplyContext.mediaUrl || '').trim();
      const replyMime = String(pendingReplyContext.mimeType || '').trim();
      const replyKind = String(pendingReplyContext.kind || '').trim();
      const replyHint = [replyMediaUrl, replyMime, replyKind, replyText].filter(Boolean).join(' ');
      if(replyMediaUrl && isDocumentLike(replyHint)){
        const label = document.createElement('span');
        label.className = 'wa-reply-doc-label';
        label.textContent = String(pendingReplyContext.fileName || replyText || 'Documento');
        replyPreviewTextEl.appendChild(label);
      }else{
        replyPreviewTextEl.appendChild(linkifyText(replyText));
      }
    }catch(_e){
      replyPreviewTextEl.textContent = String(pendingReplyContext.text || '');
    }
    replyPreviewEl.style.display = 'flex';
    replyPreviewEl.setAttribute('aria-hidden', 'false');
    if(animate){
      replyPreviewEl.classList.remove('show');
      void replyPreviewEl.offsetHeight;
    }
    replyPreviewEl.classList.add('show');
  }

  function clearReplyContext(){
    pendingReplyContext = null;
    renderReplyPreview(false);
  }

  function resolveReplySenderLabel(message){
    const direction = normalizeMessageDirection(message);
    if(direction === 'out') return 'Tu';
    const fullName = String((selected && selected.name) || '').trim();
    if(fullName) return fullName;
    return formatDisplayPhone((selected && selected.phone) || '');
  }

  function setReplyContextFromMessage(message, messageKey){
    let text = String(message && (message.text || message.caption || message.body || '') || '').trim();
    const mediaUrl = String(findMediaUrl(message) || '').trim();
    const mimeType = String(message && (message.mimeType || message.type || '') || '').trim();
    const kind = String(normalizeMediaKind(mediaUrl, mimeType) || '').trim();
    const fileName = String(message && (message.fileName || message.filename || message.name || (message.document && (message.document.fileName || message.document.name)) ) || '').trim();
    // If there's no textual content, build a short preview from media metadata
    if(!text){
      // prefer a filename if available
      if(fileName) text = '[' + fileName + ']';
      else if(String(mimeType || '').toLowerCase().includes('pdf')) text = '[PDF]';
      else if(kind) text = '[' + kind + ']';
      else text = '[Mensaje]';
    }
    const remoteMessageId = extractRemoteMessageId(message);
    pendingReplyContext = {
      key: String(messageKey || ''),
      sender: resolveReplySenderLabel(message),
      text: String(text || '').slice(0, 280),
      messageId: remoteMessageId || '',
      mediaUrl: mediaUrl || '',
      mimeType: mimeType || '',
      fileName: fileName || '',
      kind: kind || ''
    };
    renderReplyPreview(true);
    if(msgInput){
      msgInput.focus();
    }
  }

  function extractRemoteMessageId(message){
    const candidate = String(message && (message.waId || message.messageId || message.id || '') || '').trim();
    if(!candidate) return '';
    if(/^local_/i.test(candidate)) return '';
    return candidate;
  }

  function messageActionKey(message){
    const direct = String(message && (message.id || message.messageId || message.waId || '') || '').trim();
    if(direct) return direct;
    const ts = normalizeTimestamp(message && message.timestamp || 0) || 0;
    const dir = normalizeMessageDirection(message);
    const text = String(message && (message.text || message.caption || '') || '').slice(0, 80);
    return [dir, ts, text].join('|');
  }

  function getSelectedStarredMessageKeys(){
    if(!selected) return [];
    const meta = getMeta(selected.phone);
    return Array.isArray(meta.starredMessageIds) ? meta.starredMessageIds.map((item) => String(item || '')) : [];
  }

  function setSelectedStarredMessageKeys(keys){
    if(!selected) return;
    const list = Array.isArray(keys) ? keys.map((item) => String(item || '')).filter(Boolean) : [];
    setMeta(selected.phone, { starredMessageIds: list.slice(-500) });
  }

  function toggleSelectedMessageStar(messageKey, messageText){
    if(!selected) return false;
    const key = String(messageKey || '').trim();
    if(!key) return false;

    const current = getSelectedStarredMessageKeys();
    const hasStar = current.includes(key);
    const next = hasStar ? current.filter((item) => item !== key) : current.concat([key]);
    setSelectedStarredMessageKeys(next);
    if(!hasStar){
      lastStarAnimatedKey = key;
      lastStarAnimatedUntil = Date.now() + 1400;
    }

    const meta = getMeta(selected.phone);
    const pinnedMessages = Array.isArray(meta.pinnedMessages) ? meta.pinnedMessages.slice() : [];
    const safeText = String(messageText || '').trim() || '[Mensaje sin texto]';
    if(hasStar){
      const idx = pinnedMessages.findIndex((item) => String(item || '').trim() === safeText);
      if(idx >= 0) pinnedMessages.splice(idx, 1);
    } else {
      pinnedMessages.unshift(safeText);
    }
    setMeta(selected.phone, { pinnedMessages: pinnedMessages.slice(0, 300) });

    return !hasStar;
  }

  function closeMessageMenus(){
    openMessageMenuKey = '';
    if(!convEl) return;
    convEl.querySelectorAll('.msg-row.msg-menu-open').forEach((el) => el.classList.remove('msg-menu-open'));
    convEl.querySelectorAll('.msg-actions-menu.open, .msg-actions-menu.open-up').forEach((el) => {
      el.classList.remove('open');
      el.classList.remove('open-up');
      el.style.visibility = '';
    });
  }

  function toggleMessageMenuForKey(key){
    if(!convEl) return;
    const next = String(key || '');
    if(!next) return;
    const menu = convEl.querySelector('.msg-actions-menu[data-msg-menu="' + cssEscapeValue(next) + '"]');
    const toggleBtn = convEl.querySelector('[data-msg-menu-toggle="' + cssEscapeValue(next) + '"]');
    if(!menu) return;
    const shouldOpen = openMessageMenuKey !== next;
    closeMessageMenus();
    if(shouldOpen){
      menu.classList.remove('open-up');
      menu.classList.add('open');
      menu.style.visibility = 'hidden';
      const row = menu.closest('.msg-row');
      if(row) row.classList.add('msg-menu-open');

      const margin = 8;
      const menuHeight = Math.max(menu.offsetHeight || 0, 160);
      const anchorRect = toggleBtn ? toggleBtn.getBoundingClientRect() : menu.getBoundingClientRect();
      const convRect = convEl.getBoundingClientRect();
      const spaceBelowViewport = window.innerHeight - anchorRect.bottom - margin;
      const spaceBelowConversation = convRect.bottom - anchorRect.bottom - margin;
      const usableBelow = Math.min(spaceBelowViewport, spaceBelowConversation);

      if(usableBelow < menuHeight){
        menu.classList.add('open-up');
      }

      menu.style.visibility = '';
      openMessageMenuKey = next;
    }
  }

  function cssEscapeValue(value){
    if(typeof CSS !== 'undefined' && CSS && typeof CSS.escape === 'function'){
      return CSS.escape(String(value || ''));
    }
    return String(value || '').replace(/(["\\])/g, '\\$1');
  }

  async function renderPdfThumbnail(url, canvasEl, maxWidth, maxHeight){
    if(!window.pdfjsLib || !canvasEl || !url) return;
    try{
      // download PDF as ArrayBuffer (avoids cross-origin fetch issues when PDF.js tries to fetch directly)
      const resp = await fetch(url, { method: 'GET', credentials: 'same-origin' });
      if(!resp.ok) throw new Error('PDF fetch failed: ' + resp.status);
      const data = await resp.arrayBuffer();
      const loadingTask = window.pdfjsLib.getDocument({ data });
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1 });
      const scale = Math.min((maxWidth || 160)/viewport.width, (maxHeight || 200)/viewport.height, 2);
      const scaledViewport = page.getViewport({ scale });
      canvasEl.width = Math.round(scaledViewport.width);
      canvasEl.height = Math.round(scaledViewport.height);
      const ctx = canvasEl.getContext('2d');
      const renderContext = { canvasContext: ctx, viewport: scaledViewport };
      await page.render(renderContext).promise;
      try{ pdf.destroy(); }catch(_e){}
    }catch(err){
      console.error('renderPdfThumbnail error for', url, err && (err.message || err));
      // ignore render errors — leave fallback UI
    }
  }

  function getThumbnailUrl(url){
    try{
      if(!url) return url;
      const s = String(url || '');
      if(s.indexOf('/wa/media/') === 0){
        return s + (s.includes('?') ? '&thumb=1' : '?thumb=1');
      }
      return s;
    }catch(_e){ return url; }
  }

  function findConversationMessageByKey(key){
    const needle = String(key || '');
    if(!needle) return null;
    return (Array.isArray(lastConversationMessages) ? lastConversationMessages : []).find((item) => messageActionKey(item) === needle) || null;
  }

  function rememberMessageHiddenForMe(key){
    if(!selected) return;
    const safeKey = String(key || '').trim();
    if(!safeKey) return;
    const meta = getMeta(selected.phone);
    const list = Array.isArray(meta.hiddenMessageIds) ? meta.hiddenMessageIds.slice() : [];
    if(!list.includes(safeKey)) list.push(safeKey);
    setMeta(selected.phone, { hiddenMessageIds: list.slice(-300) });
  }

  async function deleteMessageForEveryone(message, messageKey){
    const messageId = String(message && (message.waId || message.messageId || message.id || '') || '').trim();
    if(!messageId || /^local_/i.test(messageId)){
      alert('Este mensaje aun no tiene ID de WhatsApp para eliminarlo para todos.');
      return;
    }
    const phone = phoneKey(selected && selected.phone);
    const resp = await fetch('/wa/delete-message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messageId, phone })
    });
    const data = await resp.json().catch(() => ({}));
    if(!resp.ok || !data.ok){
      alert('No se pudo eliminar para todos: ' + (data.error || resp.status));
      return;
    }
    lastConversationMessages = (Array.isArray(lastConversationMessages) ? lastConversationMessages : []).filter((item) => messageActionKey(item) !== String(messageKey || ''));
    renderConversation(lastConversationMessages);
  }

  function setDeleteMessagePopupOpen(open, payload){
    const isOpen = !!open;
    if(!isOpen){
      pendingDeleteTarget = null;
    } else if(payload){
      pendingDeleteTarget = payload;
    }

    if(msgDeleteBackdropEl){
      msgDeleteBackdropEl.classList.toggle('open', isOpen);
      msgDeleteBackdropEl.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    }

    if(!isOpen) return;

    const canDeleteAll = !!(pendingDeleteTarget && pendingDeleteTarget.direction === 'out');
    if(msgDeleteTextEl){
      msgDeleteTextEl.textContent = canDeleteAll
        ? 'Elige si deseas eliminar este mensaje solo para ti o para todos.'
        : 'Este mensaje es del cliente, solo puedes eliminarlo para ti.';
    }
    if(msgDeleteAllBtn){
      msgDeleteAllBtn.style.display = canDeleteAll ? 'inline-flex' : 'none';
    }
  }

  function openDeleteMessagePopup(message, messageKey){
    if(!message) return;
    setDeleteMessagePopupOpen(true, {
      key: String(messageKey || ''),
      direction: normalizeMessageDirection(message),
      message
    });
  }

  async function confirmDeleteMessage(scope){
    const target = pendingDeleteTarget;
    if(!target) return;
    const key = String(target.key || '');

    if(scope === 'all'){
      await deleteMessageForEveryone(target.message, key);
      setDeleteMessagePopupOpen(false);
      closeMessageMenus();
      return;
    }

    rememberMessageHiddenForMe(key);
    renderConversation(lastConversationMessages);
    setDeleteMessagePopupOpen(false);
    closeMessageMenus();
  }

  function handleOutgoingMessageAction(action, messageKey){
    const key = String(messageKey || '');
    const message = findConversationMessageByKey(key);
    if(!message) return;
    const text = String(message.text || message.caption || '').trim();

    if(action === 'reply'){
      setReplyContextFromMessage(message, key);
      closeMessageMenus();
      return;
    }

    if(action === 'pin'){
      if(!selected){
        alert('Selecciona un cliente primero.');
        return;
      }
      toggleSelectedMessageStar(key, text);
      renderConversation(lastConversationMessages);
      renderClientRightPanel();
      closeMessageMenus();
      return;
    }

    if(action === 'forward'){
      if(!msgInput) return;
      msgInput.value = text || '';
      msgInput.focus();
      closeMessageMenus();
      return;
    }

    if(action === 'delete'){
      openDeleteMessagePopup(message, key);
    }
  }

  function syncFullChatOverlayUi(){
    if(chatOverlayBackdropEl){
      chatOverlayBackdropEl.classList.toggle('open', fullChatOverlayOpen);
      chatOverlayBackdropEl.setAttribute('aria-hidden', fullChatOverlayOpen ? 'false' : 'true');
    }
    if(chatOverlayCloseBtnEl){
      chatOverlayCloseBtnEl.classList.toggle('open', fullChatOverlayOpen);
    }
    if(chatsPanelEl){
      chatsPanelEl.classList.toggle('wa-chat-overlay-open', fullChatOverlayOpen);
    }
  }

  function closeFullChatOverlay(restorePrevModule){
    if(!fullChatOverlayOpen) return;
    fullChatOverlayOpen = false;
    syncFullChatOverlayUi();
    const prev = fullChatOverlayPrevModule;
    fullChatOverlayPrevModule = '';
    if(restorePrevModule && prev && prev !== 'chats'){
      setActiveModule(prev);
    }
  }

  function openFullChatOverlay(){
    if(!fullChatOverlayOpen){
      const activeBtn = railButtons.find((btn) => btn.classList.contains('active'));
      fullChatOverlayPrevModule = activeBtn ? String(activeBtn.dataset.module || '') : '';
    }
    fullChatOverlayOpen = true;
    setActiveModule('chats');
    syncFullChatOverlayUi();
  }

  function setFunnelChatOpen(open){
    const isOpen = !!open;
    if(funnelChatBackdropEl){
      funnelChatBackdropEl.classList.toggle('open', isOpen);
      funnelChatBackdropEl.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    }
    if(!isOpen){
      funnelPopupLead = null;
      funnelPopupMessages = [];
      if(funnelChatInputEl) funnelChatInputEl.value = '';
    }
  }

  function renderFunnelPopupConversation(messages){
    if(!funnelChatConversationEl) return;
    funnelChatConversationEl.innerHTML = '';
    const list = Array.isArray(messages) ? messages.slice() : [];
    list.sort((a, b) => normalizeTimestamp(a.timestamp || 0) - normalizeTimestamp(b.timestamp || 0));
    if(!list.length){
      funnelChatConversationEl.innerHTML = '<div style="color:#64748b">Sin mensajes en esta conversacion.</div>';
      return;
    }
    const frag = document.createDocumentFragment();
    list.forEach((m) => {
      const row = document.createElement('div');
      row.className = 'msg-row ' + (m.direction === 'out' ? 'out' : 'in');
      const bubble = document.createElement('div');
      bubble.className = 'msg-bubble ' + (m.direction === 'out' ? 'msg-out' : 'msg-in');
      bubble.textContent = m.text || m.caption || '';
      const meta = document.createElement('div');
      meta.className = 'msg-meta';
      const ts = normalizeTimestamp(m.timestamp || 0) || Date.now();
      meta.textContent = new Date(ts).toLocaleString();
      row.appendChild(bubble);
      row.appendChild(meta);
      frag.appendChild(row);
    });
    funnelChatConversationEl.appendChild(frag);
    funnelChatConversationEl.scrollTop = funnelChatConversationEl.scrollHeight;
  }

  async function loadFunnelPopupConversation(lead){
    if(!lead || !funnelChatConversationEl) return;
    const phone = String(lead.phone || '').replace(/\D+/g, '');
    if(!phone){
      funnelChatConversationEl.innerHTML = '<div style="color:#64748b">Numero invalido</div>';
      return;
    }
    funnelChatConversationEl.innerHTML = '<div style="color:#64748b">Cargando...</div>';
    try{
      const resp = await fetch('/wa/conversation?phone=' + encodeURIComponent(phone) + '&limit=1000');
      const data = resp.ok ? await resp.json().catch(() => null) : null;
      funnelPopupMessages = data && Array.isArray(data.messages) ? data.messages : [];
      renderFunnelPopupConversation(funnelPopupMessages);
    }catch(_e){
      funnelChatConversationEl.innerHTML = '<div style="color:#64748b">No se pudo cargar conversacion.</div>';
    }
  }

  async function openFunnelChatPopupByPhone(phoneDigits, fallbackName){
    const key = phoneKey(phoneDigits);
    if(!key) return;
    const match = chats.find((chat) => phoneKey(chat.phone || chat.id) === key) || { phone: key, name: fallbackName || ('+' + key) };
    funnelPopupLead = match;
    if(funnelChatTitleEl) funnelChatTitleEl.textContent = String(match.name || ('+' + key));
    if(funnelChatSubEl) funnelChatSubEl.textContent = '+' + key;
    if(funnelChatAvatarEl) funnelChatAvatarEl.textContent = initialsOf(match.name || key);
    setFunnelChatOpen(true);
    await loadFunnelPopupConversation(match);
  }

  async function openFullChatOverlayByPhone(phoneDigits, fallbackName){
    const key = phoneKey(phoneDigits);
    if(!key) return;
    const match = chats.find((chat) => phoneKey(chat.phone || chat.id) === key) || { phone: key, name: fallbackName || ('+' + key) };
    openFullChatOverlay();
    await selectContact(match);
  }

  async function sendFromFunnelPopup(){
    if(!funnelPopupLead) return;
    const raw = String(funnelChatInputEl && funnelChatInputEl.value || '').trim();
    if(!raw) return;
    const cmd = resolveQuickReplyCommand(raw);
    if(!cmd.ok){
      alert('No existe una respuesta rapida para /' + cmd.command);
      return;
    }
    const finalMessage = String(cmd.message || '').trim();
    if(!finalMessage) return;
    const to = String(funnelPopupLead.phone || '').replace(/\D+/g, '');
    try{
      const resp = await fetch('/send-whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to, message: finalMessage })
      });
      const data = await resp.json().catch(() => ({}));
      if(!resp.ok){
        alert('Error: ' + (data.error || resp.status));
        return;
      }
      if(funnelChatInputEl) funnelChatInputEl.value = '';
      const now = Date.now();
      funnelPopupMessages.push({ id: 'local_' + now, direction: 'out', text: finalMessage, timestamp: now });
      renderFunnelPopupConversation(funnelPopupMessages);
      setMeta(to, {
        read: true,
        lastSeenTs: now,
        lastOutboundTs: now,
        lastMessageTs: now,
        lastMessagePreview: finalMessage,
        pendingClientCount: 0
      });
      addLeadHistory(to, 'Mensaje enviado', cmd.command ? ('Respuesta rapida /' + cmd.command + ': ' + finalMessage.slice(0, 120)) : finalMessage.slice(0, 120));
      renderChats();
      renderFunnelsBoard();
    }catch(_e){
      alert('Fallo enviando');
    }
  }

  function resolveQuickReplyCommand(inputText){
    const raw = String(inputText || '').trim();
    const m = raw.match(/^\/([a-z0-9_-]+)$/i);
    if(!m) return { ok: true, message: raw, command: '' };
    const code = normalizeQuickReplyCode(m[1]);
    const found = (Array.isArray(quickReplies) ? quickReplies : []).find((item) => normalizeQuickReplyCode(item && item.code) === code);
    if(!found) return { ok: false, message: '', command: code };
    return { ok: true, message: String(found.text || ''), command: code, id: String(found.id || '') };
  }

  async function doSend(){
    if(!selected){ alert('Selecciona un contacto'); return; }
    const raw = msgInput ? msgInput.value.trim() : '';
    if(!raw) return;
    const cmd = resolveQuickReplyCommand(raw);
    if(!cmd.ok){
      alert('No existe una respuesta rapida para /' + cmd.command);
      return;
    }
    const finalMessage = String(cmd.message || '').trim();
    if(!finalMessage){
      alert('La respuesta rapida no tiene contenido.');
      return;
    }
    if(msgInput) msgInput.value = '';
    suppressPollingUntil = Date.now() + 3000;

    const to = String(selected.phone||'').replace(/\D+/g,'');
    const replyToPayload = pendingReplyContext
      ? {
          key: String(pendingReplyContext.key || ''),
          sender: String(pendingReplyContext.sender || ''),
          text: String(pendingReplyContext.text || ''),
          messageId: String(pendingReplyContext.messageId || ''),
          mediaUrl: String(pendingReplyContext.mediaUrl || ''),
          mimeType: String(pendingReplyContext.mimeType || ''),
          fileName: String(pendingReplyContext.fileName || ''),
          kind: String(pendingReplyContext.kind || '')
        }
      : null;
    try{
      const r = await fetch('/send-whatsapp',{
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({ to, message: finalMessage, replyTo: replyToPayload })
      });
      const data = await r.json().catch(()=>({}));
      if(!r.ok){ alert('Error: '+(data.error||r.status)); return; }

      const now = Date.now();
      const persistedId = String(data && data.id || '').trim();
      lastConversationMessages.push({
        id: persistedId || ('local_' + now),
        waId: persistedId || null,
        direction:'out',
        text:finalMessage,
        timestamp:now,
        replyToSender: replyToPayload ? replyToPayload.sender : null,
        replyToText: replyToPayload ? replyToPayload.text : null,
        replyToMediaUrl: replyToPayload ? replyToPayload.mediaUrl : null,
        replyToMimeType: replyToPayload ? replyToPayload.mimeType : null,
        replyToFileName: replyToPayload ? replyToPayload.fileName : null,
        replyToKind: replyToPayload ? replyToPayload.kind : null
      });
      const selectedPhone = phoneKey(selected && selected.phone);
      if(selectedPhone){
        const previousMeta = getMeta(selectedPhone);
        setMeta(selectedPhone, {
          read: true,
          lastSeenTs: now,
          lastOutboundTs: now,
          lastMessageTs: now,
          lastMessagePreview: finalMessage,
          pendingClientCount: 0,
          openedAt: Number(previousMeta.openedAt || now)
        });
        const detail = cmd.command
          ? ('Respuesta rapida /' + cmd.command + (cmd.id ? ' (' + cmd.id + ')' : '') + ': ' + finalMessage.slice(0, 120))
          : finalMessage.slice(0, 120);
        addLeadHistory(selectedPhone, 'Mensaje enviado', detail);
      }
      if(selected) selected.pendingClientCount = 0;
      renderConversation(lastConversationMessages, { forceScroll: true });
      clearReplyContext();
      renderChats();
      renderFunnelsBoard();
      if(msgInput){
        try{ msgInput.focus({ preventScroll: true }); }
        catch(_e){ msgInput.focus(); }
      }
    }catch(e){
      console.warn('send', e);
      alert('Fallo enviando');
    }
  }

  function saveAllSettingsChanges(){
    ensureSettingsDraft();
    crmConfig = normalizeCrmConfig({
      funnel: draftCrmConfig.funnel,
      agents: crmConfig.agents.slice(),
      statuses: draftCrmConfig.statuses
    });
    quickReplies = Array.isArray(draftQuickReplies) && draftQuickReplies.length ? draftQuickReplies.slice() : DEFAULT_QUICK_REPLIES.slice();
    primaryFunnelBoardName = normalizeFunnelBoardName(draftPrimaryFunnelBoardName || primaryFunnelBoardName) || (funnelBoards[0] || 'VENTAS MENUDEO');
    saveFunnelBoardsState();
    saveCrmConfig();
    saveCatalogMeta();
    saveQuickReplies();
    resetSettingsDraftFromSaved();
    renderSettingsForm();
    populateToolbarOptions();
    renderDashboard();
    renderAnalytics();
    renderFunnelsBoard();
    renderAddLeadTargets();
    showCfgMessage('Cambios guardados.');
    showUsersMessage('Cambios guardados.');
    showQuickReplyMessage('Cambios guardados.');
  }

  searchInput && searchInput.addEventListener('input', ()=> renderChats());
  if(chatQuickFiltersEl){
    chatQuickFiltersEl.addEventListener('click', (ev) => {
      const target = ev.target;
      const btn = target && target.closest ? target.closest('[data-chat-filter]') : null;
      if(!btn) return;
      setActiveChatFilter(btn.getAttribute('data-chat-filter'));
    });
  }
  leadHistoryBtn && leadHistoryBtn.addEventListener('click', () => setLeadHistoryOpen(true));
  historyCloseBtn && historyCloseBtn.addEventListener('click', () => setLeadHistoryOpen(false));
  msgDeleteCancelBtn && msgDeleteCancelBtn.addEventListener('click', () => setDeleteMessagePopupOpen(false));
  msgDeleteMeBtn && msgDeleteMeBtn.addEventListener('click', () => confirmDeleteMessage('me'));
  msgDeleteAllBtn && msgDeleteAllBtn.addEventListener('click', () => confirmDeleteMessage('all'));
  msgDeleteBackdropEl && msgDeleteBackdropEl.addEventListener('click', (ev) => {
    if(ev.target === msgDeleteBackdropEl) setDeleteMessagePopupOpen(false);
  });
  historyBackdropEl && historyBackdropEl.addEventListener('click', (ev) => {
    if(ev.target === historyBackdropEl) setLeadHistoryOpen(false);
  });
  sendBtn && sendBtn.addEventListener('click', doSend);
  convEl && convEl.addEventListener('click', (ev) => {
    const target = ev.target;
    if(!(target instanceof Element)) return;

    const toggleBtn = target.closest('[data-msg-menu-toggle]');
    if(toggleBtn){
      ev.preventDefault();
      ev.stopPropagation();
      toggleMessageMenuForKey(toggleBtn.getAttribute('data-msg-menu-toggle'));
      return;
    }

    const actionBtn = target.closest('[data-msg-action]');
    if(actionBtn){
      ev.preventDefault();
      ev.stopPropagation();
      handleOutgoingMessageAction(actionBtn.getAttribute('data-msg-action'), actionBtn.getAttribute('data-message-key'));
      return;
    }

    if(!target.closest('.msg-actions-menu')) closeMessageMenus();
  });
  msgInput && msgInput.addEventListener('keydown', (ev) => {
    if(ev.key !== 'Enter') return;
    if(ev.shiftKey) return;
    if(ev.isComposing) return;
    ev.preventDefault();
    doSend();
  });
  emojiBtn && emojiBtn.addEventListener('click', insertEmojiInComposer);
  quickAddBtn && quickAddBtn.addEventListener('click', (ev) => {
    ev.stopPropagation();
    const isOpen = !!(composerMoreMenuEl && composerMoreMenuEl.classList.contains('open'));
    setComposerMoreMenuOpen(!isOpen);
  });
  quickRepliesBtn && quickRepliesBtn.addEventListener('click', promptQuickReply);
  replyPreviewCloseBtn && replyPreviewCloseBtn.addEventListener('click', clearReplyContext);
  scheduleEventBtn && scheduleEventBtn.addEventListener('click', promptScheduleEvent);
  scheduleMessageBtn && scheduleMessageBtn.addEventListener('click', promptScheduleMessage);
  sendAudioBtn && sendAudioBtn.addEventListener('click', notifySendAudio);

  composerMoreMenuEl && composerMoreMenuEl.addEventListener('click', (ev) => {
    ev.stopPropagation();
    const target = ev.target;
    const action = target && target.getAttribute ? target.getAttribute('data-action') : '';
    if(!action) return;
    runComposerMenuAction(action);
    setComposerMoreMenuOpen(false);
  });

  uploadAnyFileInputEl && uploadAnyFileInputEl.addEventListener('change', () => {
    const files = Array.from(uploadAnyFileInputEl.files || []);
    if(!files.length){
      uploadAnyFileInputEl.value = '';
      return;
    }
    if(selected){
      const fileNames = files.map((f) => f && f.name ? f.name : 'archivo').filter(Boolean);
      appendItemToSelected('notes', '[Archivo] ' + fileNames.join(', '));
    }
    uploadAnyFileInputEl.value = '';
  });

  document.addEventListener('click', () => {
    if(!audioUnlockedByUser) ensureAudioUnlocked();
    setComposerMoreMenuOpen(false);
    closeMessageMenus();
  });
  window.addEventListener('keydown', () => {
    if(!audioUnlockedByUser) ensureAudioUnlocked();
  }, { passive: true });
  [attrNameEl, attrEmailEl, attrCompanyEl].forEach((input) => {
    if(!input) return;
    input.addEventListener('input', scheduleSelectedAttributesAutosave);
    input.addEventListener('change', () => saveSelectedAttributes({ syncServer: true, trackHistory: true }));
  });
  attrTagsEl && attrTagsEl.addEventListener('keydown', (ev) => {
    if(ev.key === 'Enter' || ev.key === ','){
      ev.preventDefault();
      addTagFromInput();
    }
    if(ev.key === 'Backspace' && !String(attrTagsEl.value || '').trim()){
      const last = selectedTagsDraft[selectedTagsDraft.length - 1];
      if(!last) return;
      selectedTagsDraft = selectedTagsDraft.slice(0, -1);
      renderTagsChips();
      saveSelectedAttributes({ syncServer: true, trackHistory: true, refreshUi: false });
    }
  });
  attrTagsEl && attrTagsEl.addEventListener('blur', () => {
    addTagFromInput();
  });
  rightTabButtons.forEach((btn) => {
    btn.addEventListener('click', () => setRightTab(btn.getAttribute('data-right-tab')));
  });
  funnelSelectEl && funnelSelectEl.addEventListener('change', onFunnelChange);
  agentSelectEl && agentSelectEl.addEventListener('change', onAgentChange);
  statusSelectEl && statusSelectEl.addEventListener('change', onStatusChange);
  archiveBtn && archiveBtn.addEventListener('click', archiveSelected);
  closeWonBtn && closeWonBtn.addEventListener('click', closeWonSelected);
  settingsSaveCrmBtnEl && settingsSaveCrmBtnEl.addEventListener('click', saveAllSettingsChanges);
  settingsSaveFunnelsBtnEl && settingsSaveFunnelsBtnEl.addEventListener('click', saveAllSettingsChanges);
  settingsSaveUsersBtnEl && settingsSaveUsersBtnEl.addEventListener('click', saveAllSettingsChanges);
  settingsSaveRepliesBtnEl && settingsSaveRepliesBtnEl.addEventListener('click', saveAllSettingsChanges);
  catalogTypeEl && catalogTypeEl.addEventListener('change', () => {
    activeCatalogType = String(catalogTypeEl.value || 'funnel') === 'statuses' ? 'statuses' : 'funnel';
    renderCatalogTable();
  });
  catalogAddBtnEl && catalogAddBtnEl.addEventListener('click', openCatalogModal);
  catalogCancelBtnEl && catalogCancelBtnEl.addEventListener('click', closeCatalogModal);
  catalogSaveBtnEl && catalogSaveBtnEl.addEventListener('click', addCatalogItemFromModal);
  catalogNameInputEl && catalogNameInputEl.addEventListener('keydown', (ev) => {
    if(ev.key === 'Enter'){
      ev.preventDefault();
      addCatalogItemFromModal();
    }
  });
  catalogBackdropEl && catalogBackdropEl.addEventListener('click', (ev) => {
    if(ev.target === catalogBackdropEl) closeCatalogModal();
  });
  funnelChatCloseBtnEl && funnelChatCloseBtnEl.addEventListener('click', () => setFunnelChatOpen(false));
  funnelChatBackdropEl && funnelChatBackdropEl.addEventListener('click', (ev) => {
    if(ev.target === funnelChatBackdropEl) setFunnelChatOpen(false);
  });
  chatOverlayCloseBtnEl && chatOverlayCloseBtnEl.addEventListener('click', () => closeFullChatOverlay(true));
  chatOverlayBackdropEl && chatOverlayBackdropEl.addEventListener('click', (ev) => {
    if(ev.target === chatOverlayBackdropEl) closeFullChatOverlay(true);
  });
  window.addEventListener('keydown', (ev) => {
    if(multimediaViewerState.open){
      if(ev.key === 'Escape'){
        closeMultimediaViewer();
        return;
      }
      if(ev.key === 'ArrowLeft'){
        ev.preventDefault();
        moveMultimediaViewer(-1);
        return;
      }
      if(ev.key === 'ArrowRight'){
        ev.preventDefault();
        moveMultimediaViewer(1);
        return;
      }
    }
    if(ev.key === 'Escape' && multimediaState.open){
      if(multimediaState.openRowMenuId){
        multimediaState.openRowMenuId = '';
        renderMultimediaContent();
      }else{
        setMultimediaOpen(false);
      }
      return;
    }
    if(ev.key === 'Escape' && msgDeleteBackdropEl && msgDeleteBackdropEl.classList.contains('open')){
      setDeleteMessagePopupOpen(false);
      return;
    }
    if(ev.key === 'Escape' && fullChatOverlayOpen){
      closeFullChatOverlay(true);
    }
  });
  funnelChatSendBtnEl && funnelChatSendBtnEl.addEventListener('click', sendFromFunnelPopup);
  funnelChatInputEl && funnelChatInputEl.addEventListener('keydown', (ev) => {
    if(ev.key === 'Enter'){
      ev.preventDefault();
      sendFromFunnelPopup();
    }
  });
  quickReplyAddBtnEl && quickReplyAddBtnEl.addEventListener('click', () => {
    const code = normalizeQuickReplyCode(quickReplyCodeInputEl && quickReplyCodeInputEl.value || '');
    const value = String(quickReplyInputEl && quickReplyInputEl.value || '').trim();
    if(!code){
      showQuickReplyMessage('Ingresa un codigo valido solo con letras/numeros (ej: saludo).');
      return;
    }
    if(!value) return;
    const exists = draftQuickReplies.some((item) => normalizeQuickReplyCode(item && item.code) === code);
    if(exists){
      showQuickReplyMessage('Ese codigo ya existe.');
      return;
    }
    draftQuickReplies = draftQuickReplies.concat([{ id: nextQuickReplyId(draftQuickReplies), code, text: value }]);
    markSettingsDirty();
    renderQuickRepliesSettings();
    showQuickReplyMessage('Respuesta rapida agregada con /' + code + '.');
    if(quickReplyCodeInputEl) quickReplyCodeInputEl.value = '';
    if(quickReplyInputEl) quickReplyInputEl.value = '';
  });
  [quickReplyInputEl, quickReplyCodeInputEl].forEach((el) => el && el.addEventListener('keydown', (ev) => {
    if(ev.key === 'Enter'){
      ev.preventDefault();
      if(quickReplyAddBtnEl) quickReplyAddBtnEl.click();
    }
  }));
  quickReplyResetBtnEl && quickReplyResetBtnEl.addEventListener('click', () => {
    draftQuickReplies = DEFAULT_QUICK_REPLIES.slice();
    markSettingsDirty();
    renderQuickRepliesSettings();
    showQuickReplyMessage('Se restauraron respuestas rapidas base.');
  });
  settingsTabButtons.forEach((btn) => {
    btn.addEventListener('click', () => setSettingsTab(btn.getAttribute('data-settings-tab')));
  });
  demoClientsApplyBtn && demoClientsApplyBtn.addEventListener('click', applyDemoClientsToggle);
  demoEverythingApplyBtn && demoEverythingApplyBtn.addEventListener('click', applyDemoEverythingToggle);
  addUserBtnEl && addUserBtnEl.addEventListener('click', () => {
    const email = String(userNameInputEl && userNameInputEl.value || '').trim();
    if(!email) return;
    addAgentUser(email);
    if(userNameInputEl) userNameInputEl.value = '';
  });
  userNameInputEl && userNameInputEl.addEventListener('keydown', (ev) => {
    if(ev.key === 'Enter'){
      ev.preventDefault();
      if(addUserBtnEl) addUserBtnEl.click();
    }
  });
  authLoginBtnEl && authLoginBtnEl.addEventListener('click', doEmailLogin);
  authLogoutBtnEl && authLogoutBtnEl.addEventListener('click', doLogout);
  authPasswordEl && authPasswordEl.addEventListener('keydown', (ev) => {
    if(ev.key === 'Enter'){
      ev.preventDefault();
      doEmailLogin();
    }
  });
  permsCancelBtnEl && permsCancelBtnEl.addEventListener('click', closePermissionsEditor);
  permsSaveBtnEl && permsSaveBtnEl.addEventListener('click', savePermissionsEditor);
  permsBackdropEl && permsBackdropEl.addEventListener('click', (ev) => {
    if(ev.target === permsBackdropEl) closePermissionsEditor();
  });

  dirCheckAll && dirCheckAll.addEventListener('change', () => {
    const rows = directoryVisibleRows();
    if(dirCheckAll.checked){ rows.forEach((r) => directorySelected.add(r.id)); }
    else { rows.forEach((r) => directorySelected.delete(r.id)); }
    renderDirectoryTable();
  });

  [dirTabAll, dirTabActive, dirTabArchived].forEach((tab) => {
    tab && tab.addEventListener('click', () => {
      directoryFilter = tab.dataset.dirFilter || 'all';
      renderDirectoryTable();
    });
  });

  dirTableBody && dirTableBody.addEventListener('change', (ev) => {
    const target = ev.target;
    if(!(target instanceof HTMLInputElement)) return;
    const id = target.getAttribute('data-dir-check');
    if(!id) return;
    if(target.checked) directorySelected.add(id); else directorySelected.delete(id);
    updateDirectorySelectedInfo();
  });

  dirAssignUserBtn && dirAssignUserBtn.addEventListener('click', bulkAssignUsers);
  dirMoveBtn && dirMoveBtn.addEventListener('click', bulkMoveFunnelStatus);
  dirTagBtn && dirTagBtn.addEventListener('click', bulkAssignTags);
  dirExportSelectedBtn && dirExportSelectedBtn.addEventListener('click', () => exportRows(selectedDirectoryRows(), 'leads_seleccionados.xls'));
  dirToggleStateBtn && dirToggleStateBtn.addEventListener('click', bulkToggleState);
  dirDeleteBtn && dirDeleteBtn.addEventListener('click', bulkDelete);
  dirExportAllBtn && dirExportAllBtn.addEventListener('click', () => exportRows(directoryVisibleRows(), 'todos_los_leads.xls'));

  dirImportBtn && dirImportBtn.addEventListener('click', () => { if(dirImportInput) dirImportInput.click(); });
  dirImportInput && dirImportInput.addEventListener('change', async () => {
    const file = dirImportInput.files && dirImportInput.files[0];
    if(!file) return;
    const text = await file.text();
    const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    const imported = [];
    lines.forEach((line) => {
      const parts = line.split(/[;,]/).map((p) => p.trim());
      const name = parts[0] || 'Importado';
      const phone = phoneKey(parts[1] || parts[0]);
      if(phone) imported.push({ name, phone });
    });
    localImportedLeads = localImportedLeads.concat(imported);
    const uniq = new Map();
    localImportedLeads.forEach((r) => { if(r.phone) uniq.set(r.phone, r); });
    localImportedLeads = Array.from(uniq.values());
    saveLocalImportedLeads();
    await buildDirectoryRows();
    dirImportInput.value = '';
  });

  dirModalCancelBtn && dirModalCancelBtn.addEventListener('click', () => closeDirModal(false));
  dirModalConfirmBtn && dirModalConfirmBtn.addEventListener('click', () => closeDirModal(true));
  dirModalBackdrop && dirModalBackdrop.addEventListener('click', (ev) => {
    if(ev.target === dirModalBackdrop) closeDirModal(false);
  });

  leadSearchOpenBtn && leadSearchOpenBtn.addEventListener('click', openLeadSearchPopup);
  leadPopupCloseBtn && leadPopupCloseBtn.addEventListener('click', () => {
    if(leadSearchBackdrop){
      leadSearchBackdrop.classList.remove('open');
      leadSearchBackdrop.setAttribute('aria-hidden', 'true');
    }
  });
  leadSearchBackdrop && leadSearchBackdrop.addEventListener('click', (ev) => {
    if(ev.target === leadSearchBackdrop){
      leadSearchBackdrop.classList.remove('open');
      leadSearchBackdrop.setAttribute('aria-hidden', 'true');
    }
  });
  mediaCloseBtnEl && mediaCloseBtnEl.addEventListener('click', () => setMultimediaOpen(false));
  mediaBackdropEl && mediaBackdropEl.addEventListener('click', (ev) => {
    if(ev.target === mediaBackdropEl) setMultimediaOpen(false);
  });
  mediaTabButtons.forEach((btn) => {
    btn.addEventListener('click', () => setMultimediaTab(btn.getAttribute('data-media-tab')));
  });
  mediaSearchToggleEl && mediaSearchToggleEl.addEventListener('click', () => setMultimediaSearchOpen(!multimediaState.searchOpen));
  mediaSortToggleEl && mediaSortToggleEl.addEventListener('click', () => setMultimediaSortOpen(!multimediaState.sortOpen));
  mediaSelectToggleEl && mediaSelectToggleEl.addEventListener('click', () => setMultimediaSelecting(!multimediaState.selecting));
  mediaSearchInputEl && mediaSearchInputEl.addEventListener('input', () => {
    multimediaState.search = String(mediaSearchInputEl.value || '').trim();
    renderMultimediaContent();
  });
  mediaSenderFilterEl && mediaSenderFilterEl.addEventListener('change', () => {
    multimediaState.senderFilter = String(mediaSenderFilterEl.value || 'all');
    renderMultimediaContent();
  });
  mediaOrderFilterEl && mediaOrderFilterEl.addEventListener('change', () => {
    multimediaState.order = String(mediaOrderFilterEl.value || 'desc') === 'asc' ? 'asc' : 'desc';
    renderMultimediaContent();
  });
  mediaContentEl && mediaContentEl.addEventListener('change', (ev) => {
    const target = ev.target;
    if(!(target instanceof HTMLInputElement)) return;
    const itemId = String(target.getAttribute('data-mm-check') || '');
    if(!itemId) return;
    if(target.checked) multimediaState.selectedIds.add(itemId);
    else multimediaState.selectedIds.delete(itemId);
  });
  mediaContentEl && mediaContentEl.addEventListener('click', async (ev) => {
    const target = ev.target;
    if(!(target instanceof Element)) return;

    const menuToggle = target.closest('[data-mm-menu-toggle]');
    if(menuToggle){
      ev.preventDefault();
      const itemId = String(menuToggle.getAttribute('data-mm-menu-toggle') || '');
      multimediaState.openRowMenuId = multimediaState.openRowMenuId === itemId ? '' : itemId;
      renderMultimediaContent();
      return;
    }

    const actionBtn = target.closest('[data-mm-action]');
    if(actionBtn){
      ev.preventDefault();
      const action = String(actionBtn.getAttribute('data-mm-action') || '');
      const itemId = String(actionBtn.getAttribute('data-item-id') || '');
      multimediaState.openRowMenuId = '';
      await runMultimediaAction(action, itemId);
      renderMultimediaContent();
      return;
    }

    const openCard = target.closest('[data-mm-open]');
    if(openCard && !multimediaState.selecting && !target.closest('[data-mm-check]') && !target.closest('.wa-media-row-actions')){
      ev.preventDefault();
      const itemId = String(openCard.getAttribute('data-mm-open') || '');
      if(itemId){
        const currentAssets = getMultimediaFilteredItems().filter((item) => item.kind === 'asset');
        multimediaState.openRowMenuId = '';
        openMultimediaViewer(itemId, currentAssets);
      }
      return;
    }

    if(!target.closest('.wa-media-row-menu')){
      multimediaState.openRowMenuId = '';
      renderMultimediaContent();
    }
  });
  mediaBatchDeleteEl && mediaBatchDeleteEl.addEventListener('click', () => runMultimediaBatchAction('delete'));
  mediaBatchStarEl && mediaBatchStarEl.addEventListener('click', () => runMultimediaBatchAction('star'));
  mediaBatchDownloadEl && mediaBatchDownloadEl.addEventListener('click', () => runMultimediaBatchAction('download'));
  mediaBatchForwardEl && mediaBatchForwardEl.addEventListener('click', () => runMultimediaBatchAction('forward'));
  leadPopupSearchInput && leadPopupSearchInput.addEventListener('input', renderLeadTable);
  leadFilterDate && leadFilterDate.addEventListener('change', renderLeadTable);
  leadFilterStage && leadFilterStage.addEventListener('change', renderLeadTable);
  leadFilterStatus && leadFilterStatus.addEventListener('change', renderLeadTable);
  leadFilterUser && leadFilterUser.addEventListener('change', renderLeadTable);
  analyticsFromEl && analyticsFromEl.addEventListener('change', () => {
    analyticsRange.from = analyticsFromEl.value || analyticsRange.from;
    renderAnalytics();
  });
  analyticsToEl && analyticsToEl.addEventListener('change', () => {
    analyticsRange.to = analyticsToEl.value || analyticsRange.to;
    renderAnalytics();
  });
  Array.from(document.querySelectorAll('input[name="leadStateFilter"]')).forEach((el) => {
    el.addEventListener('change', renderLeadTable);
  });

  topFunnelsSearchInput && topFunnelsSearchInput.addEventListener('click', openLeadSearchPopup);
  funnelsBoardSelectEl && funnelsBoardSelectEl.addEventListener('change', () => {
    const next = normalizeFunnelBoardName(funnelsBoardSelectEl.value || '');
    if(!next) return;
    activeFunnelBoardName = next;
    saveFunnelBoardsState();
    renderFunnelsBoardHeader();
    renderFunnelsBoard();
  });
  funnelsAddBoardBtnEl && funnelsAddBoardBtnEl.addEventListener('click', addNewFunnelBoard);
  topFunnelsAddLeadBtn && topFunnelsAddLeadBtn.addEventListener('click', (ev) => {
    ev.stopPropagation();
    setAddLeadPopoverOpen(!addLeadPopoverOpen);
  });
  addLeadCancelBtn && addLeadCancelBtn.addEventListener('click', () => setAddLeadPopoverOpen(false));
  addLeadSaveBtn && addLeadSaveBtn.addEventListener('click', addLeadFromFunnels);
  addLeadPopoverEl && addLeadPopoverEl.addEventListener('click', (ev) => ev.stopPropagation());
  document.addEventListener('click', () => {
    if(addLeadPopoverOpen) setAddLeadPopoverOpen(false);
  });
  topFunnelsFiltersToggleBtn && topFunnelsFiltersToggleBtn.addEventListener('click', () => {
    setFunnelsFiltersOpen(!funnelsFiltersOpen);
  });
  funnelsFiltersCloseBtn && funnelsFiltersCloseBtn.addEventListener('click', () => setFunnelsFiltersOpen(false));
  funnelsDateFilterEl && funnelsDateFilterEl.addEventListener('change', renderFunnelsBoard);
  funnelsTagSearchEl && funnelsTagSearchEl.addEventListener('input', renderFunnelsBoard);
  funnelsUserFilterEl && funnelsUserFilterEl.addEventListener('change', renderFunnelsBoard);
  Array.from(document.querySelectorAll('input[name="funnelMsgFilter"]')).forEach((el) => {
    el.addEventListener('change', renderFunnelsBoard);
  });
  Array.from(document.querySelectorAll('input[name="funnelChannelFilter"]')).forEach((el) => {
    el.addEventListener('change', renderFunnelsBoard);
  });
  funnelsClearFiltersBtn && funnelsClearFiltersBtn.addEventListener('click', resetFunnelsFilters);

  dashManageUsersBtn && dashManageUsersBtn.addEventListener('click', () => {
    setActiveModule('settings');
    const settingsPanel = document.querySelector('[data-panel="settings"]');
    if(settingsPanel && !settingsPanel.classList.contains('active')){
      railButtons.forEach((btn) => btn.classList.toggle('active', (btn.dataset.module || '') === 'settings'));
      panels.forEach((panel) => panel.classList.toggle('active', (panel.dataset.panel || '') === 'settings'));
      if(moduleTitleEl) moduleTitleEl.textContent = moduleTitles.settings || 'MAQUILEROS - AJUSTES';
      setTopbarByModule('settings');
    }
    setSettingsTab('users');
    if(userNameInputEl) userNameInputEl.focus();
  });

  window.addEventListener('resize', ()=>{
    renderChats();
    if(Array.isArray(lastConversationMessages) && lastConversationMessages.length){
      renderConversation(lastConversationMessages);
    }
  });
  window.addEventListener('beforeunload', (ev) => {
    if(!settingsHasUnsavedChanges) return;
    ev.preventDefault();
    ev.returnValue = '';
  });

  bindRail();
  bindFirebaseAuthUi();
  applyModulePermissionsToRail();
  setRailExpanded(false);
  setTopbarByModule('dashboard');
  setFunnelsFiltersOpen(false);
  renderFunnelsBoardHeader();
  setSettingsTab('crm');
  setRightTab('attributes');
  renderFunnelsStatusList();
  renderClientRightPanel();
  updateComposerState();
  renderSettingsForm();
  populateToolbarOptions();
  setActiveChatFilter('all');
  renderConversationWelcomeSlot();
  renderDashboard();
  renderAnalytics();
  setActiveModule('dashboard');
  loadChats();

  poll = setInterval(async ()=>{
    if(Date.now() < suppressPollingUntil) return;
    if(pollingBusy) return;
    pollingBusy = true;
    try{
      await loadChats();
      if(selected){
        const selectedDigits = String(selected.phone||'').replace(/\D+/g,'');
        const selectedTs = normalizeTimestamp(selected.lastTimestamp || selected.updatedAt || 0);
        const selectedPreview = String(selected.lastText || selected.lastMessagePreview || '').trim();
        const selectedSig = selectedDigits + '|' + String(selectedTs) + '|' + selectedPreview;
        const shouldReload = (selectedDigits !== lastLoadedPhoneDigits) || (selectedSig !== lastLoadedConversationSig);
        if(shouldReload){
          await loadConversation(selected);
        }
      }
    }catch(_e){}
    pollingBusy = false;
  }, 4000);
})();
