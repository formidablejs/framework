import DriverManager from '../../DriverManager'

const password = {
	beforeForgot: null
}

export default class BeforeForgot

	def constructor config
		this.config = config

	def handle request, reply, params\any[]
		const handler = password.beforeForgot

		if handler then handler(request,reply,params, self.config)

		const [ protocol ] = params[0] != undefined ? params : [ self.defaultProtocol ]

		request.authDriver = DriverManager.get(protocol, request, reply, params, self.config)

	get defaultProtocol
		self.config.get('auth.defaults.protocol', 'api')

	static def beforeForgot handler\function
		if password.beforeForgot !== null
			throw new Error 'beforeForgot handler is already set.'

		password.beforeForgot = handler
