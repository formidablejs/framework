import Config from './Config'
import knexjs from 'knex'
import { attachPaginate } from 'knex-paginate'

let knex = null

try
	knex = knexjs(Config.make!)

	attachPaginate!
catch
	knex = null

export default knex
