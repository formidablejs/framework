const { wildcard } = require '@formidablejs/helpers'
const csrf = require '@fastify/csrf'
const TokenMismatchException = require '../Session/Exceptions/TokenMismatchException'

module.exports = class VerifyCsrfToken

	get addHttpCookie
		true

	get except
		[

		]

	def constructor config
		self.config = config

	def handle request, reply
		shouldIgnore(request)
		if self.isReading(request) || self.shouldIgnore(request) || self.tokensMatch(request)
			if !self.isReading(request) then self.forgetTokens(request)

			if self.shouldAddXsrfTokenCookie! then self.addCookieToResponse(request, reply)

			return request

		self.forgetTokens(request)

		throw new TokenMismatchException 'CSRF token mismatch.'

	def isReading request
		['HEAD', 'GET', 'OPTIONS'].includes(request.method!)

	def shouldIgnore request
		for value in self.except
			if wildcard(value, request.url!) then return true

		false

	def tokensMatch request
		const token = self.getTokenFromRequest(request)

		const results = (new csrf!).verify(request.request.session.secret, token)

		return results

	def getTokenFromRequest request
		const token = request.input('_token') ? request.input('_token') : request.header('x-csrf-token')

		token ? token : new String

	def shouldAddXsrfTokenCookie
		self.addHttpCookie

	def addCookieToResponse request, reply
		const session = self.config.get('session')

		const token = request.request.session.token

		if token === null || token === undefined then return false;

		reply.setCookie('XSRF-TOKEN', request.request.session.token, {
			domain: session.domain
			httpOnly: session.http_only
			maxAge: session.lifetime
			path: session.path
			sameSite: session.same_site
			secure: session.secure
		})

	def forgetTokens request
		request.request.session.secret = null
		request.request.session.token = null

		return request
