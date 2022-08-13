import { Command } from '../Command'
import { join } from 'path'
import { Prop } from '@formidablejs/console'
import { spawnSync } from 'child_process'

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

	get runtime
		join process.cwd!, 'node_modules', '.bin', 'imbar' + (process.platform === 'win32' ? '.cmd' : '')

	get fallbackPort
		process.env.PORT !== undefined && process.env.PORT !== null ? process.env.PORT : undefined

	get fallbackHost
		process.env.HOST !== undefined && process.env.HOST !== null ? process.env.HOST : undefined

	def handle
		if isNaN self.option('port') then return self.message 'error', 'Port must be a valid number.'

		self.setEnvVars!

		const args = [ ]

		if self.option('dev', false) then args.push '--watch'

		if self.option('addr') then process.env.FORMIDABLE_ADDRESS_SET = '1'

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

	def setEnvVars
		process.env.FORMIDABLE_PORT = self.option('port', self.fallbackPort)
		process.env.FORMIDABLE_HOST = self.option('host', self.fallbackHost)
