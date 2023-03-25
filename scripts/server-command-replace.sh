#!/usr/bin/env bash

FILE=${PWD}/lib/Foundation/Console/Commands/ServeCommand.js

if [[ $OSTYPE == 'darwin'* ]]; then
    sed -i '' -e 's/return self.gracefulShutdown/gracefulShutdown/g' $FILE
else
    sed -i -e 's/return self.gracefulShutdown/gracefulShutdown/g' $FILE
fi
