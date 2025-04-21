#!/usr/bin/env bash

RUNTIME=${RUNTIME:-node}
PKG_MGR="npm"

if [ "$RUNTIME" = "bun" ]; then
    PKG_MGR="bun"
fi

ENV=${PWD}/test/e2e/.env
E2E=${PWD}/test/e2e

if [ -f $ENV ]
then
    rm $ENV
fi

if [ ! -d $E2E ]
then
    echo "e2e test app does not exist."
    exit 1
fi

echo
echo "Prepare application..."
echo

cd $E2E                                                                                     && \
cp .env.example .env                                                                        && \
perl -i -p -e 's/APP_ENV=local/APP_ENV=testing/g' .env                                      && \
perl -i -p -e 's/DB_CONNECTION=mysql/DB_CONNECTION=sqlite/g' .env                           && \
perl -i -p -e 's/"jest --roots test"/"jest --roots=test --forceExit"/g' package.json        && \
echo "DATABASE_URL=database/db.sqlite" >> .env                                              && \
touch database/db.sqlite                                                                    && \
$RUNTIME craftsman key:generate                                                             && \
$RUNTIME craftsman package:publish --package=@formidablejs/framework --tag="auth-emails"    && \
$RUNTIME craftsman package:publish --package=@formidablejs/mailer --tag="components,config" && \
$RUNTIME craftsman config:cache                                                             && \
$RUNTIME craftsman migrate:latest                                                           && \
$PKG_MGR run build

