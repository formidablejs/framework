#!/usr/bin/env bash

sed -i '' 's/return self.gracefulShutdown/gracefulShutdown/g' lib/Foundation/Console/Commands/ServeCommand.js
