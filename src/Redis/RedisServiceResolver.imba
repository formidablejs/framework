import Redis from './Redis'
import ServiceResolver from '../Support/ServiceResolver'
import session from '@fastify/session'
import SessionDriverManager from '../Http/Session/DriverManager'
import redisStore from 'connect-redis'

export default class RedisServiceResolver < ServiceResolver

	def boot
		# configure redis.
		Redis.configure(self.app.config)

		if self.app.config.get('session.driver') == 'redis'
			const store = redisStore(session)
			const client = await Redis.connection('default')

			# register redis store driver.
			SessionDriverManager.register('redis', new store({
				client: client
			}))

		# close redis connections.
		self.app.addHook('onClose', do Redis.closeAll!)
