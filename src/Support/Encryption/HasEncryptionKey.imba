import URL from '../../Http/URL/URL'
import MissingAppKeyException from './Exceptions/MissingAppKeyException'

export default class HasEncryptionKey

	def constructor config
		config = config

	def handle request
		!self.key! ? new MissingAppKeyException('No application encryption key has been specified.') : null

		URL.setSecret(self.key!)

		request

	def key
		self.config.get 'app.key'
