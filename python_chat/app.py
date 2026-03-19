import os
import time
from pathlib import Path
from typing import Any, Dict, List, Optional

import requests
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Query, Request
from fastapi.responses import FileResponse, JSONResponse, PlainTextResponse, RedirectResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

import firebase_admin
from firebase_admin import credentials, firestore


BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")


APP_PORT = int(os.getenv("PY_CHAT_PORT", "3000"))
VERIFY_TOKEN = os.getenv("META_VERIFY_TOKEN", "verify_token")
WA_TOKEN = os.getenv("META_WHATSAPP_TOKEN", "")
PHONE_NUMBER_ID = os.getenv("META_PHONE_NUMBER_ID", "")
SERVICE_ACCOUNT_FILE = os.getenv(
    "FIREBASE_SERVICE_ACCOUNT_FILE",
    str(BASE_DIR / "secrets" / "clavecuenta.json"),
)


def norm_phone(raw: Any) -> str:
    return "".join(ch for ch in str(raw or "") if ch.isdigit())


def canonical_client_phone(raw: Any) -> str:
    digits = norm_phone(raw)
    if not digits:
        return ""
    last10 = digits[-10:]
    if len(last10) == 10 and len(digits) in (10, 12, 13):
        return f"521{last10}"
    return digits


def phone_candidates(raw: Any) -> List[str]:
    digits = norm_phone(raw)
    if not digits:
        return []
    out = {digits}
    last10 = digits[-10:]
    if last10 and last10 != digits:
        out.add(last10)
    if last10:
        out.add(f"52{last10}")
        out.add(f"521{last10}")
    return [v for v in out if v]


def normalize_destination_phone(raw: Any) -> str:
    digits = norm_phone(raw)
    if not digits:
        return ""
    default_cc = norm_phone(os.getenv("META_DEFAULT_COUNTRY_CODE", "52"))
    if len(digits) == 10 and default_cc:
        return f"{default_cc}{digits}"
    return digits


def normalize_ts(value: Any) -> int:
    try:
        n = int(float(value or 0))
    except Exception:
        return 0
    if n <= 0:
        return 0
    return n * 1000 if n < 1_000_000_000_000 else n


def init_firestore() -> Optional[firestore.Client]:
    try:
        if not Path(SERVICE_ACCOUNT_FILE).exists():
            print(f"[PythonChat] Service account no encontrado: {SERVICE_ACCOUNT_FILE}")
            return None
        if not firebase_admin._apps:
            cred = credentials.Certificate(SERVICE_ACCOUNT_FILE)
            firebase_admin.initialize_app(cred)
        db_client = firestore.client()
        print("[PythonChat] Firebase Admin inicializado")
        return db_client
    except Exception as exc:
        print(f"[PythonChat] Error Firebase: {exc}")
        return None


db = init_firestore()
app = FastAPI(title="Python Chat API", version="1.0.0")

# Hybrid mode: serve the existing HTML frontend directly from FastAPI.
WA_API_DIR = BASE_DIR / "wa_api"
if WA_API_DIR.exists():
    app.mount("/wa_api", StaticFiles(directory=str(WA_API_DIR), html=True), name="wa_api")


class SendMessageBody(BaseModel):
    to: str
    message: str


class MarkReadBody(BaseModel):
    phone: str
    readTs: Optional[int] = None


class MetaBusinessProfileBody(BaseModel):
    displayName: Optional[str] = None
    about: Optional[str] = None
    description: Optional[str] = None
    email: Optional[str] = None
    websites: Optional[List[str]] = None
    vertical: Optional[str] = None


class WaEventBody(BaseModel):
    id: Optional[str] = None
    phone: Optional[str] = None
    contactName: Optional[str] = None
    sourceType: Optional[str] = None
    title: str
    notes: Optional[str] = None
    dueAt: int
    remindMinutes: Optional[int] = 60
    notifiedOffsets: Optional[List[int]] = None
    status: Optional[str] = None
    createdAt: Optional[int] = None
    updatedAt: Optional[int] = None


