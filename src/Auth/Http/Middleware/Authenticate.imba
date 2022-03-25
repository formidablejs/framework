import Auth from '../../Auth'
import DriverManager from '../../DriverManager'
import isEmpty from '../../../Support/Helpers/isEmpty'
import Protocol from '../../Protocol'
import type { FastifyReply } from 'fastify'
import type FormRequest from '../../../Http/Request/FormRequest'
import type Repository from '../../../Config/Repository'

export default class Authenticate

	def constructor config\Repository
		this.config = config

	def handle request\FormRequest, reply\FastifyReply, params\any[]|null
		# ignore middleware if user is already authenticated.
		if request.auth!.user! !== null then return

		const [ protocol ] = !isEmpty(params[0]) ? params : [ self.defaultProtocol ]

		self.configure protocol

		const handler = DriverManager.get(protocol, request, reply, params, self.config)

		const personalAccessToken\{token: {}, tokenable: {}} = await handler.verify!

		request.auth = do new Auth(
			personalAccessToken.tokenable,
			personalAccessToken.token.abilities,
			handler
		)

	get defaultProtocol
		self.config.get('auth.defaults.protocol', 'api')

	def configure protocol\String
		Protocol.make(self.config).configure(protocol)
