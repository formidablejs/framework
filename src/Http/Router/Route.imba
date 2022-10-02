import Path from './Path'
import isString from '../../Support/Helpers/isString'
import ViewResponse from '../Response/ViewResponse'
import type View from '../View/View'

const routes = []
const middleware = []
const prefix = []

export default class Route

	static def addRoute verb\string, pattern\string, action\function|[function, string]
		if !['delete', 'get', 'options', 'patch', 'post', 'put'].includes verb
			throw new Error "{verb} is not a valid HTTP verb."

		if typeof pattern !== 'string' || (isString(pattern) && pattern.trim! == '')
			throw new Error 'Invalid route path.'

		routes.push {
			method: verb
			path: Path.clean prefix, pattern.trim!
			middleware: middleware.flat!
			action: action
			name: null
		}

		this

	/**
	 * Check if route exists.
	 */
	static def has name\string
		if routes.length === 0 then return false

		const names = routes.map do(route) route.name

		names.includes(name)

	/**
	 * Add a get route that renders a view.
	 */
	static def view path\string, view\View, data\object = {}, statusCode\number|null = null
		self.get path, do
			ViewResponse.make(view, data, statusCode ?? 200)

	/**
	 * Add a delete route.
	 */
	static def delete path\string, action\function|[function, string]
		self.addRoute 'delete', path, action

	/**
	 * Add a get route.
	 */
	static def get path\string, action\function|[function, string]
		self.addRoute 'get', path, action

	/**
	 * Add a options route.
	 */
	static def options path\string, action\function|[function, string]
		self.addRoute 'options', path, action

	/**
	 * Add a patch route.
	 */
	static def patch path\string, action\function|[function, string]
		self.addRoute 'patch', path, action

	/**
	 * Add a post route.
	 */
	static def post path\string, action\function|[function, string]
		self.addRoute 'post', path, action

	/**
	 * Add a put route.
	 */
	static def put path\string, action\function|[function, string]
		self.addRoute 'put', path, action

	/**
	 * Set route name.
	 */
	static def name name\string
		if routes.length === 0 then return this

		const names = routes.map do(route) route.name

		if names.includes name
			throw new Error "\"{name}\" is already in use by another route."

		routes.slice(-1).pop!.name = name

		this

	/**
	 * Add middleware to route.
	 */
	static def middleware name\string|string[]
		if routes.length === 0 then return this

		if !Array.isArray name then name = [name]

		name.forEach do(middleware)
			routes.slice(-1).pop!.middleware.push middleware

		this

	/**
	 * Add grouped routes.
	 */
	static def group options = new Object, callable\function
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
