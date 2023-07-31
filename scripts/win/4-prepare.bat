@echo off

set "ENV=%CD%\test\e2e\.env"
set "E2E=%CD%\test\e2e"

if exist "%ENV%" (
    del "%ENV%"
)

if not exist "%E2E%" (
    echo e2e test app does not exist.
    exit /b 1
)

echo.
echo Prepare application...
echo.

cd "%E2E%" && (
    copy .env.example .env
    perl -i -p -e "s/APP_ENV=local/APP_ENV=testing/g" .env
    perl -i -p -e "s/DB_CONNECTION=mysql/DB_CONNECTION=sqlite/g" .env
    perl -i -p -e "s/\"jest --roots test\"/\"jest --roots=test --forceExit\"/g" package.json
    echo DATABASE_URL=database\db.sqlite >> .env
    type nul > database\db.sqlite
    node craftsman key:generate
    node craftsman package:publish --package=@formidablejs/framework --tag="auth-emails"
    node craftsman package:publish --package=@formidablejs/mailer --tag="components,config"
    node craftsman config:cache
    node craftsman migrate:latest
    start "Craftsman Serve" /B cmd /C "pm2 start \"node craftsman serve --addr\""
    timeout /t 5 >nul
)
