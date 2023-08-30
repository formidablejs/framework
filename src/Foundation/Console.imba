import { Output } from '@formidablejs/console'
import { verifyPort } from './Console/verifyPort'
import { existsSync } from 'fs-extra'
import { join } from 'path'
import { spawn, spawnSync, execSync } from 'child_process'
import { ServeEvents } from './Console/ServeEvents'

export default class Console
	prop runtime\string
	prop console\string

	# commands that automatically run from build output
	prop commands\array = [
		'down'
		'env'
		'inspire'
		'up'
		'config:cache'
		'config:clear'
		'db:seed'
		'key:generate'
		'make:command'
		'make:config'
		'make:controller'
		'make:crud'
		'make:exception'
		'make:form'
		'make:interface'
		'make:mail'
		'make:middleware'
		'make:migration'
		'make:repository'
		'make:request'
		'make:resolver'
		'make:seeder'
		'make:tag'
		'make:type'
		'make:view'
		'migrate:down'
		'migrate:fresh'
		'migrate:latest'
		'migrate:rollback'
		'migrate:up'
		'route:list'
		'session:prune-expired'
	]

	prop config\object = {
		stdio: 'inherit'
		cwd: process.cwd!
	}

	get devConfigDefaults
		{
			mode: 'nodemon' # imba
			forcedBuildCommands: []
		}

	get devConfig
		const appPackage = join(process.cwd!, 'package.json')

		if !existsSync(appPackage)
			devConfigDefaults

		require(appPackage).development || devConfigDefaults

	get devMode
		const mode = devConfig.mode || devConfigDefaults.mode

		if !['nodemon', 'imba'].includes(mode.toLowerCase!)
			Output.write "\n  <bg:red> ERROR </bg:red> Invalid dev mode option. Expected \"nodemon\", or \"imba\".\n"

			process.exit(1)

		return mode

	get ext
		const appPackage = join(process.cwd!, 'package.json')

		if !existsSync(appPackage)
			return '.imba'

		const language = require(appPackage).language || 'imba'

		language.toLowerCase! == 'typescript' ? '.ts' : '.imba'

	get allCommands
		const list = devConfig.forcedBuildCommands || []

		if !Array.isArray(list)
			return commands

		return [...list, ...commands]

	def constructor runtime\string = null, console\string = null
		self.runtime = runtime || join(process.cwd!, 'node_modules', '.bin', 'imba' + (process.platform === 'win32' ? '.cmd' : ''))
		self.console = console || join('bootstrap', "console{ext}")

	static def make runtime\string = null, console\string = null
		new Console(runtime, console)

	def run { prod\boolean = false } = { prod: false }
		const args = ['--']

		for arg in process.argv.slice(2)
			args.push arg

		if args[1] !== 'serve' || args.includes('--help') || allCommands.includes(args[1])
			const consoleBuild = join(process.cwd!, '.console', 'console.js')

			if prod && existsSync(consoleBuild) || existsSync(consoleBuild) && allCommands.includes(args[1])
				return require(consoleBuild)

		if devMode == 'imba' && args[1] == 'serve' && args.includes('--dev') && !(args.includes('-h') || args.includes('--help') || args.includes('-V') || args.includes('--version'))
			preServe!

			let port = 3000
			let host = '127.0.0.1'
			let addr = false

			args.forEach do(arg)
				port = arg.split('=')[1] if arg.startsWith('--port')
				host = arg.split('=')[1] if arg.startsWith('--host') || arg.startsWith('-h')
				addr = true if arg == '--addr'

			port = await verifyPort(port)

			const srv = './node_modules/@formidablejs/framework/bin/imba/server.imba'

			const instance = spawn(runtime, [srv, '-s', '-w'], {
				stdio: 'pipe',
				cwd: process.cwd!,
				env: {
					...process.env,
					PORT: port,
					HOST: host,
					ADDR: addr
				}
			})

			let address

			instance.stdout.on 'data', do(data)
				const line = data.toString!

				if (address == null || address == undefined) && line.trim().includes('exited with error code:')
					Output.write "\n  <bg:red> ERROR </bg:red> Development Server could not be started…\n"

					process.exit(1)

					return

				if address == null || address == undefined
					if line.includes("\x1b[1m./node_modules/@formidablejs/framework/bin/imba/server.imba") && line.includes('listening on')
						address = line.split('listening on ')[1].trim!.replace(/\u001b\[.*?m/g, '')

						Output.write "\n  <bg:blue> INFO </bg:blue> Development Server running…\n"

						Output.write "  Local: <u><fg:blue>http://{address}</fg:blue></u>\n"

						Output.write "  <fg:yellow>Press Ctrl+C to stop the server</fg:yellow>\n"

						for event in ServeEvents.get!
							event({
								dev: true,
								port: port,
								host: host,
								noAnsi: process.argv.includes('--no-ansi')
							})
				else
					if !line.includes("\x1b[1mnode_modules/@formidablejs/framework/bin/imba/server.imba") && !line.includes("\x1b[1m./node_modules/@formidablejs/framework/bin/imba/server.imba")
						process.stdout.write line

			instance.stderr.on 'data', do(data)
				process.stdout.write data.toString!

			instance.on 'exit', do
				process.exit!

			process.on 'exit', do
				instance.kill!

			return

		if process.platform == 'win32'
			const sh = process.env.comspec || 'cmd'
			const shFlag = '/d /s /c'
			self.config.windowsVerbatimArguments = true

			return spawn(sh, [shFlag, self.runtime, self.console, ...args], self.config)

		spawn(runtime, [self.console, ...args], self.config)

	def preServeCommands
		const appPackage = join(process.cwd!, 'package.json')

		if !existsSync(appPackage)
			return []

		const hooks = require(appPackage).hooks || {}

		hooks ? hooks['pre-serve'] : []

	def preServe
		let commands = preServeCommands!

		if !Array.isArray(commands)
			commands = []

		for command in commands
			Output.write "\n  <dim>> {command}</dim>\n"

			execSync(command, {
				cwd: process.cwd!,
				stdio: 'inherit'
			})

			const repeat = process.stdout.columns <= 200 ? process.stdout.columns : (process.stdout.columns / 2)

			Output.write "<dim>  " + ('-'.repeat(repeat - '  '.length)) + "</dim>"
