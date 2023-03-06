import Auth from './Auth'
import ConfigRepository from '../Config/Repository'
import ServiceResolver from '../Support/ServiceResolver'

export default class AuthenticationServiceResolver < ServiceResolver

	static get runInCli
		false

	get protocol
		const default = self.app.make(ConfigRepository).get 'auth.defaults.protocol'

		self.app.make(ConfigRepository).get "auth.protocols.{default}.provider"

	get provider
		self.app.make(ConfigRepository).get "auth.providers.{self.protocol}"

	def boot
		Auth.setProvider self.provider
