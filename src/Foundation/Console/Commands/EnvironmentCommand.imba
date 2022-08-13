import { Command } from '../Command'
import type Application from '../../Application'

export class EnvironmentCommand < Command

	get signature
		'env'

	get description
		'Display the current framework environment'

	def handle
		self.message 'info', "Current application environment: {app.config.get('app.env', 'development')}"
