import DriverManager from '../../DriverManager'

const loginAuth = {
	beforeLogin: null
}

export default class BeforeLogin

	def constructor config
		this.config = config

	def handle request, reply, params\any[]
		const handler = loginAuth.beforeLogin

		if handler then handler(request,reply,params, self.config)

		const [ protocol ] = params[0] != undefined ? params : [ self.defaultProtocol ]

		request.authDriver = DriverManager.get(protocol, request, reply, params, self.config)

	get defaultProtocol
		self.config.get('auth.defaults.protocol', 'api')

	static def beforeLogin handler\function
		if loginAuth.beforeLogin !== null
			throw new Error 'beforeLogin handler is already set.'

		loginAuth.beforeLogin = handler