def save_wa_message(phone: str, message: Dict[str, Any]) -> None:
    if not db:
        return

    now = int(time.time() * 1000)
    phone_digits = canonical_client_phone(phone)
    if not phone_digits:
        return

    conv_ref = db.collection("waConversations").document(phone_digits)
    msg_id = str(message.get("id") or now)
    msg_ref = conv_ref.collection("messages").document(msg_id)

    msg_data = {
        "id": msg_id,
        "direction": str(message.get("direction") or "in"),
        "text": str(message.get("text") or ""),
        "caption": message.get("caption"),
        "type": str(message.get("type") or "text"),
        "mediaId": message.get("mediaId"),
        "mediaUrl": message.get("mediaUrl"),
        "mimeType": message.get("mimeType"),
        "fileName": message.get("fileName"),
        "timestamp": int(message.get("timestamp") or now),
        "from": message.get("from"),
        "to": message.get("to"),
        "status": message.get("status"),
    }

    msg_ref.set(msg_data, merge=True)

    is_inbound = msg_data["direction"].strip().lower() == "in"
    is_outbound = msg_data["direction"].strip().lower() == "out"

    conv_patch: Dict[str, Any] = {
        "phone": phone_digits,
        "lastText": msg_data["text"],
        "lastDirection": msg_data["direction"],
        "lastTimestamp": msg_data["timestamp"],
        "updatedAt": now,
    }

    if is_inbound:
        conv_patch["unreadCount"] = firestore.Increment(1)
        conv_patch["lastInboundTs"] = msg_data["timestamp"]
    if is_outbound:
        conv_patch["lastOutboundTs"] = msg_data["timestamp"]

    conv_ref.set(conv_patch, merge=True)


def get_messages_by_doc_id(doc_id: str, limit: int = 200) -> List[Dict[str, Any]]:
    if not db:
        return []
    safe_id = norm_phone(doc_id)
    if not safe_id:
        return []

    safe_limit = max(1, min(500, int(limit or 200)))
    snap = (
        db.collection("waConversations")
        .document(safe_id)
        .collection("messages")
        .order_by("timestamp", direction=firestore.Query.DESCENDING)
        .limit(safe_limit)
        .get()
    )

    rows = [d.to_dict() or {} for d in snap]
    rows.sort(key=lambda x: (normalize_ts(x.get("timestamp") or x.get("createdAt") or x.get("sentAt")), str(x.get("id") or "")))
    return rows


def get_conversation(phone: str, limit: int = 200) -> List[Dict[str, Any]]:
    if not db:
        return []
    phone_digits = norm_phone(phone)
    if not phone_digits:
        return []

    safe_limit = max(1, min(500, int(limit or 200)))
    candidates = phone_candidates(phone_digits)
    doc_ids = set(candidates)

    for cand in candidates:
        by_phone = db.collection("waConversations").where("phone", "==", cand).limit(4).get()
        by_phone_number = db.collection("waConversations").where("phoneNumber", "==", cand).limit(4).get()
        for d in by_phone:
            doc_ids.add(str(d.id or "").strip())
        for d in by_phone_number:
            doc_ids.add(str(d.id or "").strip())

    merged: Dict[str, Dict[str, Any]] = {}

    for doc_id in [d for d in doc_ids if d]:
        for msg in get_messages_by_doc_id(doc_id, safe_limit):
            direct = str(msg.get("id") or msg.get("messageId") or msg.get("waId") or "").strip()
            if direct:
                key = direct
            else:
                ts = normalize_ts(msg.get("timestamp") or msg.get("createdAt") or msg.get("sentAt"))
                direction = str(msg.get("direction") or "").strip().lower()
                text = str(msg.get("text") or msg.get("caption") or "").strip()[:120]
                key = f"local|{direction}|{ts}|{text}"
            if key not in merged:
                merged[key] = msg

    out = list(merged.values())
    out.sort(key=lambda x: (normalize_ts(x.get("timestamp") or x.get("createdAt") or x.get("sentAt")), str(x.get("id") or x.get("messageId") or x.get("waId") or "")))
    return out[-safe_limit:]


