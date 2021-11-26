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

cd $E2E                                                                                        && \
cp .env.example .env                                                                           && \
sed -i 's/APP_ENV=local/APP_ENV=testing/g' .env                                                && \
sed -i 's/DB_CONNECTION=mysql/DB_CONNECTION=sqlite/g' .env                                     && \
echo "DATABASE_URL=database/db.sqlite" >> .env                                                 && \
touch database/db.sqlite                                                                       && \
./node_modules/.bin/craftsman key                                                              && \
./node_modules/.bin/craftsman publish --package=@formidablejs/framework --tag="auth-emails"    && \
./node_modules/.bin/craftsman publish --package=@formidablejs/mailer --tag="components,config" && \
./node_modules/.bin/craftsman cache                                                            && \
./node_modules/.bin/craftsman build                                                            && \
./node_modules/.bin/craftsman migrate latest
