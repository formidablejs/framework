import Auth from '../../Auth/Auth'
import Encrypter from '../../Foundation/Encrypter'
import isEmpty from '../../Support/Helpers/isEmpty'
import Redirect from '../Redirect/Redirect'
import ServiceResolver from '../../Support/ServiceResolver'
import session from '@fastify/session'
import SessionDriverManager from '../Session/DriverManager'
import ValidationException from '../../Validator/Exceptions/ValidationException'
import PersonalAccessToken from '../../Auth/Tokens/PersonalAccessToken'
import Protocol from '../../Auth/Protocol'
import FormRequest from '../Request/FormRequest'
import DriverManager from '../../Auth/DriverManager'
import type { FastifyRequest } from 'fastify'
import type { FastifyReply } from 'fastify'

export default class SessionServiceResolver < ServiceResolver

	/**
	 * Session config.
	 */
	get config
		{
			secret: Encrypter.key!
			store: null
			cookieName: self.app.config.get('session.cookie')
			cookie: {
				domain: self.app.config.get('session.domain')
				httpOnly: self.app.config.get('session.http_only')
				maxAge: self.app.config.get('session.lifetime')
				path: self.app.config.get('session.path')
				sameSite: self.app.config.get('session.same_site')
				secure: self.app.config.get('session.secure')
				signed: self.app.config.get('session.encrypt')
			}
		}

	/**
	 * Boot session service resolver.
	 *
	 * @returns {void}
	 */
	def boot
		const driver = self.app.config.get('session.driver', 'memory')
		const store = SessionDriverManager.get(driver)

		let config = self.config

		if !isEmpty(store) then config.store = store

		self.app.register session, config

		self.app.addHook 'onRequest', do(request, reply, done)
			try self.attemptAuth(request, reply)

		self.app.onResponse do(response\ValidationException, request\FormRequest, reply\FastifyReply)
			if response instanceof ValidationException && request.expectsHtml!
				request.flash('_errors', response.message.errors)
				request.flash('_old', request.body!)

				return reply.redirect(request.header('referer')).sent = true

	def attemptAuth request\FastifyRequest, reply\FastifyReply, done\Function
		const token\String = await request.session.personal_access_token

		if !(typeof token === 'string' && !isEmpty(token))
			return remove(request)
		
		# get decoded token
		const decodedToken\Boolean|Object = await PersonalAccessToken.verify(token)

		if decodedToken === false then return remove(request)
		
		# get auth protocol from token.
		const protocol = decodedToken.protocol || null
		
		if isEmpty(protocol) then return remove(request)

		# configure auth protocol.
		Protocol.make(self.app.config).configure(protocol)

		# get driver manager.
		const handler = DriverManager.get(
			protocol,
			new FormRequest(request, {}, reply, self.app.config),
			reply,
			[],
			self.app.config
		)

		try
			const personalAccessToken\{
				token: {}
				tokenable: {}
			} = await handler.verify!

			request.auth = do new Auth(
				personalAccessToken.tokenable,
				personalAccessToken.token.abilities,
				handler
			)

			done!

			return

		# remove personal access token from session if verification failed.
		remove(request)

	def remove request\FastifyRequest
		delete request.session.personal_access_token

		return
	
	