const config = { cors: null }

module.exports = class HandleCors

	def handle request, reply
		if ! this.shouldRun request
			return true

		return this.run request, reply

	def shouldRun request
		return this.isMatchingPath request

	def isMatchingPath request
		for path in config.cors.paths
			if path.endsWith('/*')
				const pathWithoutWildcard = path.substring(0, path.length - 2)
				const currentPath = request.url!

				if currentPath.startsWith pathWithoutWildcard
					path = pathWithoutWildcard + currentPath.substring(currentPath.indexOf(pathWithoutWildcard) + pathWithoutWildcard.length)

			if request.isUrl(path) || request.isFullUrl(path)
				return true

		return false

	def run request, reply
		const origin = this.getOrigin request

		if origin
			request.setHeaders {
				'Access-Control-Allow-Origin': origin
				'Access-Control-Request-Method': config.cors.allowed_methods.join(', ')
				'Access-Control-Allow-Methods': config.cors.allowed_methods.join(', ')
				'Access-Control-Allow-Headers': config.cors.allowed_headers.join(', ')
			}

			if config.cors.supports_credentials === true
				request.setHeader('Access-Control-Allow-Credentials', config.cors.supports_credentials)

			if config.cors.max_age > 0
				request.setHeader('Access-Control-Max-Age', config.cors.max_age)

		if request.isMethod 'options'
			return reply.send('')

		this

	def getOrigin request
		const origins = []

		for origin in config.cors.allowed_origins
			origins.push(this.getWildcardOrigin(origin, request))

		if origins.includes(request.getFullOrigin!)
			return request.getFullOrigin!

		null

	def getWildcardOrigin origin\String, request
		if origin === '*'
			return request.getFullOrigin!

		const ghostProtocol = request.getOriginProtocol!
		const currentOrigin = request.getOrigin!.split('.')

		if origin.split('.').length === currentOrigin.length
			let index = 0
			let build = []

			while index < currentOrigin.length
				const match = origin.split('.')[index] === '*' ? currentOrigin[index] : origin.split('.')[index]

				build.push match

				index++

			return ghostProtocol + build.join('.')

		return origin

	static def configure cors\Object
		if config.cors
			throw new Error 'Cors already configured.'

		config.cors = cors
