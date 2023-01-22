import type { Knex } from 'knex'
import { attachPaginate } from 'knex-paginate'
import Config from './Config'
import knex from 'knex'

let Database\Knex = null

try
	let config = Config.make()

	delete config.connection.driver

	Database\Knex = knex(config)

	attachPaginate!
catch
	Database\Knex = null

export default Database
