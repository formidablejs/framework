import cors from 'fastify-cors'
import NotFoundException from '../../Http/Exceptions/NotFoundException'

def getOrigins origin\String, config
	const origins = []
	const requestOrigin = origin.split('://')[1]

	for o in config.get('cors.allowed_origins')
		const incomingOrigin = requestOrigin.split('.')
		const allowedOrigin = o.includes('://') ? o.split('://')[1].split('.') : o.split('.')

		if o === '*'
			origins.push origin
		else
			if allowedOrigin.length === incomingOrigin.length
				let index = 0
				let build = []

				while index < incomingOrigin.length
					const match = allowedOrigin[index] == '*' ? incomingOrigin[index] : allowedOrigin[index]

					build.push match

					index++

				origins.push build.join('.')

	origins

def isMatchingPath request, config
	const url = request.url.includes('?') ? request.url.split('?')[0] : request.url

	for path in config.get('cors.paths')
		if path.endsWith('/*')
			const pathWithoutWildcard = path.substring(0, path.length - 2)
			const currentPath = url

			if currentPath.startsWith pathWithoutWildcard
				path = pathWithoutWildcard + currentPath.substring(currentPath.indexOf(pathWithoutWildcard) + pathWithoutWildcard.length)

		if url == path
			return true

	return false

export default def hasCors fastify, config
	fastify.register cors, do(instance)
		do(request, callback)
			const options = {
				origin: do(origin, cb)
					if origin == undefined || origin == null
						return cb null, true

					const requestOrigin = origin.split('://')[1]

					if getOrigins(origin, config).includes(requestOrigin) && isMatchingPath(request, config)
						cb null, true
						return

					# If the origin is not allowed, or the path is not allowed, return a 404
					throw new NotFoundException "Route {request.method}:{request.url} not found."

				credentials: config.get('cors.supports_credentials')
				maxAge: config.get('cors.max_age')
			}

			if config.get('cors.allowed_methods') && config.get('cors.allowed_methods')[0] !== '*'
				options.methods = config.get('cors.allowed_methods')

			if config.get('cors.allowed_headers') && config.get('cors.allowed_headers')[0] !== '*'
				options.allowed_headers = config.get('cors.allowed_headers')

			callback(null, options)
