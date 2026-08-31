@echo off
chcp 65001 >nul
title Speakout A2 - Course Companion
cd /d "C:\Users\abwra\Documents\Default Project\my-english-book"

if not exist "node_modules\" (
  echo Installing dependencies... first time only
  call npm install
)

echo Starting the course companion...
echo The browser will open at http://localhost:5173
echo.

start "Speakout Dev Server" /min cmd /c "cd /d ""C:\Users\abwra\Documents\Default Project\my-english-book"" && call npm run dev"
timeout /t 6 /nobreak >nul

start "" "http://localhost:5173"
exit