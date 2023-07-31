@echo off

set "E2E=%CD%\test\e2e"
set "TEST=%CD%\test"

echo.
echo Fetch Formidable Skeleton...
echo.

if exist "%E2E%" (
    rmdir /s /q "%E2E%"
)

cd "%TEST%" && (
    curl -L -o dev.zip https://github.com/formidablejs/formidablejs/archive/refs/heads/dev.zip
    tar -xf dev.zip
    rmdir /s /q e2e
    move formidablejs-dev e2e
    del dev.zip
)
