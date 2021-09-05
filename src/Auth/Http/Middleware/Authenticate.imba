const Auth = require '../../Auth'
const DriverManager = require '../../DriverManager'

module.exports = class Authenticate

	def constructor config
		this.config = config

	def handle request, reply, params\any[]
		const [ protocol ] = (params[0] !== undefined && params[0] !== null) ? params : [ 'api' ]

		self.configure protocol

		const handler = DriverManager.get(protocol, request, reply, params, self.config)

		const personalAccessToken = await handler.verify!

		request.auth = do new Auth(personalAccessToken.tokenable, personalAccessToken.token.abilities)

	def configure protocol
		const fetchedProtocol = self.config.get "auth.protocols.{protocol}.provider"

		if fetchedProtocol == undefined || fetchedProtocol == null
			throw new Error "{protocol} is not a valid authentication protocol"

		const provider = self.config.get "auth.providers.{fetchedProtocol}"

		Auth.setProvider provider
