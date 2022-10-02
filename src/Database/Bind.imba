import isEmpty from '../Support/Helpers/isEmpty'
import Database from './Database'
import type Request from '../Http/Request/Request'

export default class Bind
	prop table\string
	prop first\boolean

	def constructor table\string, first\boolean = false
		self.table = table
		self.first = first

	def handle request\Request, key\number
		const param  = Object.keys(request.request.params)[key]

		const value  = Object.values(request.request.params)[key]
		const column = param.split(':')[1] ?? 'id'

		const query = Database.table(table).where(column, value)

		first ? query.first! : query
