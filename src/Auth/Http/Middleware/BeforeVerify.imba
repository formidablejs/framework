import DriverManager from '../../DriverManager'

const emailVerification = {
	beforeVerify: null
}

export default class BeforeVerify

	def constructor config
		this.config = config

	def handle request, reply, params\any[]
		const handler = emailVerification.beforeVerify

		if handler then handler(request,reply,params, self.config)

		const [ protocol ] = params[0] != undefined ? params : [ self.defaultProtocol ]

		request.authDriver = DriverManager.get(protocol, request, reply, params, self.config)

	get defaultProtocol
		self.config.get('auth.defaults.protocol', 'api')

	static def beforeVerify handler\Function
		if emailVerification.beforeVerify !== null
			throw new Error 'beforeVerify handler is already set'

		emailVerification.beforeVerify = handler
