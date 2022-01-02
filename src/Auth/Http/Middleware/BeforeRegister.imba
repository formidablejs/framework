import DriverManager from '../../DriverManager'

const registerAuth = {
	beforeRegister: null
}

export default class BeforeRegister

	def constructor config
		this.config = config

	def handle request, reply, params\any[]
		const handler = registerAuth.beforeRegister

		if handler then handler(request,reply,params, self.config)

		const [ protocol ] = params[0] != undefined ? params : [ self.defaultProtocol ]

		request.authDriver = DriverManager.get(protocol, request, reply, params, self.config)

	get defaultProtocol
		self.config.get('auth.defaults.protocol', 'api')

	static def beforeRegister handler\Function
		if registerAuth.beforeRegister !== null
			throw new Error 'beforeRegister handler is already set'

		registerAuth.beforeRegister = handler
