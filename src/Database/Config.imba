const { config } = require '@formidablejs/helpers'
const bookshelf = require 'bookshelf'
const knex = require 'knex'

module.exports = class Config

	# Configure database connection.
	#
	# @returns {void}

	static def make
		try
			const connectionName = config('database.default')

			const selectedConnection = config("database.connections.{connectionName}")

			const client =  config("database.connections.{connectionName}.driver", "mysql")

			return {
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

	static get bookshelf
		try
			bookshelf(knex(self.make!))
