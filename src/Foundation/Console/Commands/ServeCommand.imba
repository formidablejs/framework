import { Prop } from '@formidablejs/console'
import { Command } from '../Command'
import { spawnSync } from 'child_process'
import { join } from 'path'

export class ServeCommand < Command

	get signature
		'serve {?--port} {?--host} {?--dev}'

	get description
		'Serve the application on the Imba server'

	get props
		{
			port: Prop.number!.alias('p').default(3000).description 'The port to serve the application on'
			host: Prop.string!.alias('h').default('localhost').description 'The host address to serve the application on'
			dev: Prop.boolean!.alias('d').description 'Serve in dev mode (build, serve and watch)'
		}
		
	get runtime
		join process.cwd!, 'node_modules', '.bin', 'imbar'

	get fallbackPort
		process.env.PORT !== undefined && process.env.PORT !== null ? process.env.PORT : undefined

	get fallbackHost
		process.env.HOST !== undefined && process.env.HOST !== null ? process.env.HOST : undefined

	def handle
		if isNaN self.option('port') then return self.error 'Port must be a valid number.'

		self.setEnvVars!

		const args = [ ]

		if self.option('dev', false) then args.push '--watch'

		spawnSync self.runtime, [...args, 'server.imba'], {
			stdio: 'inherit'
			cwd: process.cwd!
		}

	def setEnvVars
		process.env.FORMIDABLE_PORT = self.option('port', self.fallbackPort)
		process.env.FORMIDABLE_HOST = self.option('host', self.fallbackHost)
