import { Command } from '../Command'
import { join } from 'path'
import { Prop } from '@formidablejs/console'
import { spawnSync } from 'child_process'
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

	get runtime
		join process.cwd!, 'node_modules', '.bin', 'imba' + (process.platform === 'win32' ? '.cmd' : '')

	prop #command\string = "./node_modules/.bin/imba{(process.platform === 'win32' ? '.cmd' : '')} server.imba -f"

	get fallbackPort
		process.env.PORT !== undefined && process.env.PORT !== null ? process.env.PORT : undefined

	get fallbackHost
		process.env.HOST !== undefined && process.env.HOST !== null ? process.env.HOST : undefined

	def handle
		if isNaN self.option('port') then return self.message 'error', 'Port must be a valid number.'

		self.setEnvVars!

		const args = [ ]

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

				return spawnSync sh, [shFlag, self.runtime, ...args, 'server.imba'], conf

			spawnSync self.runtime, [...args, 'server.imba'], conf
		else
			const server = nodemon({
				ext: 'imba,js,ts'
				exec: #command
				ignore: ['node_modules', 'dist', 'test', 'tests']
				stdout: false
				delay: 5
			})

			server.on 'stdout', do(e)
				const data = e.toString()

				if #address == null or #address == undefined
					#address     = data.split(' ')[2]
					#fullAddress = data

					self.message 'info', 'Development Server running…'

					self.write "  Local: <u>{#address}</u>"

					self.write "  <fg:yellow>Press Ctrl+C to stop the server</fg:yellow>\n"

				if #fullAddress != data
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
