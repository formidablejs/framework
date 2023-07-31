#!/usr/bin/env bash

OUTPUT=${PWD}/output

echo "Create npm ackage..."
echo

if [ ! -d $OUTPUT ]
then
    mkdir $OUTPUT
fi

cd $OUTPUT && \
mv ${PWD}/$(npm pack ../ | tail -n 1) package.tgz