def get_conversations(limit: int = 100) -> List[Dict[str, Any]]:
    if not db:
        return []
    safe_limit = max(1, min(200, int(limit or 100)))
    snap = db.collection("waConversations").limit(1200).get()
    rows: List[Dict[str, Any]] = []
    for d in snap:
        data = d.to_dict() or {}
        phone = canonical_client_phone(data.get("phone") or data.get("phoneNumber") or d.id)
        if not phone:
            continue
        rows.append({
            "id": d.id,
            **data,
            "phone": phone,
            "lastTimestamp": int(data.get("lastTimestamp") or data.get("updatedAt") or 0),
        })

    merged_by_key: Dict[str, Dict[str, Any]] = {}
    for row in rows:
        phone = norm_phone(row.get("phone"))
        key = phone[-10:] if len(phone) >= 10 else phone
        if not key:
            continue
        prev = merged_by_key.get(key)
        if not prev:
            merged_by_key[key] = row
            continue
        prev_ts = int(prev.get("lastTimestamp") or 0)
        next_ts = int(row.get("lastTimestamp") or 0)
        if next_ts >= prev_ts:
            merged = {**prev, **row}
        else:
            merged = {**row, **prev}
        merged_by_key[key] = merged

    out = list(merged_by_key.values())
    out.sort(key=lambda x: int(x.get("lastTimestamp") or 0), reverse=True)
    return out[:safe_limit]


def normalize_event_payload(raw: Dict[str, Any]) -> Dict[str, Any]:
    now = int(time.time() * 1000)
    phone = canonical_client_phone(raw.get("phone"))
    contact_name = str(raw.get("contactName") or "").strip()
    if not phone and not contact_name:
        raise HTTPException(status_code=400, detail="phone o contactName requerido")

    title = str(raw.get("title") or "").strip()
    if not title:
        raise HTTPException(status_code=400, detail="title requerido")

    due_at = normalize_ts(raw.get("dueAt") or raw.get("dateTime") or 0)
    if not due_at:
        raise HTTPException(status_code=400, detail="dueAt requerido")

    status_raw = str(raw.get("status") or "pending").strip().lower()
    status = status_raw if status_raw in {"pending", "done", "canceled"} else "pending"

    source_raw = str(raw.get("sourceType") or "").strip().lower()
    source_type = source_raw if source_raw in {"linked", "manual"} else ("linked" if phone else "manual")

    remind_minutes = int(raw.get("remindMinutes") or 60)
    remind_minutes = max(0, min(43200, remind_minutes))

    notified_offsets: List[int] = []
    incoming_offsets = raw.get("notifiedOffsets")
    if isinstance(incoming_offsets, list):
        for item in incoming_offsets:
            try:
                n = int(item)
            except Exception:
                continue
            if n >= 0 and n not in notified_offsets:
                notified_offsets.append(n)

    created_at = normalize_ts(raw.get("createdAt") or now) or now
    updated_at = normalize_ts(raw.get("updatedAt") or now) or now

    return {
        "phone": phone,
        "contactName": contact_name or (phone if phone else ""),
        "sourceType": source_type,
        "title": title,
        "notes": str(raw.get("notes") or "").strip(),
        "dueAt": due_at,
        "remindMinutes": remind_minutes,
        "notifiedOffsets": notified_offsets,
        "status": status,
        "createdAt": created_at,
        "updatedAt": updated_at,
    }


def _meta_auth_headers() -> Dict[str, str]:
    return {"Authorization": f"Bearer {WA_TOKEN}"}


def _meta_api_version() -> str:
    return str(os.getenv("META_GRAPH_VERSION", "v20.0") or "v20.0").strip()


@app.get("/health")
def health() -> Dict[str, Any]:
    return {"ok": True, "python": True, "db": bool(db)}


@app.get("/")
def root_redirect():
    return RedirectResponse(url="/wa_api/chat.html", status_code=307)


@app.get("/index.html")
def index_redirect():
    return RedirectResponse(url="/wa_api/chat.html", status_code=307)


@app.get("/config.js")
def config_js():
    target = BASE_DIR / "config.js"
    if not target.exists():
        raise HTTPException(status_code=404, detail="config.js no encontrado")
    return FileResponse(str(target), media_type="application/javascript")


@app.get("/firebase.js")
def firebase_js():
    target = BASE_DIR / "firebase.js"
    if not target.exists():
        raise HTTPException(status_code=404, detail="firebase.js no encontrado")
    return FileResponse(str(target), media_type="application/javascript")


@app.get("/wa/conversations")
def wa_conversations(limit: int = Query(default=100)) -> Dict[str, Any]:
    if not db:
        raise HTTPException(status_code=500, detail="Firestore no inicializado")
    return {"ok": True, "conversations": get_conversations(limit=limit)}


