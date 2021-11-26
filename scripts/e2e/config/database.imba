import { helpers } from '@formidablejs/framework'

export default {

	# --------------------------------------------------------------------------
	# Default Database Connection Name
	# --------------------------------------------------------------------------
	#
	# Here you may specify which of the database connections below you wish
	# to use as your default connection for all database work. Of course
	# you may use many connections at once using the Database library.

	default: helpers.env 'DB_CONNECTION', 'mysql'

	# --------------------------------------------------------------------------
	# Database Connections
	# --------------------------------------------------------------------------
	#
	# Here are each of the database connections setup for your application.
	# Feel free to add more.

	connections: {
		sqlite: {
			driver: 'sqlite3'
			filename: helpers.env 'DATABASE_URL'
		}

		mysql: {
			driver: 'mysql'
			url: helpers.env 'DATABASE_URL'
			host: helpers.env 'DB_HOST', '127.0.0.1'
			port: helpers.env 'DB_PORT', '3306'
			user: helpers.env 'DB_USER', ''
			database: helpers.env 'DB_DATABASE', ''
			password: helpers.env 'DB_PASSWORD', ''
			charset: 'utf8mb4'
		}

		pgsql: {
			driver: 'pg'
			url: helpers.env 'DATABASE_URL'
			host: helpers.env 'DB_HOST', '127.0.0.1'
			port: helpers.env 'DB_PORT', '5432'
			user: helpers.env 'DB_USER', ''
			database: helpers.env 'DB_DATABASE', ''
			password: helpers.env 'DB_PASSWORD', ''
			charset: 'utf8'
		}

		mssql: {
			driver: 'tedious'
			url: helpers.env 'DATABASE_URL'
			host: helpers.env 'DB_HOST', '127.0.0.1'
			port: helpers.env 'DB_PORT', '5432'
			user: helpers.env 'DB_USER', ''
			database: helpers.env 'DB_DATABASE', ''
			password: helpers.env 'DB_PASSWORD', ''
			charset: 'utf8'
		}
	}

	# --------------------------------------------------------------------------
	# Migration Settings
	# --------------------------------------------------------------------------
	#
	# Here you can configure database migration settings.
	#
	# The "tableName" is the name of the table that will store the migration
	# state.
	# The "directory" is the location where migrations files are stored.

	migrations: {
		tableName: 'migrations'
		directory: './database/migrations'
	}

	# --------------------------------------------------------------------------
	# useNullAsDefault
	# --------------------------------------------------------------------------
	#
	# If one prefers that undefined keys are replaced with NULL instead of
	# DEFAULT one may give useNullAsDefault configuration parameter in knex
	# config.

	useNullAsDefault: true

	# --------------------------------------------------------------------------
	# Redis Databases
	# --------------------------------------------------------------------------
	#
	# You can configure your redis databases here.

	redis: {
		options: {
			prefix: helpers.env 'REDIS_PREFIX', helpers.slug(helpers.env('APP_NAME', 'formidable'), '_') + '_database_'
		}

		default: {
			url: helpers.env 'REDIS_URL'
			host: helpers.env 'REDIS_HOST', '127.0.0.1'
			password: helpers.env 'REDIS_PASSWORD', null
			port: helpers.env 'REDIS_PORT', '6379'
			database: helpers.env 'REDIS_DB', '0'
		}

		cache: {
			url: helpers.env 'REDIS_URL'
			host: helpers.env 'REDIS_HOST', '127.0.0.1'
			password: helpers.env 'REDIS_PASSWORD', null
			port: helpers.env 'REDIS_PORT', '6379'
			database: helpers.env 'REDIS_CACHE_DB', '1'
		}
	}

}
