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
		shouldIgnore(request)
		if self.isReading(request) || self.shouldIgnore(request) || self.tokensMatch(request)
			if !self.isReading(request) then self.forgetTokens(request)

			if self.shouldAddXsrfTokenCookie! then self.addCookieToResponse(request, reply)

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

		(new csrf!).verify(request.request.session.secret, decrypt(token))

	def getTokenFromRequest request\FormRequest
		const token = request.input('_token') ? request.input('_token') : request.header('x-csrf-token')

		token ? token : new String

	def shouldAddXsrfTokenCookie
		self.addHttpCookie

	def addCookieToResponse request\FormRequest, reply\FastifyReply
		const session = self.config.get('session')

		const token\String = request.request.session.token

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
		request.request.session.secret = null
		request.request.session.token = null

		return request
