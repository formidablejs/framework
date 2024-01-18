import { Command } from '../Command'
import { homedir } from 'os'
import { ImbaRepl } from 'imba-shell'
import { join } from 'path'
import type { REPLServer } from 'repl'

export class ShellCommand < Command

	get signature
		'shell'

	get description
		'Interact with your application'

	get history
		join homedir!, '.formidable_shell_history'

	def handle
		const repl = new ImbaRepl '>>> ', history

		repl.registerCallback do(ctx)
			const context = app.context.registered

			Object.keys(context).forEach do(key) if !ctx[key] then ctx[key] = context[key]

		const server\REPLServer = await repl.run!

		server.on 'exit', do self.exit!
