import { Output } from '@formidablejs/console'
import { existsSync } from 'fs-extra'
import { join } from 'path'
import { spawn, fork } from 'child_process'

export default class Console
	prop runtime\string
	prop console\string

	prop config\object = {
		stdio: 'inherit'
		cwd: process.cwd!
	}

	get devConfigDefaults
		{
			mode: 'imba' # nodemon
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

	def constructor runtime\string = null, console\string = null
		self.runtime = runtime || join(process.cwd!, 'node_modules', '.bin', 'imba' + (process.platform === 'win32' ? '.cmd' : ''))
		self.console = console || join('bootstrap', "console{ext}")

	static def make runtime\string = null, console\string = null
		new Console(runtime, console)

	def run
		const args = ['--']

		for arg in process.argv.slice(2)
			args.push arg

		if devMode == 'imba' && args[1] == 'serve' && args[2] == '--dev' && !(args.includes('-h') || args.includes('--help') || args.includes('-V') || args.includes('--version'))
			let port = 3000
			let host = ''

			args.forEach do(arg)
				if arg.startsWith('--port')
					port = arg.split('=')[1]

				if arg.startsWith('--host')
					host = arg.split('=')[1]

			const srv = './node_modules/@formidablejs/framework/bin/imba/server.imba'

			const instance = spawn(runtime, [srv, '-s', '-w', '--', "--port={port}", "--host={host}"], {
				stdio: 'pipe',
				cwd: process.cwd!,
			})

			let address

			instance.stdout.on 'data', do(data)
				const line = data.toString!

				if address == null || address == undefined
					if line.includes("\x1b[1m./node_modules/@formidablejs/framework/bin/imba/server.imba") && line.includes('listening on')
						address = line.split('listening on ')[1]

						Output.write "\n  <bg:blue> INFO </bg:blue> Development Server running…\n"

						Output.write "  Local: <u>{address}</u>"

						Output.write "  <fg:yellow>Press Ctrl+C to stop the server</fg:yellow>\n"
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
