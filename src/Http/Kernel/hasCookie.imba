import config from '../../Support/Helpers/config'
import cookie from 'fastify-cookie'
import Encrypter from '../../Foundation/Encrypter'

export default def hasCookies fastify, config
	fastify.register(cookie, {
		secret: Encrypter.key!
		parseOptions: {
			domain: config.get('session.domain')
			httpOnly: config.get('session.http_only')
			maxAge: config.get('session.lifetime')
			path: config.get('session.path')
			sameSite: config.get('session.same_site')
			secure: config.get('session.secure')
			signed: config.get('session.encrypt')
		}
	})
