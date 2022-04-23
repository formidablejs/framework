import isEmpty from '../Support/Helpers/isEmpty'
import Auth from './Auth'
import Repository from '../Config/Repository'

export default class Protocol

	prop config\Repository

	def constructor config\Repository
		self.config = config

	static def make config\Repository
		new self(config)

	def configure protocol\String
		const fetchedProtocol = self.config.get "auth.protocols.{protocol}.provider"

		if isEmpty(fetchedProtocol)
			throw new Error "{protocol} is not a valid authentication protocol"

		const provider = self.config.get "auth.providers.{fetchedProtocol}"

		Auth.setProvider provider
