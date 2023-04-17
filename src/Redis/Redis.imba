import * as redis from 'redis'

const settings = { instances: {}, config: {}, running: [] }

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

export default class Redis
	def constructor database\string = 'default'
		if settings.instances[database]
			return settings.instances[database]

		let connection = settings.config.get("database.redis.{database}")

		const socket = {}

		for own key, value of connection
			if key in socketProperties
				socket[key] = value

				delete connection[key]

		if Object.keys(socket).length > 0
			connection.socket = socket

		# merge redis options to redis connection.
		connection = Object.assign(
			connection,
			settings.config.get('database.redis.options', {})
		)

		# prepend database name to connection prefix.
		if connection.prefix
			connection.prefix += "{database}_"

		# remove null values.
		for own key, value of connection
			if value == null || value == 'null'
				delete connection[key]

		const db = connection.database

		if db !== undefined || db !== null
			delete connection.database

			connection.db = db

		settings.instances[database] = redis.createClient(connection)

		settings.instances[database].on 'error', do(error)
			throw error

	static def connection database\string = 'default'
		let instance = settings.instances[database]

		if instance == undefined || instance == null
			new Redis(database, config)

			instance = settings.instances[database]

		if settings.running.indexOf(database) == -1
			await instance.connect!

			settings.running.push(database)

			settings.instances[database] = instance

		instance

	static def configure config
		settings.config = config

	static def closeAll
		for own database, instance of settings.instances
			settings.running.splice(settings.running.indexOf(database), 1)

			instance.quit!

	static def set key\string, value\string, options\any = null
		const i = await self.connection!

		await i.set key, value, options

	static def get key\string
		const i = await self.connection!

		await i.get key

	static def del key\string
		const i = await self.connection!

		await i.del key

	static def command command\string, key\string, value\string|null = null, nx\any = null
		const i = await self.connection!

		await i.sendCommand command, key, value, nx
