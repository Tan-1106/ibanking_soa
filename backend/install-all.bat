@echo off
echo ============================
echo  🚀 Installing all services
echo ============================

REM Set the base directory
set "BASE_DIR=%CD%"

REM List of services
set "services=api-gateway auth-service banking-service fee-service notification-service otp-service payment-service user-service"

for %%s in (%services%) do (
    echo.
    echo ============================
    echo Installing %%s ...
    echo ============================
    if exist "%%s" (
        cd /d "%%s"
        if exist "package.json" (
            echo Current directory: %CD%
            npm install
            if errorlevel 1 (
                echo ERROR: npm install failed for %%s
            ) else (
                echo SUCCESS: %%s installed
            )
        ) else (
            echo ERROR: package.json not found in %%s
        )
        cd /d "%BASE_DIR%"
    ) else (
        echo ERROR: Directory %%s does not exist
    )
)

echo.
echo ============================
echo ✅ Installation complete!
echo ============================
pause