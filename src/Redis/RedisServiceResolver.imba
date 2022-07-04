import * as redis from 'redis'
import Redis from './Redis'
import ServiceResolver from '../Support/ServiceResolver'
import session from '@fastify/session'
import SessionDriverManager from '../Http/Session/DriverManager'
import redisStore from 'connect-redis'

export default class RedisServiceResolver < ServiceResolver

	get connection
		const connection = self.app.config.get('database.redis.default')
		const options = self.app.config.get('database.redis.options')

		Object.assign(connection, options)

	def redis
		let redisClient = redis.createClient(Object.assign({ legacyMode: true }, self.connection))
		redisClient.connect().catch(console.error)

		redisClient

	def boot
		# configure redis.
		Redis.configure(self.app.config)

		if self.app.config.get('session.driver') == 'redis'
			const store = redisStore(session)

			# register redis store driver.
			SessionDriverManager.register('redis', new store({
				client: self.redis!
			}))

		# close redis connections.
		self.app.addHook('onClose', do Redis.closeAll!)
