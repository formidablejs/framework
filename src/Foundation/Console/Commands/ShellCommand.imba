import { Prop } from '@formidablejs/console'
import { Command } from '../Command'
import { homedir } from 'os'
import { ImbaRepl } from 'imba-shell'
import { join } from 'path'
import { existsSync } from 'fs-extra'
import type { REPLServer } from 'repl'

export class ShellCommand < Command

	get language
		const appPackage = join(process.cwd!, 'package.json')

		if !existsSync(appPackage)
			return 'imba'

		const value = require(appPackage).language || 'imba'

		value.toLowerCase!

	get signature
		'shell {?--language}'

	get description
		'Interact with your application'

	get props
		{
			language: Prop.options('Language to use inside the shell').options(['imba', 'typescript']).default(language)
		}

	get history
		join homedir!, '.formidable_shell_history'

	def handle
		const imbaRepl = new ImbaRepl option('language'), '>>> ', history

		imbaRepl.registerCallback do(ctx)
			const context = app.context.registered

			Object.keys(context).forEach do(key) if !ctx[key] then ctx[key] = context[key]

		const server\REPLServer = await imbaRepl.run!

		server.on 'exit', do self.exit!
