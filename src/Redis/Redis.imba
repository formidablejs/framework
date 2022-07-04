import * as redis from 'redis'

const settings = { instances: {}, config: {}, running: [] }

export default class Redis
	def constructor database\String = 'default'

		if settings.instances[database] then return settings.instances[database]

		let connection = settings.config.get("database.redis.{database}")

		# merge redis options to redis connection.

		connection = Object.assign(
			connection,
			settings.config.get('database.redis.options', {})
		)

		# prepend database name to connection prefix.

		if connection.prefix then connection.prefix += "{database}_"

		# remove null values.

		for own key, value of connection
			if value == null || value == 'null' then delete connection[key]

		const db = connection.database

		if db !== undefined || db !== null
			delete connection.database

			connection.db = db

		settings.instances[database] = redis.createClient(connection)

		settings.instances[database].on 'error', do(error) throw error

	static def connection database\String = 'default'
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

	static def set key\String, value\String, options\any = null
		const i = await self.connection!

		await i.set key, value, options

	static def get key\String
		const i = await self.connection!

		await i.get key

	static def del key\String
		const i = await self.connection!

		await i.del key

	static def command command\String, key\String, value\String|null = null, nx\any = null
		const i = await self.connection!

		await i.sendCommand command, key, value, nx
