@echo off

set "OUTPUT=%CD%\output"

echo "Create npm package..."

if not exist "%OUTPUT%" (
    mkdir "%OUTPUT%"
)

cd "%OUTPUT%" && (
    for /F "tokens=*" %%A in ('npm pack .. ^| tail -n 1') do set "PACKAGE=%%A"
    move "%PACKAGE%" package.tgz
)
