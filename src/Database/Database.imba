import type { Knex } from 'knex'
import { attachPaginate } from 'knex-paginate'
import querystring from 'querystring'
import location from '../Support/Helpers/location'
import isString from '../Support/Helpers/isString'
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
			return results.map do(result)
				const object = {}

				for column in columns
					object[column] = result[column]

				return object

		if this._hidden && Array.isArray(this._hidden) && this._hidden.length > 0
			for result in results
				for column in this._hidden
					delete result[column]

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

					links.firstPage = {
						label: 'First',
						active: results.pagination.firstPage === results.pagination.currentPage,
						url: url + '?' + Object.keys(query).map(do(key) key + '=' + encodeURIComponent(key == 'page' ? (results.pagination.firstPage) : query[key])).join('&')
					}

					links.prevPage = results.pagination.prevPage ? {
						label: 'Previous',
						active: results.pagination.prevPage === results.pagination.currentPage,
						url: url + '?' + Object.keys(query).map(do(key) key + '=' + encodeURIComponent(key == 'page' ? (results.pagination.prevPage) : query[key])).join('&')
					} : null

					for page in pages
						query.page = page

						links[page] = {
							label: page,
							active: page === results.pagination.currentPage,
							url: url + '?' + Object.keys(query).map(do(key) key + '=' + encodeURIComponent(query[key])).join('&')
						}

					links.nextPage = results.pagination.nextPage ? {
						label: 'Next',
						active: results.pagination.nextPage === results.pagination.currentPage,
						url: url + '?' + Object.keys(query).map(do(key) key + '=' + encodeURIComponent(key == 'page' ? (results.pagination.nextPage) : query[key])).join('&')
					} : null

					links.lastPage = {
						label: 'Last',
						active: results.pagination.lastPage === results.pagination.currentPage,
						url: url + '?' + Object.keys(query).map(do(key) key + '=' + encodeURIComponent(key == 'page' ? (results.pagination.lastPage) : query[key])).join('&')
					}

					results.pagination.links = links

				return results

	knex.QueryBuilder.extend 'hidden', do(columns)
		this._hidden = columns

		return this

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
