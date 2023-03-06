import session from '@fastify/session'
import DriverManager from './DriverManager'
import ServiceResolver from '../../Support/ServiceResolver'
import MemoryStore from 'memorystore'

export default class SessionMemoryStoreServiceResolver < ServiceResolver

	static get runInCli
		false

	def boot
		if self.app.config.get('session.driver') == 'memory'
			const store = MemoryStore(session)

			DriverManager.register('memory', new store({
				checkPeriod: 86400000
			}))

			self.app.addHook('onClose', do
				if DriverManager.isRegistered('memory') then DriverManager.get('memory').stopInterval!
			)
