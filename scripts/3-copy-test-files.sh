#!/usr/bin/env bash

E2E=${PWD}/test/e2e

if [ ! -d $E2E ]
then
    echo "e2e test app does not exist."
    exit 1
fi

echo
echo "Copy files..."
echo

cp -r ./scripts/e2e ./test
