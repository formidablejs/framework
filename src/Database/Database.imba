import { attachPaginate } from 'knex-paginate'
import Config from './Config'
import knexjs from 'knex'
import type { Knex } from 'knex'

let Database\Knex = null

try
	Database = knexjs(Config.make())

	attachPaginate!
catch
	Database\Knex = null

export default Database
