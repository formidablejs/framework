#!/usr/bin/env bash

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

cd $E2E                                                                                 && \
cp .env.example .env                                                                    && \
perl -i -p -e 's/APP_ENV=local/APP_ENV=testing/g' .env                                  && \
perl -i -p -e 's/DB_CONNECTION=mysql/DB_CONNECTION=sqlite/g' .env                       && \
perl -i -p -e 's/"jest --roots test"/"jest --roots=test --forceExit"/g' package.json    && \
echo "DATABASE_URL=database/db.sqlite" >> .env                                          && \
touch database/db.sqlite                                                                && \
node craftsman key:generate                                                             && \
node craftsman package:publish --package=@formidablejs/framework --tag="auth-emails"    && \
node craftsman package:publish --package=@formidablejs/mailer --tag="components,config" && \
node craftsman config:cache                                                             && \
node craftsman migrate:latest                                                           && \
pm2 start ecosystem.config.js                                                           && \
sleep 8                                                                                 && \
echo "Log file:"                                                                        && \
cat ./log.log                                                                           && \
echo "Error log file:"                                                                  && \
cat ./error.log
