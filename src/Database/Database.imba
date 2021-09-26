import type { Knex } from 'knex'
import { attachPaginate } from 'knex-paginate'
import Config from './Config'
import knex from 'knex'

let Database\Knex = null

try
	Database\Knex = knex(Config.make())

	attachPaginate!
catch
	Database\Knex = null

export default Database