@app.get("/wa/conversation")
def wa_conversation(phone: str, limit: int = Query(default=300)) -> Dict[str, Any]:
    if not db:
        raise HTTPException(status_code=500, detail="Firestore no inicializado")
    clean = norm_phone(phone)
    if not clean:
        raise HTTPException(status_code=400, detail="phone requerido")
    return {"ok": True, "phone": clean, "messages": get_conversation(clean, limit)}


@app.post("/wa/mark-read")
def wa_mark_read(body: MarkReadBody) -> Dict[str, Any]:
    if not db:
        raise HTTPException(status_code=500, detail="Firestore no inicializado")
    phone = canonical_client_phone(body.phone)
    if not phone:
        raise HTTPException(status_code=400, detail="phone requerido")
    read_ts = int(body.readTs or int(time.time() * 1000))
    db.collection("waConversations").document(phone).set(
        {
            "phone": phone,
            "unreadCount": 0,
            "readCursorTs": read_ts,
            "readAt": int(time.time() * 1000),
            "updatedAt": int(time.time() * 1000),
        },
        merge=True,
    )
    return {"ok": True, "phone": phone, "unreadCount": 0, "readTs": read_ts}


@app.get("/wa/events")
def wa_events(limit: int = Query(default=400)) -> Dict[str, Any]:
    if not db:
        raise HTTPException(status_code=500, detail="Firestore no inicializado")

    safe_limit = max(1, min(1000, int(limit or 400)))
    snap = (
        db.collection("waEvents")
        .order_by("updatedAt", direction=firestore.Query.DESCENDING)
        .limit(safe_limit)
        .get()
    )

    events: List[Dict[str, Any]] = []
    for doc in snap:
        row = doc.to_dict() or {}
        events.append({"id": str(doc.id), **row})

    return {"ok": True, "events": events}


@app.post("/wa/events")
def wa_events_upsert(body: WaEventBody) -> Dict[str, Any]:
    if not db:
        raise HTTPException(status_code=500, detail="Firestore no inicializado")

    raw = body.model_dump()
    normalized = normalize_event_payload(raw)
    event_id = str(raw.get("id") or f"evt_{int(time.time() * 1000)}").strip()
    if not event_id:
        event_id = f"evt_{int(time.time() * 1000)}"

    db.collection("waEvents").document(event_id).set(normalized, merge=True)
    return {"ok": True, "event": {"id": event_id, **normalized}}


@app.delete("/wa/events/{event_id}")
def wa_events_delete(event_id: str) -> Dict[str, Any]:
    if not db:
        raise HTTPException(status_code=500, detail="Firestore no inicializado")

    clean_id = str(event_id or "").strip()
    if not clean_id:
        raise HTTPException(status_code=400, detail="event_id requerido")

    db.collection("waEvents").document(clean_id).delete()
    return {"ok": True, "id": clean_id}


@app.post("/send-whatsapp")
def send_whatsapp(body: SendMessageBody) -> Dict[str, Any]:
    to = normalize_destination_phone(body.to)
    message = str(body.message or "").strip()
    if not to or not message:
        raise HTTPException(status_code=400, detail="to y message son requeridos")

    wa_id = None
    if WA_TOKEN and PHONE_NUMBER_ID:
        url = f"https://graph.facebook.com/v20.0/{PHONE_NUMBER_ID}/messages"
        payload = {
            "messaging_product": "whatsapp",
            "to": to,
            "type": "text",
            "text": {"body": message},
        }
        resp = requests.post(url, json=payload, headers={"Authorization": f"Bearer {WA_TOKEN}"}, timeout=20)
        if not resp.ok:
            raise HTTPException(status_code=500, detail=f"Error Meta: {resp.text[:300]}")
        wa_id = (resp.json() or {}).get("messages", [{}])[0].get("id")

    msg_id = wa_id or f"local_{int(time.time() * 1000)}"
    save_wa_message(
        to,
        {
            "id": msg_id,
            "direction": "out",
            "text": message,
            "to": to,
            "timestamp": int(time.time() * 1000),
            "status": "sent" if wa_id else "local",
        },
    )
    return {"ok": True, "id": msg_id, "sentToMeta": bool(wa_id), "normalizedTo": to}


