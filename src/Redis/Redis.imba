import redis from 'redis'

const settings = {
	instances: {}
	config: {}
}

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

		settings.instances[database]

	static def connection database\String = 'default'
		let instance = settings.instances[database]

		if instance == undefined || instance == null
			new Redis(database)

			return settings.instances[database]

		instance

	static def configure config
		settings.config = config

	static def closeAll
		for own database, instance of settings.instances
			instance.quit!
