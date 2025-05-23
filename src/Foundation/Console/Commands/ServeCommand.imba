import { verifyPort } from '../verifyPort'
import { Command } from '../Command'
import { join } from 'path'
import { existsSync } from 'fs'
import { Prop } from '@formidablejs/console'
import { spawnSync } from 'child_process'
import { ServeEvents } from '../ServeEvents'
import isNumber from '../../../Support/Helpers/isNumber'
import nodemon from 'nodemon'

export class ServeCommand < Command

	get signature
		'serve {?--port} {?--host} {?--dev} {?--addr}'

	get description
		'Serve the application on the Imba server'

	get props
		{
			port: Prop.number!.alias('p').default(3000).description 'The port to serve the application on'
			host: Prop.string!.alias('h').default('localhost').description 'The host address to serve the application on'
			dev: Prop.boolean!.alias('d').description 'Serve in dev mode (build, serve and watch)'
			addr: Prop.boolean!.description 'Store address in a config file'
		}

	prop #address\string

	prop #fullAddress\string

	get ext
		const appPackage = join(process.cwd!, 'package.json')

		if !existsSync(appPackage)
			return '.imba'

		const language = require(appPackage).language || 'imba'

		language.toLowerCase! == 'typescript' ? '.ts' : '.imba'

	get runtime
		join process.cwd!, 'node_modules', '.bin', 'imba' + (process.platform === 'win32' ? '.cmd' : '')

	get devConfigDefaults
		{
			commands: []
			ignore: [
				'.formidable',
				'app/Types',
				'bootstrap/config',
				'database',
				'dist',
				'node_modules',
				'public',
				'resources/css',
				'resources/js',
				'storage',
				'test',
				'tests',
			]
			ext: ['imba' ,'js', 'ts', 'env']
			delay: "500ms"
			mode: 'nodemon' # imba
		}

	get devConfig
		const appPackage = join(process.cwd!, 'package.json')

		if !existsSync(appPackage)
			devConfigDefaults

		require(appPackage).development || devConfigDefaults

	get devCommands
		const list = devConfig.commands || devConfigDefaults.commands

		if !Array.isArray(list)
			self.message 'error', "Expected \"development.commands\" to be an Array."

			process.exit(1)

		list

	get devIgnore
		const list = devConfig.ignore || devConfigDefaults.ignore

		if !Array.isArray(list)
			self.message 'error', "Expected \"development.ignore\" to be an Array."

			process.exit(1)

		list

	get devExt
		const list = devConfig.ext || devConfigDefaults.ext

		if !Array.isArray(list)
			self.message 'error', "Expected \"development.ext\" to be an Array."

			process.exit(1)

		list

	get devDelay
		const delay\number = devConfig.delay || devConfigDefaults.delay

		delay

	get commandList
		const list\array = self.devCommands

		list.push("{runtime} server{ext} -f -s -v --esm")

		list.join(' && ')

	get #command
		commandList

	get fallbackPort
		process.env.PORT !== undefined && process.env.PORT !== null ? process.env.PORT : undefined

	get fallbackHost
		process.env.HOST !== undefined && process.env.HOST !== null ? process.env.HOST : undefined

	def handle
		if isNaN self.option('port') then return self.message 'error', 'Port must be a valid number.'

		const port = await verifyPort(self.option('port', 3000))

		self.setEnvVars(port)

		const args = ['-s']

		if self.option('addr') then process.env.FORMIDABLE_ADDRESS_SET = '1'

		if self.option('dev', false) == false
			const conf = {
				stdio: 'inherit'
				cwd: process.cwd!
			}

			if process.platform === 'win32'
				const sh = process.env.comspec || 'cmd'
				const shFlag = '/d /s /c'
				conf.windowsVerbatimArguments = true

				return spawnSync sh, [ shFlag, self.runtime, "server{ext}", ...args ], conf

			spawnSync self.runtime, [ "server{ext}", ...args ], conf
		else
			process.env.CONSOLE_FORMIDABLE_GROUP = JSON.stringify({
				newLine: false
			})

			const server = nodemon({
				ext: devExt.join(',')
				exec: #command
				ignore: devIgnore
				stdout: false
				delay: devDelay
				signal: 'SIGUSR2'
				watch: ['.', '.env']
			})

			process.once('SIGINT', do
				self.message 'info', 'Shutting down development server…'

				server.reset()

				process.exit(0)
			)

			server.on 'stdout', do(e)
				const data = e.toString()

				if (#address == null or #address == undefined) && data.trim().startsWith('listening on http')
					#address     = data.split(' ')[2]
					#fullAddress = data

					#address = #address.replace('::1', 'localhost')

					self.message 'info', 'Development Server running…\n'

					self.write "  Local: <u><fg:blue>{#address}</fg:blue></u>"

					self.write "  <fg:yellow>Press Ctrl+C to stop the server</fg:yellow>\n"

					runEvents!

				if data.trim().startsWith('listening on http') == false
					process.stdout.write data

			server.on 'stderr', do(e)
				const data = e.toString()

				if data.trim().startsWith('Error: listen EADDRINUSE: address already in use')
					self.message 'error', 'Development Server could not be started…', false

					self.message 'error', "Address in use: <u><fg:blue>http://{data.split(' ')[7].trim()}</fg:blue></u>\n", false

					process.exit(1)

					return

				process.stdout.write data

			server.on 'restart', do(file)
				if file == join(process.cwd!, '.env')
					await self.app.console!.run('config:cache')

					self.message 'info', 'Environment change detected. Restart the server to apply changes…'
				else
					self.message 'info', 'Application change detected. Restarting server…'

	def setEnvVars port\number
		process.env.FORMIDABLE_PORT = port ?? self.fallbackPort
		process.env.FORMIDABLE_HOST = self.option('host', self.fallbackHost)

	def runEvents
		for event in ServeEvents.get!
			event({
				dev: true,
				port: port,
				host: self.option('host', self.fallbackHost),
				noAnsi: process.argv.includes('--no-ansi')
			})
