const DriverManager = require '../../DriverManager'

const registerAuth = {
	beforeRegister: null
}

module.exports = class BeforeRegister

	def constructor config
		this.config = config

	def handle request, reply, params\any[]
		const handler = registerAuth.beforeRegister

		if handler then handler(request,reply,params, self.config)

		const [ protocol ] = params[0] != undefined ? params : [ 'api']

		request.authDriver = DriverManager.get(protocol, request, reply, params, self.config)

	static def beforeRegister handler\Function
		if registerAuth.beforeRegister !== null
			throw new Error 'beforeRegister handler is already set'

		registerAuth.beforeRegister = handler
