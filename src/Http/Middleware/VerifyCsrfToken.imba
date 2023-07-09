import decrypt from '../../Support/Helpers/decrypt'
import encrypt from '../../Support/Helpers/encrypt'
import isEmpty from '../../Support/Helpers/isEmpty'
import isString from '../../Support/Helpers/isString'
import hashEquals from '../../Support/Helpers/hashEquals'
import TokenMismatchException from '../Session/Exceptions/TokenMismatchException'
import wildcard from '../../Support/Helpers/wildcard'
import type { FastifyReply } from 'fastify'
import type FormRequest from '../Request/FormRequest'
import type Repository from '../../Config/Repository'

export default class VerifyCsrfToken

	get addHttpCookie
		true

	get except
		[

		]

	def constructor config\Repository
		self.config = config

	def handle request\FormRequest, reply\FastifyReply, [ mode ]
		if isReading(request, mode) || shouldIgnore(request) || tokensMatch(request, mode)
			return addCookieToResponse(request, reply)

		throw new TokenMismatchException 'CSRF token mismatch.'

	def isReading request\FormRequest, mode = null
		if mode === 'allow-get' && request.method().toUpperCase() === 'GET'
			return false

		['HEAD', 'GET', 'OPTIONS'].includes(request.method().toUpperCase())

	def shouldIgnore request\FormRequest
		for value in self.except
			return true if wildcard(value, request.url())

		false

	def tokensMatch request\FormRequest, mode = null
		const token = getTokenFromRequest(request, mode)

		isString(request.session().token()) && isString(token) && hashEquals(request.session().token(), token) && (request.session().token() === token)

	def getTokenFromRequest request\FormRequest, mode = null
		let token = request.input('_token', request.header('X-CSRF-TOKEN'))

		if !token && request.hasHeader('X-XSRF-TOKEN')
			token = decrypt(request.header('X-XSRF-TOKEN'))

		if !token && request.cookies().has('XSRF-TOKEN') && mode === 'allow-get' && request.method().toUpperCase() === 'GET'
			token = decrypt(request.cookies().get('XSRF-TOKEN'))

		token

	def shouldAddXsrfTokenCookie
		addHttpCookie && !isEmpty(self.config.get('app.key'))

	def addCookieToResponse request, reply
		if !shouldAddXsrfTokenCookie
			return

		const session = config.get('session')

		reply.setCookie('XSRF-TOKEN', encrypt(request.session().token()), {
			domain: session.domain
			httpOnly: session.http_only
			maxAge: session.lifetime
			path: session.path
			sameSite: session.same_site
			secure: session.secure
		})

		request
