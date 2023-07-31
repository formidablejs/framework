@echo off

set "E2E=%CD%\test\e2e"

if not exist "%E2E%" (
    echo "e2e test app does not exist."
    exit /b 1
)

echo "Copy files..."

xcopy /E /I /Y ".\scripts\e2e\*" "%E2E%\"