@app.get("/wa/media/{media_id}")
def wa_media(media_id: str):
    if not WA_TOKEN:
        raise HTTPException(status_code=500, detail="META_WHATSAPP_TOKEN no configurado")

    info_url = f"https://graph.facebook.com/v20.0/{media_id}"
    info_resp = requests.get(info_url, headers={"Authorization": f"Bearer {WA_TOKEN}"}, timeout=20)
    if not info_resp.ok:
        raise HTTPException(status_code=500, detail=f"No se pudo obtener metadata media: {info_resp.text[:300]}")

    media_url = (info_resp.json() or {}).get("url")
    if not media_url:
        raise HTTPException(status_code=404, detail="No se encontro URL de media")

    media_resp = requests.get(media_url, headers={"Authorization": f"Bearer {WA_TOKEN}"}, timeout=30, stream=True)
    if not media_resp.ok:
        raise HTTPException(status_code=500, detail=f"No se pudo descargar media: {media_resp.text[:300]}")

    content_type = media_resp.headers.get("content-type", "application/octet-stream")
    return StreamingResponse(media_resp.iter_content(chunk_size=8192), media_type=content_type)


@app.get("/wa/meta-business-profile")
def wa_meta_business_profile() -> Dict[str, Any]:
    if not WA_TOKEN or not PHONE_NUMBER_ID:
        raise HTTPException(status_code=500, detail="META_WHATSAPP_TOKEN/META_PHONE_NUMBER_ID no configurados")

    version = _meta_api_version()
    url = f"https://graph.facebook.com/{version}/{PHONE_NUMBER_ID}/whatsapp_business_profile"
    params = {
        "fields": "about,address,description,email,profile_picture_url,websites,vertical"
    }
    resp = requests.get(url, headers=_meta_auth_headers(), params=params, timeout=25)
    if not resp.ok:
        raise HTTPException(status_code=500, detail=f"No se pudo obtener perfil de Meta: {resp.text[:400]}")

    raw_payload = resp.json()
    payload = raw_payload if isinstance(raw_payload, dict) else {}
    data = payload.get("data") if isinstance(payload.get("data"), list) else []
    profile = data[0] if data else {}

    phone_url = f"https://graph.facebook.com/{version}/{PHONE_NUMBER_ID}"
    phone_params = {"fields": "verified_name,display_phone_number"}
    phone_resp = requests.get(phone_url, headers=_meta_auth_headers(), params=phone_params, timeout=20)
    phone_payload = phone_resp.json() if phone_resp.ok else {}
    verified_name = str((phone_payload or {}).get("verified_name") or "").strip()
    display_phone_number = str((phone_payload or {}).get("display_phone_number") or "").strip()

    return {
        "ok": True,
        "profile": profile,
        "verifiedName": verified_name,
        "displayPhoneNumber": display_phone_number,
        "displayNameEditableByApi": False,
        "displayNameHint": "El nombre mostrado/verified name se gestiona en Meta Manager y puede requerir aprobacion."
    }


@app.post("/wa/meta-business-profile")
def wa_meta_business_profile_update(body: MetaBusinessProfileBody) -> Dict[str, Any]:
    if not WA_TOKEN or not PHONE_NUMBER_ID:
        raise HTTPException(status_code=500, detail="META_WHATSAPP_TOKEN/META_PHONE_NUMBER_ID no configurados")

    requested_display = str(body.displayName or "").strip()
    if requested_display:
        # Meta Cloud API does not support direct update of display/verified name from this endpoint.
        return {
            "ok": False,
            "updated": False,
            "requiresMetaManager": True,
            "message": "El nombre mostrado de negocio se cambia en Meta Manager (WhatsApp Manager) y puede requerir aprobacion."
        }

    payload: Dict[str, Any] = {}
    if body.about is not None:
        payload["about"] = str(body.about or "").strip()
    if body.description is not None:
        payload["description"] = str(body.description or "").strip()
    if body.email is not None:
        payload["email"] = str(body.email or "").strip()
    if body.vertical is not None:
        payload["vertical"] = str(body.vertical or "").strip()
    if body.websites is not None:
        payload["websites"] = [str(w or "").strip() for w in (body.websites or []) if str(w or "").strip()]

    if not payload:
        return {"ok": True, "updated": False, "message": "Sin cambios para aplicar."}

    version = _meta_api_version()
    url = f"https://graph.facebook.com/{version}/{PHONE_NUMBER_ID}/whatsapp_business_profile"
    resp = requests.post(url, headers=_meta_auth_headers(), json=payload, timeout=25)
    if not resp.ok:
        raise HTTPException(status_code=500, detail=f"No se pudo actualizar perfil de Meta: {resp.text[:400]}")

    return {"ok": True, "updated": True, "message": "Perfil de negocio actualizado en Meta."}


