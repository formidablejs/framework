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

			const useNullAsDefault = isEmpty(config('database.useNullAsDefault')) ? { } : { useNullAsDefault: config('database.useNullAsDefault') }

			return Object.assign(connection, useNullAsDefault)

		{}

export { Config }

export default Config
