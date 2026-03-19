# Python Chat Migration (modo hibrido Python + HTML)

Este modulo migra el chat principal a Python con:

- API y webhook en FastAPI: `app.py`
- Cliente de escritorio en Tkinter: `desktop_chat.py`
- Inicio en un click: `INICIAR_PYTHON_CHAT.bat`
- Modo hibrido (Python + HTML existente): `..\\INICIAR_HIBRIDO_PYTHON_HTML.bat`

## 1) Variables esperadas en `.env` (raiz del proyecto)

- `META_VERIFY_TOKEN`
- `META_WHATSAPP_TOKEN`
- `META_PHONE_NUMBER_ID`
- `FIREBASE_SERVICE_ACCOUNT_FILE` (opcional, por defecto: `secrets/clavecuenta.json`)
- `PY_CHAT_PORT` (opcional, por defecto: `3000` en modo hibrido)
- `LT_SUBDOMAIN` (opcional, recomendado para URL fija de localtunnel)
	- Si no existe, el lanzador crea por defecto: `LT_SUBDOMAIN=maqimprenta-chat`
- `META_APP_ID` (opcional, para auto-configurar webhook)
- `META_APP_ACCESS_TOKEN` (opcional, para auto-configurar webhook)
- `META_WABA_ID` (opcional, para auto suscribir app al WABA)

## 2) Iniciar

Lanzador unico recomendado (raiz del proyecto):

- `ABRIR_CHAT.bat`

Desde `python_chat`:

- Doble click en `INICIAR_PYTHON_CHAT.bat`

Modo hibrido (recomendado si quieres mantener tu interfaz HTML actual):

- En la raiz del proyecto, doble click en `INICIAR_HIBRIDO_PYTHON_HTML.bat`
- Abre: `http://localhost:3000/wa_api/chat.html`

Modo tiempo real (arranque integrado API + HTML + webhook tunnel):

- En la raiz del proyecto, doble click en `INICIAR_CHAT_HIBRIDO.bat`
- Levanta API Python, interfaz HTML y `localtunnel` automaticamente.
- Si defines `LT_SUBDOMAIN` en `.env`, tendras una URL publica estable y ya no necesitas reconfigurar webhook cada inicio.
	- El lanzador `INICIAR_CHAT_HIBRIDO.bat` ya fuerza subdominio fijo para estabilizar la recepcion.
	- El lanzador tambien ejecuta `auto_webhook_setup.py` para verificar callback y, si existen credenciales Meta, configurar webhook automaticamente.

Esto crea `.venv`, instala dependencias, levanta la API y abre el cliente desktop.

## 3) Endpoints principales

- `GET /health`
- `GET /wa/conversations`
- `GET /wa/conversation?phone=<...>&limit=300`
- `POST /wa/mark-read`
- `POST /send-whatsapp`
- `GET/POST /webhook`
- `GET/POST /wa/webhook`
- `GET /wa/media/{media_id}`

## 4) Notas

- El cliente desktop elimina dependencia del HTML para operar conversaciones.
- El boton "Adjuntar archivo" envia una referencia local de archivo como mensaje de texto.
- Si necesitas envio real de media por WhatsApp Cloud API, se puede extender `app.py` con upload media endpoint.
- Para recibir mensajes reales desde WhatsApp Cloud API siempre se requiere callback publico configurado en Meta; con `LT_SUBDOMAIN` se vuelve configuracion unica.
- Si agregas `META_APP_ID`, `META_APP_ACCESS_TOKEN` y `META_WABA_ID`, la configuracion del webhook se automatiza en cada arranque (sin pasos manuales).
