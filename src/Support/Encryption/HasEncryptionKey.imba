const URL = require '../../Http/URL/URL'
const MissingAppKeyException = require './Exceptions/MissingAppKeyException'

module.exports = class HasEncryptionKey

	def constructor config
		config = config

	def handle request
		!self.key! ? new MissingAppKeyException('No application encryption key has been specified.') : null

		URL.setSecret(self.key!)

		request

	def key
		self.config.get 'app.key'
