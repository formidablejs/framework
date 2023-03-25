#!/usr/bin/env bash

FILE=${PWD}/lib/Foundation/Console/Commands/ServeCommand.js

sed -i '' 's/return self.gracefulShutdown/gracefulShutdown/g' $FILE
