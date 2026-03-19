const firebaseConfig = window.__FIREBASE_CONFIG__ || {
  apiKey: "AIzaSyAr8-ybVqcaeubCs-bApA_FAKnDgj9S7vM",
  authDomain: "maquilero-8344b.firebaseapp.com",
  projectId: "maquilero-8344b",
  storageBucket: "maquilero-8344b.firebasestorage.app",
  messagingSenderId: "323366654858",
  appId: "1:323366654858:web:5527744db419863da6ee73",
  measurementId: "G-H26F2MCQWD"
};

window.initFirebaseApp = async function initFirebaseApp() {
  if (window._firebaseReady) return;
  if (typeof firebase === 'undefined') return;

  if (Array.isArray(firebase.apps) && firebase.apps.length > 0) {
    window.auth = firebase.auth();
    window.db = firebase.firestore();
    window._firebaseReady = true;
    return;
  }

  firebase.initializeApp(firebaseConfig);
  window.auth = firebase.auth();
  window.db = firebase.firestore();

  try {
    await window.db.enablePersistence({ synchronizeTabs: true });
  } catch (_e) {
    // Offline persistence can fail in multi-tab/incognito; continue without blocking chat.
  }

  if (window.__ALLOW_ANON_AUTH__ === true) {
    try {
      if (!window.auth.currentUser) await window.auth.signInAnonymously();
    } catch (_e) {
      // Anonymous auth is optional for this module.
    }
  }

  window._firebaseReady = true;
};

window.saveContact = async function saveContact(contact) {
  if (!window.db) throw new Error('Firestore no inicializado');

  const phone = String(contact?.phone || '').replace(/\D+/g, '');
  const name = String(contact?.name || '').trim();
  if (!phone || !name) return { ok: false, error: 'name y phone requeridos' };

  const payload = {
    phone,
    name,
    updatedAt: Date.now()
  };

  await window.db.collection('contacts').doc(phone).set(payload, { merge: true });
  await window.db.collection('waConversations').doc(phone).set({ name, updatedAt: Date.now() }, { merge: true });
  return { ok: true, id: phone };
};

window.clearFirestoreCache = async function clearFirestoreCache() {
  try {
    if (!firebase?.apps?.length) return;
    await firebase.firestore().terminate();
    await firebase.firestore().clearPersistence();
    location.reload();
  } catch (_e) {
    location.reload();
  }
};
