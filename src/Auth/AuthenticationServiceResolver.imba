const Auth = require './Auth'
const ConfigRepository = require '../Config/Repository'
const ServiceResolver = require '../Support/ServiceResolver'

module.exports = class AuthenticationServiceResolver < ServiceResolver

	get protocol
		const default = self.app.make(ConfigRepository).get 'auth.defaults.protocol'

		self.app.make(ConfigRepository).get "auth.protocols.{default}.provider"

	get provider
		self.app.make(ConfigRepository).get "auth.providers.{self.protocol}"

	def boot
		Auth.setProvider self.provider
