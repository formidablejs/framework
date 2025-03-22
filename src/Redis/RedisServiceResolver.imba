import { RedisStore } from 'connect-redis'
import * as redis from 'redis'
import Redis from './Redis'
import ServiceResolver from '../Support/ServiceResolver'
import session from '@fastify/session'
import SessionDriverManager from '../Http/Session/DriverManager'

const socketProperties = [
	'port',
	'host',
	'family',
	'path',
	'connectTimeout'
	'noDelay',
	'keepAlive',
	'tls',
	'reconnectStrategy'
]

export default class RedisServiceResolver < ServiceResolver

	get connection
		const connection = self.app.config.get('database.redis.default')
		const socket     = {}

		for own key, value of connection
			if key in socketProperties
				socket[key] = value

				delete connection[key]

		if Object.keys(socket).length > 0
			connection.socket = socket

		Object.assign(connection, self.app.config.get('database.redis.options', {}))

	def redis
		let redisClient = redis.createClient(Object.assign({ legacyMode: false }, self.connection))
		redisClient.connect().catch(console.error)

		redisClient

	def boot
		# configure redis.
		Redis.configure(self.app.config)

		let sessionClient

		if self.app.config.get('session.driver') == 'redis'
			if process.argv && process.argv[1] && process.argv[1].substr(-10) !== 'console.js'
				sessionClient = self.redis!

				const redisStore = new RedisStore({
					client: sessionClient,
					prefix: self.app.config.get('database.redis.options.prefix', 'session')
				})

				SessionDriverManager.register('redis', redisStore)
			else
				SessionDriverManager.register('redis', do)

		# close redis connections.
		self.app.addHook 'onClose', do
			if sessionClient then sessionClient.quit!

			Redis.closeAll!
