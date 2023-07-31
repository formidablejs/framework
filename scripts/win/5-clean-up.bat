@echo off

echo "Clean up..."

set "OUTPUT=%CD%\output"
set "E2E=%CD%\test\e2e"

if exist "%OUTPUT%" (
    del "%OUTPUT%"
)

if exist "%E2E%" (
    del "%E2E%"
)
