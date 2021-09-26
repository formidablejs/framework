import bookshelf from 'bookshelf'
import config from '../Support/Helpers/config'
import isEmpty from '../Support/Helpers/isEmpty'
import knex from 'knex'

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

			return connection

		{}

	static get bookshelf
		try
			bookshelf(knex(self.make!))

export { Config }

export default Config
