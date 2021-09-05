const ServiceResolver = require '../Support/ServiceResolver'
const Hash = require './Hash'

module.exports = class HashServiceResolver < ServiceResolver

	def boot
		Hash.configure(self.app.config.get('hashing'))
