@echo off
setlocal
cd /d "%~dp0"

if not exist "INICIAR_CHAT_HIBRIDO.bat" (
  echo [ERROR] No se encontro INICIAR_CHAT_HIBRIDO.bat
  pause
  exit /b 1
)

call "INICIAR_CHAT_HIBRIDO.bat"
