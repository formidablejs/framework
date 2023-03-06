import NotFoundException from '../Exceptions/NotFoundException'
import isEmpty from '../../Support/Helpers/isEmpty'
import cors from '@fastify/cors'
import ServiceResolver from '../../Support/ServiceResolver'
import type { FastifyInstance, FastifyRequest } from 'fastify'

export default class CorsServiceResolver < ServiceResolver

	static get runInCli
		false

	/**
	 * Get allowed origins.
	 *
	 * @param {string} origin
	 * @returns {string[]}
	 */
	def getOrigins origin\string
		const origins = []
		const requestOrigin = origin.split('://')[1]

		for o in self.app.config.get('cors.allowed_origins')
			const incomingOrigin = requestOrigin.split('.')
			const allowedOrigin = o.includes('://') ? o.split('://')[1].split('.') : o.split('.')

			if o === '*' then origins.push(origin.includes('://') ? origin.split('://')[1] : origin)

			if o !== '*'
				if allowedOrigin.length === incomingOrigin.length
					let index = 0
					let build = []

					while index < incomingOrigin.length
						const match = allowedOrigin[index] == '*' ? incomingOrigin[index] : allowedOrigin[index]

						build.push match

						index++

					const completeOrigin = build.join('.')

					origins.push(completeOrigin.includes('://') ? completeOrigin.split('://')[1] : completeOrigin)

		origins

	/**
	 * Check if path matches allowed path's.
	 *
	 * @param {FastifyRequest} request
	 * @returns {Boolean}
	 */
	def isMatchingPath request\FastifyRequest
		const url = request.url.includes('?') ? request.url.split('?')[0] : request.url

		for path in self.app.config.get('cors.paths')
			if path.endsWith('/*')
				const pathWithoutWildcard = path.substring(0, path.length - 2)
				const currentPath = url

				if currentPath.startsWith pathWithoutWildcard
					path = pathWithoutWildcard + currentPath.substring(currentPath.indexOf(pathWithoutWildcard) + pathWithoutWildcard.length)

			if url == path then return true

		return false

	/**
	 * Boot cors service resolver.
	 *
	 * @returns {void}
	 */
	def boot
		self.app.register cors, do
			do(request\FastifyRequest, callback)
				const options = {
					origin: do(origin\string, cb)
						if isEmpty(origin) then return cb(null, true)

						const requestOrigin = origin.split('://')[1]

						if self.getOrigins(origin).includes(requestOrigin) && self.isMatchingPath(request)
							cb null, true
							return

						# If the origin is not allowed, or the path is not allowed, return a 404
						throw new NotFoundException "Route {request.method}:{request.url} not found."

					credentials: self.app.config.get('cors.supports_credentials')
					maxAge: self.app.config.get('cors.max_age')
				}

				if self.app.config.get('cors.allowed_methods') && self.app.config.get('cors.allowed_methods')[0] !== '*'
					options.methods = self.app.config.get('cors.allowed_methods')

				if self.app.config.get('cors.allowed_headers') && self.app.config.get('cors.allowed_headers')[0] !== '*'
					options.allowed_headers = self.app.config.get('cors.allowed_headers')

				callback(null, options)
