@echo off

set "PACKAGE=%CD%\output\package.tgz"
set "E2E=%CD%\test\e2e"

if not exist "%PACKAGE%" (
    echo output\package.tgz does not exist.
    exit /b 1
)

if not exist "%E2E%" (
    echo e2e test app does not exist.
    exit /b 1
)

echo.
echo Install dependencies...
echo.

cd "%E2E%" && (
    npm i --legacy-peer-deps
    npm i -g pm2
    npm i sqlite3 --save
    npm i "%PACKAGE%" --legacy-peer-deps
)
