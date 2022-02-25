import { Command } from '@formidablejs/console'
import { Prop } from '@formidablejs/console'
import type Application from '../../Application'

export class RouteListCommand < Command

	get signature
		'route:list'
	
	# @returns {Application}
	get app
		self.constructor.ctx
	
	def handle
		self.table app.routes!
