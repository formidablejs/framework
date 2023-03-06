import { join } from 'path'
import fastifystatic from '@fastify/static'
import ServiceResolver from '../../Support/ServiceResolver'

export default class StaticContentServiceResolver < ServiceResolver

	static get runInCli
		false

	/**
	 * Public directory.
	 */
	get public
		{
			root: join(process.cwd!, 'public')
			wildcard: false
			decorateReply: true
			prefixAvoidTrailingSlash: true
		}

	/**
	 * Formidable assets directory.
	 */
	get assets
		{
			root: join(process.cwd!, '.formidable', 'public', '__assets__')
			wildcard: false
			prefix: '/__assets__/'
			decorateReply: false
		}

	/**
	 * Register public and formidable assets directories as static content paths.
	 *
	 * @returns {void}
	 */
	def boot
		/** register public directory. */
		self.app.register fastifystatic, self.public

		/** register formidable assets directory. */
		self.app.register fastifystatic, self.assets
