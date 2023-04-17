import csrf from '@fastify/csrf'
import decrypt from '../../Support/Helpers/decrypt'
import encrypt from '../../Support/Helpers/encrypt'
import isEmpty from '../../Support/Helpers/isEmpty'
import TokenMismatchException from '../Session/Exceptions/TokenMismatchException'
import type { FastifyReply } from 'fastify'
import type FormRequest from '../Request/FormRequest'
import type Repository from '../../Config/Repository'
import wildcard from '../../Support/Helpers/wildcard'

export default class VerifyCsrfToken

	get addHttpCookie
		true

	get except
		[

		]

	def constructor config\Repository
		self.config = config

	def handle request\FormRequest, reply\FastifyReply
		if self.isReading(request) || self.shouldIgnore(request) || self.tokensMatch(request)
			if self.shouldAddXsrfTokenCookie!
				self.addCookieToResponse(request, reply)

			return request

		self.forgetTokens(request)

		throw new TokenMismatchException 'CSRF token mismatch.'

	def isReading request\FormRequest
		['HEAD', 'GET', 'OPTIONS'].includes(request.method!)

	def shouldIgnore request\FormRequest
		for value in self.except
			if wildcard(value, request.url!) then return true

		false

	def tokensMatch request\FormRequest
		let token = self.getTokenFromRequest(request)

		if !isEmpty(token)
			try token = decrypt(token)
			catch
				token = new String

		const payload = self.findToken(request, token)

		if !payload then return false

		(new csrf!).verify(payload.secret, payload.token)

	def getTokenFromRequest request\FormRequest
		let token = request.input('_token') ? request.input('_token') : request.header('x-csrf-token')

		if isEmpty(token) then token = request.header('x-xsrf-token')

		token ? token : new String

	def shouldAddXsrfTokenCookie
		self.addHttpCookie

	def addCookieToResponse request\FormRequest, reply\FastifyReply
		const session = self.config.get('session')

		const token\string = request.request.session.token

		if isEmpty(token) then return false;

		reply.setCookie('XSRF-TOKEN', encrypt(token), {
			domain: session.domain
			httpOnly: session.http_only
			maxAge: session.lifetime
			path: session.path
			sameSite: session.same_site
			secure: session.secure
		})

	def forgetTokens request\FormRequest
		request.request.session.csrf_tokens = null
		request.request.session.token = null

		return request

	def findToken request\FormRequest, token\string
		const tokens = request.request.session.csrf_tokens

		if !tokens
			return false

		request.request.session.csrf_tokens[token] ?? false
