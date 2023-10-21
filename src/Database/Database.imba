import type { Knex } from 'knex'
import { attachPaginate } from 'knex-paginate'
import Config from './Config'
import knex from 'knex'

let Database\Knex = null

try
	let config = Object.assign({}, Config.make())

	delete config.connection.driver

	Database\Knex = knex(config)

	knex.QueryBuilder.extend 'create', do(data)
		const returning = Config.isReturningDriver ? ['*', { includeTriggerModifications: true }] : null

		let results

		if Array.isArray(returning)
			results = await this.insert(data).returning(...returning)
		else
			results = await this.insert(data)

		return !Array.isArray(data) && Array.isArray(results) ? results[0] : results

	knex.QueryBuilder.extend 'softDelete', do this.update({ deleted_at: Database.fn.now! })

	knex.QueryBuilder.extend 'restore', do this.update({ deleted_at: null })

	knex.QueryBuilder.extend 'withTrashed', do this.where do this.whereNull('deleted_at').orWhereNotNull('deleted_at')

	knex.QueryBuilder.extend 'withoutTrashed', do this.whereNull('deleted_at')

	knex.QueryBuilder.extend 'onlyTrashed', do this.whereNotNull('deleted_at')

	knex.TableBuilder.extend 'softDeletes', do this.timestamp('deleted_at').nullable!

	knex.TableBuilder.extend 'dropSoftDeletes', do this.dropColumn('deleted_at')

	knex.TableBuilder.extend 'rememberToken', do this.string('remember_token').nullable!

	attachPaginate!

catch
	Database\Knex = null

export default Database
