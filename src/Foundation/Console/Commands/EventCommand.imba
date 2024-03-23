import { Command } from '../Command'
import { Prop } from '@formidablejs/console'

export class EventCommand < Command

	get signature
		event + ' {--dev} {--port=} {--host=} {--noAnsi}'

	get props
		{
			dev: Prop.boolean().default(false)
			port: Prop.number().default(3000)
			host: Prop.string().default('localhost')
			noAnsi: Prop.boolean().default(false)
		}

	def handle
		const dev = self.option('dev')
		const port = self.option('port')
		const host = self.option('host')
		const noAnsi = self.option('noAnsi')

		if persist then return persist(dev, port, host, noAnsi)

		self.error('No event handler found')
