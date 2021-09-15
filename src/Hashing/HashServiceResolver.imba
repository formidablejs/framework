import ServiceResolver from '../Support/ServiceResolver'
import Hash from './Hash'

export default class HashServiceResolver < ServiceResolver

	def boot
		Hash.configure(self.app.config.get('hashing'))
