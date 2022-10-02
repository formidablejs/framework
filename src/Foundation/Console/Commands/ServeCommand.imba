import { Command } from '../Command'
import { join } from 'path'
import { existsSync } from 'fs'
import { Prop } from '@formidablejs/console'
import { spawnSync } from 'child_process'
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
			ignore: ['node_modules', 'dist', 'test', 'tests']
			ext: ['imba' ,'js', 'ts']
			delay: 5
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

		if !isNumber(delay)
			self.message 'error', "Expected \"development.delay\" to be an Integer."

			process.exit(1)

		delay

	get commandList
		const list\array = self.devCommands

		list.push("{runtime} server.imba -f -s -v")

		list.join(' && ')

	get #command
		commandList

	get fallbackPort
		process.env.PORT !== undefined && process.env.PORT !== null ? process.env.PORT : undefined

	get fallbackHost
		process.env.HOST !== undefined && process.env.HOST !== null ? process.env.HOST : undefined

	def handle
		if isNaN self.option('port') then return self.message 'error', 'Port must be a valid number.'

		self.setEnvVars!

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
			const server = nodemon({
				ext: devExt.join(',')
				exec: #command
				ignore: devIgnore
				stdout: false
				delay: devDelay
			})

			server.on 'stdout', do(e)
				const data = e.toString()

				if (#address == null or #address == undefined) && data.trim().startsWith('listening on http')
					#address     = data.split(' ')[2]
					#fullAddress = data

					self.message 'info', 'Development Server running…'

					self.write "  Local: <u>{#address}</u>"

					self.write "  <fg:yellow>Press Ctrl+C to stop the server</fg:yellow>\n"

				if data.trim().startsWith('listening on http') == false
					console.log data.trim()

			server.on 'stderr', do(e)
				const data = e.toString()

				console.log data.trim()

			server.on 'restart', do
				self.message 'info', 'Application change detected. Restarting server…'

			server.on 'quit', do(e)
				self.message 'info', 'Application shutting down. Stopping server…'

				self.exit()

	def setEnvVars
		process.env.FORMIDABLE_PORT = self.option('port', self.fallbackPort)
		process.env.FORMIDABLE_HOST = self.option('host', self.fallbackHost)
