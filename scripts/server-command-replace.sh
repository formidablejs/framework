#!/usr/bin/env bash

sed -i -e 's/return self.gracefulShutdown/gracefulShutdown/g' ${PWD}/lib/Foundation/Console/Commands/ServeCommand.js
