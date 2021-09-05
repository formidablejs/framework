const Path = require './Path'

const routes = []
const middleware = []
const prefix = []

module.exports = class Manager

	static def addRoute verb\String, pattern\String, action\Function|[Function, String]
		if !['delete', 'get', 'options', 'patch', 'post', 'put'].includes verb
			throw new Error "{verb} is not a valid HTTP verb."

		if typeof pattern !== 'string' && pattern.trim! !== ''
			throw new Error "{pattern} is not a valid route pattern."

		routes.push {
			method: verb
			path: Path.clean prefix, pattern.trim!
			middleware: middleware.flat!
			action
			name: null
		}

		this


	static def delete path\String, action\Function|[Function, String]
		self.addRoute 'delete', path, action

		this

	static def get path\String, action\Function|[Function, String]
		self.addRoute 'get', path, action

		this

	static def options path\String, action\Function|[Function, String]
		self.addRoute 'options', path, action

		this

	static def patch path\String, action\Function|[Function, String]
		self.addRoute 'patch', path, action

		this

	static def post path\String, action\Function|[Function, String]
		self.addRoute 'post', path, action

		this

	static def put path\String, action\Function|[Function, String]
		self.addRoute 'put', path, action

		this

	static def name name\String
		if routes.length === 0
			return this

		const names = routes.map do(route)
			route.name

		if names.includes name
			throw new Error "\"{name}\" is already in use by another route."

		routes.slice(-1).pop!.name = name

		this

	static def middleware name\String|String[]
		if routes.length === 0
			return this

		if !Array.isArray name
			name = [name]

		name.forEach do(middleware)
			routes.slice(-1).pop!.middleware.push middleware

		this

	static def group options = new Object, callable\Function
		if !options || options && typeof options !== 'object'
			throw new Error 'Invalid route group.'

		let groupPrefix = options['prefix'] ? options['prefix'] : ''
		let groupMiddleware = options['middleware'] ? options['middleware'] : []

		# validate prefix
		if typeof groupPrefix !== 'string' || groupPrefix.trim! === '/'
			throw new Error 'Invalid prefix.'

		# validate middleware
		if typeof groupMiddleware === 'undefined'
			groupMiddleware = []

		if !Array.isArray groupMiddleware
			groupMiddleware = [groupMiddleware]

		# append prefix
		let prefixIndex = 0

		if groupPrefix.trim! !== ''
			prefix.push groupPrefix.trim!

			prefixIndex = prefix.length - 1

		let middlewareIndex = []

		# push middleware
		if groupMiddleware.length > 0
			groupMiddleware.forEach do(m)
				middleware.push m

				middlewareIndex.push middleware.length - 1

		# call callable
		(callable)!

		# remove appended prefix
		if groupPrefix.trim! !== ''
			prefix.splice prefixIndex

		# remove pushed middleware
		if middlewareIndex.length > 0
			middlewareIndex.forEach do(index)
				middleware.splice index

	static def all
		routes
