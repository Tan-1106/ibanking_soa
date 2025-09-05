@echo off
echo ============================
echo  🚀 Installing all services
echo ============================

REM Danh sách các service
set services=api-gateway auth-service banking-service fee-service notification-service otp-service payment-service user-service

for %%s in (%services%) do (
    echo.
    echo ============================
    echo Installing %%s ...
    echo ============================
    cd %%s
    npm install
    cd ..
)

echo.
echo ============================
echo ✅ All services installed!
echo ============================
pause