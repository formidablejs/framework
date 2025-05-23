#!/usr/bin/env bash

RUNTIME=${RUNTIME:-node}
PKG_MGR="npm"

if [ "$RUNTIME" = "bun" ]; then
    PKG_MGR="bun"
fi

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
echo "Installing dependencies for $RUNTIME...."
echo

cd "$E2E" || exit 1

if [ "$PKG_MGR" = "bun" ]; then
    rm -rf node_modules yarn.lock package-lock.json bun.lockb && \
    sed -i '/"@formidablejs\/framework"/d' package.json       && \
    bun add sqlite3 "$PACKAGE"
else
    npm install --legacy-peer-deps            && \
    npm install sqlite3 --save                && \
    npm install "$PACKAGE" --legacy-peer-deps
fi
