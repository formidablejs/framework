import DriverManager from '../../DriverManager'

const emailVerification = {
	beforeResend: null
}

export default class BeforeResend

	def constructor config
		this.config = config

	def handle request, reply, params\any[]
		const handler = emailVerification.beforeResend

		if handler then handler(request,reply,params, self.config)

		const [ protocol ] = params[0] != undefined ? params : [ self.defaultProtocol ]

		request.authDriver = DriverManager.get(protocol, request, reply, params, self.config)

	get defaultProtocol
		self.config.get('auth.defaults.protocol', 'api')

	static def beforeResend handler\function
		if emailVerification.beforeResend !== null
			throw new Error 'beforeResend handler is already set'

		emailVerification.beforeResend = handler
