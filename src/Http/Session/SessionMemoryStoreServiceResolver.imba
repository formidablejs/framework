const session = require '@fastify/session'
const DriverManager = require './DriverManager'
const ServiceResolver = require '../../Support/ServiceResolver'

module.exports = class SessionMemoryStoreServiceResolver < ServiceResolver

	def boot
		if self.app.config.get('session.driver') == 'memory'
			const MemoryStore = require('memorystore')(session)

			DriverManager.register('memory', new MemoryStore({
				checkPeriod: 86400000
			}))

			self.app.addHook('onClose', do
				if DriverManager.isRegistered('memory') then DriverManager.get('memory').stopInterval!
			)
