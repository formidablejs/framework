import cookie from '@fastify/cookie'
import Encrypter from '../../Foundation/Encrypter'
import ServiceResolver from '../../Support/ServiceResolver'

export default class CookieServiceResolver < ServiceResolver

	static get runInCli
		false

	/**
	 * Session config.
	 */
	get config
		{
			secret: Encrypter.key!
			parseOptions: {
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
	 * Boot cookie service resolver.
	 *
	 * @returns {void}
	 */
	def boot
		self.app.register cookie, self.config
