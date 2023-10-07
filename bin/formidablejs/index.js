#!/usr/bin/env node

const { Application, Command } = require('@formidablejs/console')
const { Build } = require('./Commands/Build')
const { Start } = require('./Commands/Start')
const { default: version } = require('../../lib/Support/Helpers/version')

const app = new Application('The Formidable Framework Internal Build Tool', version())

app.register(Build)
app.register(Start)

app.run()
