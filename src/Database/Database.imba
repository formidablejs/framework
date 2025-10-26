import type { Knex } from 'knex'
import { attachPaginate } from 'knex-paginate'
import querystring from 'querystring'
import location from '../Support/Helpers/location'
import isString from '../Support/Helpers/isString'
import singularize from '../Support/Helpers/singularize'
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

	knex.QueryBuilder.extend 'get', do(columns)
		let results\object[] = await this

		if columns && Array.isArray(columns) && columns.length > 0
			let mappedResults = []
			for result in results
				const object = {}
				for column in columns
					object[column] = result[column]
				mappedResults.push(object)
			results = mappedResults

		if this._hidden && Array.isArray(this._hidden) && this._hidden.length > 0
			for result in results
				for column in this._hidden
					delete result[column]

		if this._relationships && Array.isArray(this._relationships) && this._relationships.length > 0
			results = await this._loadRelationships(results)

		results

	knex.QueryBuilder.extend 'autoPaginate', do(pageSize = 20)
		const locationContext = await location!

		let page = 1
		let query = {}
		let url = ''

		if locationContext
			const search = querystring.parse(locationContext.search.replace(/^\?/, ''))

			page = search.page || 1
			query = search
			url = locationContext.origin + locationContext.pathname

		return this.pagination({ page, query, url, pageSize })

	knex.QueryBuilder.extend 'pagination', do({page = 1, pageSize = 20, query = {}, url = ''})
		page = parseInt(page)

		if !isString(url)
			throw new TypeError('url must be a string')

		if isNaN(page)
			page = 1

		if page < 1
			page = 1

		if pageSize < 1
			pageSize = 20

		def getPagesArray currentPage, totalPages
			const maxPagesToShow = 5
			const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2)

			let startPage = Math.max(1, currentPage - halfMaxPagesToShow)
			let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1)

			if endPage < totalPages
				startPage = Math.max(1, currentPage - halfMaxPagesToShow)
			else
				startPage = Math.max(1, totalPages - maxPagesToShow + 1)

			endPage = Math.min(startPage + maxPagesToShow - 1, totalPages)

			Array.from({ length: endPage - startPage + 1 }, do(_, i) startPage + i)

		const countQuery = this.clone!.clearSelect!.count('* as total')

		return Promise.all([this.clone!.limit(pageSize).offset((page - 1) * pageSize), countQuery])
			.then do([data, [{ total }]])
				const totalPages = Math.ceil(total / pageSize)
				const pages = getPagesArray(page, totalPages)
				const prevPage = page > 1 ? page - 1 : null
				const nextPage = page < totalPages ? page + 1 : null
				const firstPage = 1
				const lastPage = totalPages

				if this._hidden && Array.isArray(this._hidden) && this._hidden.length > 0
					for result in data
						for column in this._hidden
							delete result[column]

				if this._relationships && Array.isArray(this._relationships) && this._relationships.length > 0
					data = await this._loadRelationships(data)

				const results = {
					data,
					pagination: {
						total,
						pageSize,
						currentPage: page,
						totalPages,
						pages,
						firstPage,
						lastPage,
						prevPage,
						nextPage,
					}
				}

				if query
					const links = {}

					url = url.length > 1 ? url.replace(/\/+$/, '') + '/' : ''

					params = []
					keys = Object.keys(query)
					for key in keys
						params.push(key + '=' + encodeURIComponent(key == 'page' ? (results.pagination.firstPage) : query[key]))
					links.firstPage = {
						label: 'First',
						active: results.pagination.firstPage === results.pagination.currentPage,
						url: url + '?' + params.join('&')
					}

					params = []
					keys = Object.keys(query)
					for key in keys
						params.push(key + '=' + encodeURIComponent(key == 'page' ? (results.pagination.prevPage) : query[key]))
					links.prevPage = results.pagination.prevPage ? {
						label: 'Previous',
						active: results.pagination.prevPage === results.pagination.currentPage,
						url: url + '?' + params.join('&')
					} : null

					for page in pages
						query.page = page
						params = []
						keys = Object.keys(query)
						for key in keys
							params.push(key + '=' + encodeURIComponent(query[key]))
						links[page] = {
							label: page,
							active: page === results.pagination.currentPage,
							url: url + '?' + params.join('&')
						}

					params = []
					keys = Object.keys(query)
					for key in keys
						params.push(key + '=' + encodeURIComponent(key == 'page' ? (results.pagination.nextPage) : query[key]))
					links.nextPage = results.pagination.nextPage ? {
						label: 'Next',
						active: results.pagination.nextPage === results.pagination.currentPage,
						url: url + '?' + params.join('&')
					} : null

					params = []
					keys = Object.keys(query)
					for key in keys
						params.push(key + '=' + encodeURIComponent(key == 'page' ? (results.pagination.lastPage) : query[key]))
					links.lastPage = {
						label: 'Last',
						active: results.pagination.lastPage === results.pagination.currentPage,
						url: url + '?' + params.join('&')
					}

					results.pagination.links = links

				return results

	knex.QueryBuilder.extend 'hidden', do(columns)
		this._hidden = columns

		return this

	knex.QueryBuilder.extend 'belongsTo', do(relatedTable, queryCallback, foreignKey, localKey)
		this._relationships = this._relationships || []

		let tableName = relatedTable
		if typeof relatedTable == 'function' && relatedTable.prototype && relatedTable.prototype.tableName
			tableName = new relatedTable().tableName

		if typeof queryCallback == 'function'
			this._relationships.push({
				type: 'belongsTo',
				relatedTable: tableName,
				queryCallback: queryCallback,
				foreignKey: foreignKey || singularize(tableName) + '_id',
				localKey: localKey || 'id'
			})
		else if typeof queryCallback == 'string'
			this._relationships.push({
				type: 'belongsTo',
				relatedTable: tableName,
				queryCallback: null,
				foreignKey: queryCallback,
				localKey: foreignKey || 'id'
			})
		else
			this._relationships.push({
				type: 'belongsTo',
				relatedTable: tableName,
				queryCallback: null,
				foreignKey: singularize(tableName) + '_id',
				localKey: 'id'
			})

		return this

	knex.QueryBuilder.extend 'hasOne', do(relatedTable, queryCallback, foreignKey, localKey)
		this._relationships = this._relationships || []

		let tableName = relatedTable
		if typeof relatedTable == 'function' && relatedTable.prototype && relatedTable.prototype.tableName
			tableName = new relatedTable().tableName

		if typeof queryCallback == 'function'
			this._relationships.push({
				type: 'hasOne',
				relatedTable: tableName,
				queryCallback: queryCallback,
				foreignKey: foreignKey || singularize(this._single.table) + '_id',
				localKey: localKey || 'id'
			})
		else if typeof queryCallback == 'string'
			this._relationships.push({
				type: 'hasOne',
				relatedTable: tableName,
				queryCallback: null,
				foreignKey: queryCallback,
				localKey: foreignKey || 'id'
			})
		else
			this._relationships.push({
				type: 'hasOne',
				relatedTable: tableName,
				queryCallback: null,
				foreignKey: singularize(this._single.table) + '_id',
				localKey: 'id'
			})

		return this

	knex.QueryBuilder.extend 'hasMany', do(relatedTable, queryCallback, foreignKey, localKey)
		this._relationships = this._relationships || []

		let tableName = relatedTable
		if typeof relatedTable == 'function' && relatedTable.prototype && relatedTable.prototype.tableName
			tableName = new relatedTable().tableName

		if typeof queryCallback == 'function'
			this._relationships.push({
				type: 'hasMany',
				relatedTable: tableName,
				queryCallback: queryCallback,
				foreignKey: foreignKey || singularize(this._single.table) + '_id',
				localKey: localKey || 'id'
			})
		else if typeof queryCallback == 'string'
			this._relationships.push({
				type: 'hasMany',
				relatedTable: tableName,
				queryCallback: null,
				foreignKey: queryCallback,
				localKey: foreignKey || 'id'
			})
		else
			this._relationships.push({
				type: 'hasMany',
				relatedTable: tableName,
				queryCallback: null,
				foreignKey: singularize(this._single.table) + '_id',
				localKey: 'id'
			})

		return this

	knex.QueryBuilder.extend 'belongsToMany', do(relatedTable, queryCallback, pivotTable, foreignKey, relatedKey, localKey, relatedLocalKey)
		this._relationships = this._relationships || []

		let tableName = relatedTable
		if typeof relatedTable == 'function' && relatedTable.prototype && relatedTable.prototype.tableName
			tableName = new relatedTable().tableName

		if typeof queryCallback == 'function'
			this._relationships.push({
				type: 'belongsToMany',
				relatedTable: tableName,
				queryCallback: queryCallback,
				pivotTable: pivotTable || singularize(this._single.table) + '_' + tableName,
				foreignKey: foreignKey || singularize(this._single.table) + '_id',
				relatedKey: relatedKey || singularize(tableName) + '_id',
				localKey: localKey || 'id',
				relatedLocalKey: relatedLocalKey || 'id'
			})
		else if typeof queryCallback == 'string'
			this._relationships.push({
				type: 'belongsToMany',
				relatedTable: tableName,
				queryCallback: null,
				pivotTable: queryCallback,
				foreignKey: foreignKey || singularize(this._single.table) + '_id',
				relatedKey: relatedKey || singularize(tableName) + '_id',
				localKey: localKey || 'id',
				relatedLocalKey: relatedLocalKey || 'id'
			})
		else
			this._relationships.push({
				type: 'belongsToMany',
				relatedTable: tableName,
				queryCallback: null,
				pivotTable: singularize(this._single.table) + '_' + tableName,
				foreignKey: singularize(this._single.table) + '_id',
				relatedKey: singularize(tableName) + '_id',
				localKey: 'id',
				relatedLocalKey: 'id'
			})

		return this

	knex.QueryBuilder.extend '_loadRelationships', do(results)
		if !results || results.length == 0
			return results

		for relationship in this._relationships
			let relationshipName = relationship.relatedTable
			if relationship.type == 'belongsTo' || relationship.type == 'hasOne'
				relationshipName = singularize(relationship.relatedTable)

			if relationship.type == 'belongsTo'
				await this._loadBelongsTo(results, relationship, relationshipName)
			else if relationship.type == 'hasOne'
				await this._loadHasOne(results, relationship, relationshipName)
			else if relationship.type == 'hasMany'
				await this._loadHasMany(results, relationship, relationshipName)
			else if relationship.type == 'belongsToMany'
				await this._loadBelongsToMany(results, relationship, relationshipName)

		results

	knex.QueryBuilder.extend '_loadBelongsTo', do(results, relationship, relationshipName)
		const hasForeignKey = results.length > 0 && results[0].hasOwnProperty(relationship.foreignKey)

		if !hasForeignKey
			const ids = results.map(do(result) result.id).filter(do(id) id != null)

			if ids.length == 0
				for result in results
					result[relationshipName] = null
				return

			const foreignKeyResults = await Database(this._single.table)
				.select('id', relationship.foreignKey)
				.whereIn('id', ids)

			const foreignKeyMap = {}
			for row in foreignKeyResults
				foreignKeyMap[row.id] = row[relationship.foreignKey]

			for result in results
				result[relationship.foreignKey] = foreignKeyMap[result.id]

		const foreignKeys = results.map(do(result) result[relationship.foreignKey]).filter(do(key) key != null)

		if foreignKeys.length == 0
			for result in results
				result[relationshipName] = null
			return

		let relatedQuery = Database(relationship.relatedTable).whereIn(relationship.localKey, foreignKeys)

		if relationship.queryCallback
			relatedQuery = relationship.queryCallback(relatedQuery)

		const relatedResults = await relatedQuery
		const relatedMap = {}

		for related in relatedResults
			relatedMap[related[relationship.localKey]] = related

		for result in results
			result[relationshipName] = relatedMap[result[relationship.foreignKey]] || null

	knex.QueryBuilder.extend '_loadHasOne', do(results, relationship, relationshipName)
		const localKeys = results.map(do(result) result[relationship.localKey]).filter(do(key) key != null)

		if localKeys.length == 0
			for result in results
				result[relationshipName] = null
			return

		let relatedQuery = Database(relationship.relatedTable).whereIn(relationship.foreignKey, localKeys)

		if relationship.queryCallback
			relatedQuery = relationship.queryCallback(relatedQuery)

		const relatedResults = await relatedQuery
		const relatedMap = {}

		for related in relatedResults
			relatedMap[related[relationship.foreignKey]] = related

		for result in results
			result[relationshipName] = relatedMap[result[relationship.localKey]] || null

	knex.QueryBuilder.extend '_loadHasMany', do(results, relationship, relationshipName)
		const localKeys = results.map(do(result) result[relationship.localKey]).filter(do(key) key != null)

		if localKeys.length == 0
			for result in results
				result[relationshipName] = []
			return

		let relatedQuery = Database(relationship.relatedTable).whereIn(relationship.foreignKey, localKeys)

		if relationship.queryCallback
			relatedQuery = relationship.queryCallback(relatedQuery)

		const relatedResults = await relatedQuery
		const relatedMap = {}

		for related in relatedResults
			const key = related[relationship.foreignKey]
			if !relatedMap[key]
				relatedMap[key] = []
			relatedMap[key].push(related)

		for result in results
			result[relationshipName] = relatedMap[result[relationship.localKey]] || []

	knex.QueryBuilder.extend '_loadBelongsToMany', do(results, relationship, relationshipName)
		const localKeys = results.map(do(result) result[relationship.localKey]).filter(do(key) key != null)

		if localKeys.length == 0
			for result in results
				result[relationshipName] = []
			return

		const pivotQuery = Database(relationship.pivotTable)
			.whereIn(relationship.foreignKey, localKeys)
			.select(relationship.foreignKey, relationship.relatedKey)

		const pivotResults = await pivotQuery
		const pivotMap = {}

		for pivot in pivotResults
			const key = pivot[relationship.foreignKey]
			if !pivotMap[key]
				pivotMap[key] = []
			pivotMap[key].push(pivot[relationship.relatedKey])

		const allRelatedIds = [...new Set(pivotResults.map(do(pivot) pivot[relationship.relatedKey]))]

		if allRelatedIds.length == 0
			for result in results
				result[relationshipName] = []
			return

		let relatedQuery = Database(relationship.relatedTable).whereIn(relationship.relatedLocalKey, allRelatedIds)

		if relationship.queryCallback
			relatedQuery = relationship.queryCallback(relatedQuery)

		const relatedResults = await relatedQuery
		const relatedMap = {}

		for related in relatedResults
			relatedMap[related[relationship.relatedLocalKey]] = related

		for result in results
			const relatedIds = pivotMap[result[relationship.localKey]] || []
			result[relationshipName] = relatedIds.map(do(id) relatedMap[id]).filter(do(item) item != null)

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
