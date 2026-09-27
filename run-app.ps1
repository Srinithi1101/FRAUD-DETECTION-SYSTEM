Write-Host "============================================================" -ForegroundColor Cyan
Write-Host " REAL-TIME FINANCIAL FRAUD DETECTION SYSTEM LAUNCHER" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan

# Launch Frontend in separate window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$PSScriptRoot\frontend'; npm install; npm run dev"

# Launch Backend in separate window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "`$env:JAVA_HOME='C:\Users\srini\.jdks\ms-17.0.20.1'; Set-Location '$PSScriptRoot'; & 'C:\Program Files\JetBrains\IntelliJ IDEA 2026.2.2\plugins\maven-plugin\lib\maven3\bin\mvn.cmd' spring-boot:run"

Write-Host "Both servers launched!" -ForegroundColor Green
Write-Host "Open browser at: http://localhost:5173" -ForegroundColor Yellow
