import { writeFileSync } from 'fs-extra'
import { join } from 'path'
import { handleMaintenanceMode } from '../Foundation/Exceptions/Handler/handleException'
import fastify from 'fastify'
import FormRequest from './Request/FormRequest'
import getResponse from './Kernel/getResponse'
import handleNotFound from './Kernel/handleNotFound'
import hasContentTypes from './Kernel/hasContentTypes'
import InvalidRouteActionException from './Router/Exceptions/InvalidRouteActionException'
import isArray from '../Support/Helpers/isArray'
import isClass from '../Support/Helpers/isClass'
import isEmpty from '../Support/Helpers/isEmpty'
import isFunction from '../Support/Helpers/isFunction'
import MaintenanceModeException from '../Foundation/Exceptions/MaintenanceModeException'
import resolveResponse from './Kernel/resolveResponse'
import Route from './Router/Route'
import UndefinedMiddlewareException from './Exceptions/UndefinedMiddlewareException'
import type { FastifyReply, FastifyRequest } from 'fastify'

const routes = {
	invalid: []
}

export default class Kernel

	get middleware
		[

		]

	get middlewareGroups
		{

		}

	get routeMiddleware
		{

		}

	def getAllMiddleware route, _middleware = null
		# get default middleware list.
		let list = [ ...self.middleware ]

		let params = []

		# get route grouped middleware list.
		Object.values((_middleware ? _middleware : route.middleware) || []).forEach do(middleware)
			if typeof middleware === 'string'
				if typeof middleware.split(':')[1] === 'string' then params = middleware.split(':')[1].split(',')

				middleware = middleware.split(':')[0]

			if self.middlewareGroups[middleware]
				const groupedList = self.middlewareGroups[middleware]

				Object.values(groupedList).forEach do(match)
					if typeof match == 'string' && typeof match.split(':')[1] === 'string'
						params = match.split(':')[1].split(',')
						match  = match.split(':')[0]

					const mappedMiddleware = typeof match === 'string' ? self.routeMiddleware[match] ?? match : match

					if typeof mappedMiddleware === 'function' then mappedMiddleware._params = params

					list.push( mappedMiddleware )
			else
				const namedMiddleware = self.routeMiddleware[middleware]

				if typeof namedMiddleware === 'function' then namedMiddleware._params = params

				list.push( namedMiddleware ?? middleware )

		return list

	def listen config, errorHandler, hooks, plugins, serverConfig, returnMode
		const router = fastify(serverConfig)

		hasContentTypes(router)

		router.addHook 'onRoute', do(options)
			routes.invalid = routes.invalid.filter do(route) route !== options.path

		for plugin in plugins
			router.register(plugin.plugin, plugin.options).after do(error)
				if !isEmpty(plugin.handler) then plugin.handler(error, router)

		for own hook, registeredHooks of hooks
			for hookHandler in registeredHooks
				if hook !== 'onMaintenance' then router.addHook(hook, hookHandler)

		await this.hasRoutes(router, config)

		router.setNotFoundHandler do(req, reply)
			const request = new FormRequest(req, {}, reply, config)

			throw handleNotFound(request)

		router.setErrorHandler do(error, req, reply)
			const request = new FormRequest(req, {}, reply, config)

			if error instanceof MaintenanceModeException
				return handleMaintenanceMode(error, request, reply, hooks)

			if error.constructor.name == 'NotFoundError' && error.message == 'Not Found'
				error = handleNotFound(request)

			return errorHandler.beforeHandle(error, request, reply)

		const port = process.env.FORMIDABLE_PORT || 3000
		const host = process.env.FORMIDABLE_HOST || '0.0.0.0'

		delete process.env.FORMIDABLE_PORT
		delete process.env.FORMIDABLE_HOST

		if returnMode isa Boolean && returnMode == true then return router

		router.listen Number(port), host, do(error, address)
			if routes.invalid.length > 0
				throw new InvalidRouteActionException "Expected route action for {routes.invalid[0]} to be an array or a function."

			if error then throw error

			if process.env.FORMIDABLE_ADDRESS_SET === '1' then self.storeAddress address

		imba.serve router.server

	def storeAddress address\String
		const location = join(process.cwd!, 'storage', 'framework', 'address.json')

		const object = {
			current: address
		}

		writeFileSync location, JSON.stringify(object, null, 2), {
			encoding: 'utf8'
		}

		delete process.env.FORMIDABLE_ADDRESS_SET

	def hasRoutes router, config
		for route in Route.all!
			if isArray(route.action) || (isFunction(route.action) && !isClass(route.action)) || route.action.constructor.name === 'AsyncFunction'
				router[route.method.toLowerCase!] route.path, do(req\FastifyRequest, reply\FastifyReply)
					const request = await new FormRequest(req, route, reply, config)

					await self.resolveMiddleware(route, request, reply, config)

					const response = await getResponse(route, request, reply)

					return await resolveResponse(response, request, reply)
			else
				routes.invalid.push(route.path)

	def resolveMiddleware route\Object, request, reply, config, _middleware = null
		for middleware in self.getAllMiddleware(route, _middleware)
			if middleware == undefined || typeof middleware == 'string'
				throw new UndefinedMiddlewareException "Middleware {middleware} is undefined."

			const params = middleware._params

			middleware = new middleware config

			await middleware.handle request, reply, (params !== undefined) ? params : []
