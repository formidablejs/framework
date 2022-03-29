#!/usr/bin/env bash

E2E=${PWD}/test/e2e
TEST=${PWD}/test

echo
echo "Fetch Formidable Skeleton..."
echo

if [ -d $E2E ]
then
    rm $E2E
fi

cd $TEST                                                                            && \
curl -L -O https://github.com/formidablejs/formidablejs/archive/refs/heads/main.zip && \
unzip main.zip -d .                                                                 && \
rm -rf e2e                                                                          && \
mv formidablejs-main e2e                                                            && \
rm main.zip
