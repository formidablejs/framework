const DriverManager = require '../../DriverManager'

const loginAuth = {
	beforeLogin: null
}

module.exports = class BeforeLogin

	def constructor config
		this.config = config

	def handle request, reply, params\any[]
		const handler = loginAuth.beforeLogin

		if handler then handler(request,reply,params, self.config)

		const [ protocol ] = params[0] != undefined ? params : [ 'api']

		request.authDriver = DriverManager.get(protocol, request, reply, params, self.config)

	static def beforeLogin handler\Function
		if loginAuth.beforeLogin !== null
			throw new Error 'beforeLogin handler is already set.'

		loginAuth.beforeLogin = handler
