@echo off
setlocal ENABLEDELAYEDEXPANSION

cd /d "%~dp0"
title INICIAR WEBHOOK MAQ

if not exist "package.json" (
  echo [ERROR] No se encontro package.json en %CD%
  echo Ejecuta este archivo dentro de la carpeta del proyecto.
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo [ERROR] npm no esta disponible en PATH.
  echo Instala Node.js y vuelve a intentar.
  pause
  exit /b 1
)

set "VERIFY_TOKEN=verify_token"
if exist ".env" (
  for /f "tokens=1,* delims==" %%A in ('findstr /b /c:"META_VERIFY_TOKEN=" ".env"') do (
    set "VERIFY_TOKEN=%%B"
  )
)

echo.
echo ============================================================
echo   MAQ - INICIO AUTOMATICO SERVIDOR + TUNEL (LOCALTUNNEL)
echo ============================================================
echo Carpeta: %CD%
echo Token:   !VERIFY_TOKEN!
echo.

echo [1/3] Iniciando servidor local en nueva ventana...
start "MAQ SERVER" powershell -NoExit -Command "Set-Location '%CD%'; npm start"

timeout /t 4 /nobreak >nul

echo [2/3] Iniciando tunel publico en nueva ventana...
echo      (espera la URL https://xxxxx.loca.lt en esa ventana)
start "MAQ TUNNEL" powershell -NoExit -Command "Set-Location '%CD%'; npx localtunnel --port 3000"

timeout /t 2 /nobreak >nul

echo [3/3] Abriendo app local...
start "" "http://localhost:3000/wa_api/chat.html"

echo.
echo -------------------- DATOS PARA META -----------------------
echo Callback URL:  https://TU_URL_LOCA_LT/webhook
echo Verify Token:  !VERIFY_TOKEN!
echo.
echo Prueba local (debe responder STATUS=200 BODY=123):
echo powershell -NoProfile -Command "$u='http://localhost:3000/webhook?hub.mode=subscribe^&hub.verify_token=!VERIFY_TOKEN!^&hub.challenge=123'; $r=Invoke-WebRequest -Uri $u -UseBasicParsing -TimeoutSec 10; 'STATUS=' + $r.StatusCode + ' BODY=' + $r.Content"
echo.
echo Si localtunnel pide Tunnel Password:
echo powershell -NoProfile -Command "(Invoke-RestMethod -Uri 'https://loca.lt/mytunnelpassword').Trim()"
echo -------------------------------------------------------------
echo.
echo Listo. Deja abiertas ambas ventanas (SERVER y TUNNEL).
pause
