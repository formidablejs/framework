const DriverManager = require '../../DriverManager'

const password = {
	beforeForgot: null
}

module.exports = class BeforeForgot

	def constructor config
		this.config = config

	def handle request, reply, params\any[]
		const handler = password.beforeForgot

		if handler then handler(request,reply,params, self.config)

		const [ protocol ] = params[0] != undefined ? params : [ 'api']

		request.authDriver = DriverManager.get(protocol, request, reply, params, self.config)

	static def beforeForgot handler\Function
		if password.beforeForgot !== null
			throw new Error 'beforeForgot handler is already set.'

		password.beforeForgot = handler
