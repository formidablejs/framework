import DriverManager from '../../DriverManager'

const password = {
	beforeReset: null
}

export default class BeforeReset

	def constructor config
		this.config = config

	def handle request, reply, params\any[]
		const handler = password.beforeReset

		if handler then handler(request,reply,params, self.config)

		const [ protocol ] = params[0] != undefined ? params : [ 'api']

		request.authDriver = DriverManager.get(protocol, request, reply, params, self.config)

	static def beforeReset handler\Function
		if password.beforeReset !== null
			throw new Error 'beforeReset handler is already set.'

		password.beforeReset = handler
