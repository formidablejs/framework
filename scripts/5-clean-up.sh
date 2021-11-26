#!/usr/bin/env bash

echo "Clean up..."

OUTPUT=${PWD}/output
E2E=${PWD}/test/e2e

if [ -f $OUTPUT ]
then
    rm $OUTPUT
fi

if [ -f $E2E ]
then
    rm $E2E
fi
