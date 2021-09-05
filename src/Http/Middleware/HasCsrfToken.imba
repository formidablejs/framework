const csrf = require '@fastify/csrf'

module.exports = class HasCsrfToken

	def constructor config
		self.config = config

	def handle request, reply
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
