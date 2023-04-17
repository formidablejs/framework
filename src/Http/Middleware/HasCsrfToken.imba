import csrf from '@fastify/csrf'
import type FormRequest from '../Request/FormRequest'
import type Repository from '../../Config/Repository'

export default class HasCsrfToken

	def constructor config\Repository
		self.config = config

	def handle request\FormRequest
		if ['HEAD', 'GET', 'OPTIONS'].includes(request.method!)
			self.initCsrfTokens(request)

			request.request.session.token = self.createCsrfToken(request)

	def tokens
		new csrf({
			saltLength: 48
			secretLength: 48
		})

	def initCsrfTokens request\FormRequest
		if !request.request.session.csrf_tokens
			request.request.session.csrf_tokens = {}

	def createCsrfToken request\FormRequest
		const secret = self.tokens!.secretSync!
		const token = self.tokens!.create(secret)

		request.request.session.csrf_tokens[token] = {
			secret: secret
			token: token
			created_at: new Date()
		}

		token
