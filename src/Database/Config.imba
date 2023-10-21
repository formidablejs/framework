import config from '../Support/Helpers/config'
import isEmpty from '../Support/Helpers/isEmpty'

const settings = {
	driver: null
	returningDrivers: [
		'pg'
		'pg-native'
		'sqlite3'
		'better-sqlite3'
		'oracledb'
		'tedious'
	]
}

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

	# Connection settings.
	static get settings
		settings

	# Check if the selected driver is a returning driver.
	static get isReturningDriver
		settings.returningDrivers.includes(settings.driver)

	# Configure database connection.
	#
	# @returns {void}

	static def make
		try
			const connectionName = config('database.default')
			const client = config("database.connections.{connectionName}.driver", "mysql")
			let selectedConnection = config("database.connections.{connectionName}")

			if selectedConnection && selectedConnection.url && !isEmpty(selectedConnection.url)
				selectedConnection = selectedConnection.url

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

			settings.driver = connection.client

			return connection

		{}

export { Config }

export default Config
