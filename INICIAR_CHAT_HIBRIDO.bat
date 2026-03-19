@echo off
setlocal
cd /d "%~dp0"
set "PY_CHAT_PORT=3000"
set "VERIFY_TOKEN=verify_token"
set "LT_SUBDOMAIN="

if exist ".env" (
  for /f "tokens=1,* delims==" %%A in ('findstr /B /I "META_VERIFY_TOKEN=" ".env"') do set "VERIFY_TOKEN=%%B"
  for /f "tokens=1,* delims==" %%A in ('findstr /B /I "LT_SUBDOMAIN=" ".env"') do set "LT_SUBDOMAIN=%%B"
)

if not defined LT_SUBDOMAIN (
  set "LT_SUBDOMAIN=maqimprenta-chat"
  if exist ".env" (
    findstr /B /I "LT_SUBDOMAIN=" ".env" >nul || echo LT_SUBDOMAIN=%LT_SUBDOMAIN%>> ".env"
  ) else (
    echo LT_SUBDOMAIN=%LT_SUBDOMAIN%> ".env"
  )
)

if not exist "python_chat\requirements.txt" (
  echo [ERROR] No se encontro python_chat\requirements.txt
  pause
  exit /b 1
)

set "PYEXE=%CD%\.venv\Scripts\python.exe"
if not exist "%PYEXE%" (
  echo [INFO] Creando entorno virtual en .venv...
  py -m venv .venv 2>nul || python -m venv .venv
)

set "FORCE_DEPS="
if /I "%~1"=="--force-deps" set "FORCE_DEPS=1"

where npx >nul 2>&1
if errorlevel 1 (
  echo [ERROR] No se encontro npx/Node.js. Se requiere para el tunel webhook automatico.
  pause
  exit /b 1
)

if defined FORCE_DEPS goto INSTALL_DEPS
if exist ".venv\.deps_ok" goto DEPS_READY

:INSTALL_DEPS
echo [INFO] Instalando/actualizando dependencias Python...
echo [INFO] Esto puede tardar 1-3 minutos la primera vez.
"%PYEXE%" -m pip install --disable-pip-version-check --retries 1 --timeout 25 --upgrade pip >nul 2>&1
"%PYEXE%" -m pip install --disable-pip-version-check --retries 1 --timeout 25 -r "python_chat\requirements.txt"
if errorlevel 1 goto DEPS_ERROR
echo ok> ".venv\.deps_ok"

:DEPS_READY

echo [INFO] Iniciando API Python (modo hibrido con HTML)...
for /f "tokens=5" %%P in ('netstat -ano ^| findstr /R /C:":%PY_CHAT_PORT% .*LISTENING"') do (
  taskkill /PID %%P /F >nul 2>&1
)
start "CHAT HIBRIDO PY API" cmd /k "cd /d "%CD%\python_chat" && set PY_CHAT_PORT=%PY_CHAT_PORT%&& "%PYEXE%" app.py"

start "CHAT HIBRIDO TUNNEL" cmd /k "cd /d "%CD%" && npx localtunnel --port %PY_CHAT_PORT% --subdomain %LT_SUBDOMAIN%"

start "CHAT HIBRIDO AUTO-WEBHOOK" cmd /k "cd /d "%CD%\python_chat" && "%PYEXE%" auto_webhook_setup.py --callback-url https://%LT_SUBDOMAIN%.loca.lt/webhook --verify-token %VERIFY_TOKEN%"

timeout /t 2 /nobreak >nul
start "" "http://localhost:%PY_CHAT_PORT%/wa_api/chat.html"

echo.
echo Listo: abre en http://localhost:%PY_CHAT_PORT%/wa_api/chat.html
echo API: http://localhost:%PY_CHAT_PORT%/health
echo Webhook callback recomendado: https://%LT_SUBDOMAIN%.loca.lt/webhook
echo Verify token: %VERIFY_TOKEN%
echo Auto-webhook: si defines META_APP_ID, META_APP_ACCESS_TOKEN y META_WABA_ID en .env, se configura solo.
echo.
pause
exit /b 0

:DEPS_ERROR
echo [ERROR] Fallo la instalacion de dependencias Python.
echo [TIP] Verifica conexion a internet y vuelve a ejecutar.
echo [TIP] Puedes forzar reinstalacion con: INICIAR_CHAT_HIBRIDO.bat --force-deps
pause
exit /b 1
