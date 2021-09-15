import DriverManager from '../../DriverManager'

const logoutAuth = {
	beforeLogout: null
}

export default class BeforeLogout

	def constructor config
		this.config = config

	def handle request, reply, params\any[]
		const handler = logoutAuth.beforeLogout

		if handler then handler(request,reply,params, self.config)

		const [ protocol ] = params[0] != undefined ? params : [ 'api']

		request.authDriver = DriverManager.get(protocol, request, reply, params, self.config)

	static def beforeLogout handler\Function
		if logoutAuth.beforeLogout !== null
			throw new Error 'beforeLogout handler is already set.'

		logoutAuth.beforeLogout = handler
