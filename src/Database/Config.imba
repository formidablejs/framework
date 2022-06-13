import config from '../Support/Helpers/config'
import isEmpty from '../Support/Helpers/isEmpty'

class Config

	# Default connection name.
	#
	# @type {string}

	static get default
		config 'database.default', 'mysql'

	# All connections.
	#
	# @type {object}

	static get connections
		config 'database.connections', []

	# Selected client.
	#
	# @type {string}

	static get client
		connections[default]?.driver ?? 'mysql'

	# Configure database connection.
	#
	# @returns {void}

	static def make
		try
			const connectionName = config('database.default')

			const selectedConnection = config("database.connections.{connectionName}")

			const client = config("database.connections.{connectionName}.driver", "mysql")

			const connection = {
				client: client
				connection: selectedConnection
				migrations: config('database.migrations', {
					tableName: 'migrations'
					directory: './database/migrations'
				})
				seeds: config('database.seeds', {
					directory: './database/seeds'
				})
			}

			connection.debug = config('database.debug') if !isEmpty(config('database.debug'))
			connection.asyncStackTraces = config('database.asyncStackTraces') if !isEmpty(config('database.asyncStackTraces'))
			connection.pool = config('database.pool') if !isEmpty(config('database.pool'))
			connection.acquireConnectionTimeout = config('database.acquireConnectionTimeout') if !isEmpty(config('database.acquireConnectionTimeout'))
			connection.fetchAsString = config('database.fetchAsString') if !isEmpty(config('database.fetchAsString'))
			connection.useNullAsDefault = config('database.useNullAsDefault') if !isEmpty(config('database.useNullAsDefault'))

			return connection

		{}

export { Config }

export default Config
