@echo off
setlocal
cd /d "%~dp0"

set "PY_CHAT_PORT=3000"

if not exist requirements.txt (
  echo [ERROR] No se encontro requirements.txt en python_chat
  pause
  exit /b 1
)

where py >nul 2>&1
if errorlevel 1 (
  where python >nul 2>&1
  if errorlevel 1 (
    echo [ERROR] Python no esta instalado o no esta en PATH.
    pause
    exit /b 1
  )
)

if not exist ".venv\Scripts\python.exe" (
  echo [INFO] Creando entorno virtual...
  py -m venv .venv 2>nul || python -m venv .venv
)

echo [INFO] Instalando dependencias...
call .venv\Scripts\python.exe -m pip install --upgrade pip >nul
call .venv\Scripts\python.exe -m pip install -r requirements.txt

for /f "tokens=5" %%P in ('netstat -ano ^| findstr /R /C:":%PY_CHAT_PORT% .*LISTENING"') do (
  taskkill /PID %%P /F >nul 2>&1
)

start "PY CHAT API (HYBRID)" cmd /k "set PY_CHAT_PORT=%PY_CHAT_PORT%&& .venv\Scripts\python.exe app.py"
timeout /t 2 >nul
start "" "http://localhost:%PY_CHAT_PORT%/wa_api/chat.html"
start "PY CHAT DESKTOP" cmd /k ".venv\Scripts\python.exe desktop_chat.py"

echo.
echo Modo hibrido iniciado.
echo API Python: http://localhost:%PY_CHAT_PORT%
echo HTML Chat: http://localhost:%PY_CHAT_PORT%/wa_api/chat.html
echo Cliente desktop Python iniciado.
echo.
pause
