@echo off
title Fraud Detection System Launcher
echo ============================================================
echo  REAL-TIME FINANCIAL FRAUD DETECTION SYSTEM LAUNCHER
echo ============================================================
echo.

echo Step 1: Launching React Frontend (Port 5173)...
start "Fraud Detection - Frontend" cmd /k "cd /d "%~dp0frontend" && npm install && npm run dev"

echo.
echo Step 2: Launching Spring Boot Backend (Port 8080)...
set JAVA_HOME=C:\Users\srini\.jdks\ms-17.0.20.1
start "Fraud Detection - Backend" cmd /k "cd /d "%~dp0" && "C:\Program Files\JetBrains\IntelliJ IDEA 2026.2.2\plugins\maven-plugin\lib\maven3\bin\mvn.cmd" spring-boot:run"

echo.
echo ============================================================
echo  Both servers have been launched in separate windows!
echo  Open your browser at: http://localhost:5173
echo ============================================================
echo.
pause