@app.get("/webhook")
def webhook_verify(
    hub_mode: Optional[str] = Query(default=None, alias="hub.mode"),
    hub_verify_token: Optional[str] = Query(default=None, alias="hub.verify_token"),
    hub_challenge: Optional[str] = Query(default=None, alias="hub.challenge"),
):
    if hub_mode == "subscribe" and hub_verify_token == VERIFY_TOKEN:
        return PlainTextResponse(str(hub_challenge or ""), status_code=200)
    return PlainTextResponse("forbidden", status_code=403)


@app.get("/wa/webhook")
def webhook_verify_alt(
    hub_mode: Optional[str] = Query(default=None, alias="hub.mode"),
    hub_verify_token: Optional[str] = Query(default=None, alias="hub.verify_token"),
    hub_challenge: Optional[str] = Query(default=None, alias="hub.challenge"),
):
    return webhook_verify(hub_mode, hub_verify_token, hub_challenge)


@app.post("/webhook")
async def webhook_post(request: Request):
    body = await request.json()
    entries = body.get("entry") if isinstance(body, dict) else []
    entries = entries if isinstance(entries, list) else []

    for entry in entries:
        changes = entry.get("changes") if isinstance(entry, dict) else []
        changes = changes if isinstance(changes, list) else []

        for change in changes:
            value = change.get("value") if isinstance(change, dict) else {}
            value = value if isinstance(value, dict) else {}

            messages = value.get("messages") if isinstance(value.get("messages"), list) else []
            statuses = value.get("statuses") if isinstance(value.get("statuses"), list) else []

            for msg in messages:
                from_phone = norm_phone(msg.get("from"))
                msg_type = str(msg.get("type") or "text").strip().lower()
                typed = msg.get(msg_type) if isinstance(msg.get(msg_type), dict) else {}
                text = (
                    str(((msg.get("text") or {}).get("body") or typed.get("caption") or "")).strip()
                    or ("[Sticker]" if msg_type == "sticker" else f"[{msg_type}]")
                )
                ts = normalize_ts(msg.get("timestamp") or int(time.time() * 1000))
                save_wa_message(
                    from_phone,
                    {
                        "id": msg.get("id") or f"in_{int(time.time() * 1000)}",
                        "direction": "in",
                        "text": text,
                        "caption": typed.get("caption"),
                        "type": msg_type,
                        "mediaId": typed.get("id"),
                        "mimeType": typed.get("mime_type"),
                        "fileName": typed.get("filename"),
                        "from": from_phone,
                        "timestamp": ts,
                    },
                )

            for st in statuses:
                recipient = canonical_client_phone(st.get("recipient_id"))
                msg_id = str(st.get("id") or "").strip()
                if not recipient or not msg_id or not db:
                    continue
                status_ts = normalize_ts(st.get("timestamp") or int(time.time() * 1000))
                wa_status = str(st.get("status") or "unknown")
                conv_ref = db.collection("waConversations").document(recipient)
                conv_ref.collection("messages").document(msg_id).set(
                    {
                        "id": msg_id,
                        "direction": "out",
                        "status": wa_status,
                        "statusTimestamp": status_ts,
                    },
                    merge=True,
                )
                conv_ref.set(
                    {
                        "phone": recipient,
                        "lastDeliveryStatus": wa_status,
                        "lastDeliveryTimestamp": status_ts,
                        "updatedAt": int(time.time() * 1000),
                    },
                    merge=True,
                )

    return JSONResponse({"ok": True})


@app.post("/wa/webhook")
async def webhook_post_alt(request: Request):
    return await webhook_post(request)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app:app", host="0.0.0.0", port=APP_PORT, reload=True)
