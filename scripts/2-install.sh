#!/usr/bin/env bash

PACKAGE=${PWD}/output/package.tgz
E2E=${PWD}/test/e2e

if [ ! -f $PACKAGE ]
then
    echo "output/package.tgz does not exist."
    exit 1
fi

if [ ! -d $E2E ]
then
    echo "e2e test app does not exist."
    exit 1
fi

echo
echo "Install dependencies..."
echo

cd $E2E                           && \
npm i --legacy-peer-deps          && \
npm i sqlite3 --save              && \
npm i $PACKAGE --legacy-peer-deps
