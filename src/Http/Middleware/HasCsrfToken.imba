import csrf from '@fastify/csrf'
import type FormRequest from '../Request/FormRequest'
import type Repository from '../../Config/Repository'

export default class HasCsrfToken

	def constructor config\Repository
		self.config = config

	def handle request\FormRequest
		if ['HEAD', 'GET', 'OPTIONS'].includes(request.method!)
			const secret = self.tokens!.secretSync!
			const token = self.tokens!.create(secret)

			request.request.session.secret = secret
			request.request.session.token = token

	def tokens
		new csrf({
			saltLength: 48
			secretLength: 48
		})
