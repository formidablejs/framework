import config from '../Support/Helpers/config'
import bookshelf from 'bookshelf'
import knex from 'knex'

export default class Config

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
				connection: {
					host: selectedConnection.host ?? '127.0.0.1'
					port: selectedConnection.port ?? '3306'
					user: selectedConnection.username
					password: selectedConnection.password
					database: selectedConnection.database
					charset: selectedConnection.charset
				}
			}

			if connection.client == 'sqlite3' && connection.connection.database
				connection.connection.filename = connection.connection.database

				delete connection.connection.database

			return connection

		{}

	static get bookshelf
		try
			bookshelf(knex(self.make!))
