const Redis = require './Redis'
const ServiceResolver = require '../Support/ServiceResolver'
const session = require '@fastify/session'
const SessionDriverManager = require '../Http/Session/DriverManager'

module.exports = class RedisServiceResolver < ServiceResolver

	def boot
		# configure redis.
		Redis.configure(self.app.config)

		if self.app.config.get('session.driver') == 'redis'
			const redisStore = require('connect-redis')(session)

			# register redis store driver.
			SessionDriverManager.register('redis', new redisStore({
				client: Redis.connection('default')
			}))

		# close redis connections.
		self.app.addHook('onClose', do Redis.closeAll!)
