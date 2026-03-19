@echo off
setlocal
cd /d "%~dp0"

echo [INFO] Iniciando chat en localhost (Node.js)...

if not exist "package.json" (
  echo [ERROR] No se encontro package.json en %CD%
  pause
  exit /b 1
)

where npm >nul 2>&1
if errorlevel 1 (
  echo [ERROR] npm/Node.js no esta disponible en PATH.
  echo [TIP] Instala Node.js LTS y vuelve a intentar.
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo [INFO] Dependencias no encontradas. Ejecutando npm install...
  call npm install
  if errorlevel 1 (
    echo [ERROR] Fallo npm install.
    pause
    exit /b 1
  )
)

for /f "tokens=5" %%P in ('netstat -ano ^| findstr /R /C:":3000 .*LISTENING"') do (
  echo [INFO] Liberando puerto 3000 (PID %%P)...
  taskkill /PID %%P /F >nul 2>&1
)

start "CHAT NODE LOCALHOST" cmd /k "cd /d "%CD%" && npm start"

timeout /t 2 /nobreak >nul
start "" "http://localhost:3000/wa_api/chat.html"

echo.
echo [OK] Chat abierto en: http://localhost:3000/wa_api/chat.html
echo [OK] Health check: http://localhost:3000/health
echo.
echo Deja abierta la ventana "CHAT NODE LOCALHOST" para mantener el servidor encendido.
echo.
pause
exit /b 0
