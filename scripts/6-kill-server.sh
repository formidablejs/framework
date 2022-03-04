#!/usr/bin/env bash

echo "Killing server..."

kill -9 $(lsof -t -i:3081)
