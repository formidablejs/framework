import fastify from 'fastify'
import FormRequest from './Request/FormRequest'
import getResponse from './Kernel/getResponse'
import handleNotFound from './Kernel/handleNotFound'
import hasContentTypes from './Kernel/hasContentTypes'
import hasStaticContent from './Kernel/hasStaticContent'
import hasCookie from './Kernel/hasCookie'
import hasSession from './Kernel/hasSession'
import hasCors from './Kernel/hasCors'
import resolveResponse from './Kernel/resolveResponse'
import Route from './Router/Route'
import UndefinedMiddlewareException from './Exceptions/UndefinedMiddlewareException'

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

	def getAllMiddleware route
		# get default middleware list.
		let list = [ ...self.middleware ]

		let params = []

		# get route grouped middleware list.
		Object.values(route.middleware || []).forEach do(middleware)
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

	def listen config, errorHandler, hooks, returnMode
		const router = fastify({
			ignoreTrailingSlash: true
		})

		hasStaticContent(router)
		hasContentTypes(router)
		hasCookie(router, config)
		hasSession(router, config)
		hasCors(router, config)

		for own hook, registeredHooks of hooks
			for hookHandler in registeredHooks
				router.addHook(hook, hookHandler)

		await this.hasRoutes(router, config)

		router.setNotFoundHandler do(request)
			throw handleNotFound(request)

		router.setErrorHandler do(error, request, reply)
			if error.constructor.name == 'NotFoundError' && error.message == 'Not Found'
				error = handleNotFound(request)

			return errorHandler.handle(error, request, reply)

		const port = process.env.FORMIDABLE_PORT ?? 3000

		delete process.env.FORMIDABLE_PORT

		if returnMode isa Boolean && returnMode == true then return router

		router.listen Number(port), do(error, address)
			if error then throw error

			console.log "\x1b[32mServer started on:\x1b[0m {address}"

	def hasRoutes router, config
		for route in Route.all!
			router[route.method.toLowerCase!] route.path, do(req, reply)
				const request = await new FormRequest(req, route, reply, config)

				await self.resolveMiddleware(route, request, reply, config)

				const response = await getResponse(route, request, reply)

				return await resolveResponse(response, reply)

	def resolveMiddleware route\Object, request, reply, config
		for middleware in self.getAllMiddleware(route)
			if middleware == undefined || typeof middleware == 'string'
				throw new UndefinedMiddlewareException "Middleware {middleware} is undefined."

			const params = middleware._params

			middleware = new middleware config

			await middleware.handle request, reply, (params !== undefined) ? params : []
