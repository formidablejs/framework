import { Command } from '@formidablejs/console'
import { Prop } from '@formidablejs/console'
import type Application from '../../Application'

export class RouteListCommand < Command

	get signature
		'route:list {--method}'

	get description
		'List all registered routes'

	get props
		{
			method: Prop.string().multiple().nullable().description('Filter the routes by method')
		}

	# @returns {Application}
	get app
		self.constructor.ctx

	def handle
		const list = []
		const methods = self.option('method') ? (Array.isArray(self.option('method')) ? self.option('method') : [self.option('method')]) : ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD', 'TRACE', 'CONNECT']

		const routes = self.app.routes!.filter(do(route)
			methods.map(do(method) method.toUpperCase!).includes(route.method.toUpperCase!)
		)

		for route of routes
			let color

			if route.method == 'post'
				color = 'green'
			elif route.method == 'get'
				color = 'blue'
			elif route.method == 'delete'
				color = 'red'
			else
				color = 'green'

			const path = "<fg:{color}>{route.method.toUpperCase!}</fg:{color}>" + ' ' + (route.path.padStart((6 - route.method.length) + route.path.length, ' '))
			const name = route.name || ''
			const action = Array.isArray(route.action) ? "{route.action[0].name}@{route.action[1]}" : ''
			const description = name != '' && action != '' ? name + ' › ' + action : (name != '' ? name : action != '' ? action : '')

			list.push path + ' \x1b[2m' + (description == '' ? '' : ' ' + description).padStart((process.stdout.columns - path.length - 2) + ("<fg:{color}>".length * 2), "...") + '\x1b[0m'

		self.write list.join("\n")

		self.exit!
