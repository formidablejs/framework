import Encrypter from '../../Foundation/Encrypter'
import isEmpty from '../../Support/Helpers/isEmpty'
import Redirect from '../Redirect/Redirect'
import ServiceResolver from '../../Support/ServiceResolver'
import session from '@fastify/session'
import SessionDriverManager from '../Session/DriverManager'
import ValidationException from '../../Validator/Exceptions/ValidationException'
import type { FastifyReply } from 'fastify'
import type FormRequest from '../Request/FormRequest'

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

		self.app.onResponse do(response\ValidationException, request\FormRequest, reply\FastifyReply)
			if response instanceof ValidationException && !request.expectsJson!
				request.flash('_errors', response.message.errors)
				request.flash('_old', request.body!)

				return reply.redirect(request.header('referer')).sent = true
