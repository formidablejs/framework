import Database from './Database'
import pluralize from 'pluralize'

export default class Repository

	get tableName
		const className = this.constructor.name.split(/(?=[A-Z])/)

		if className.length > 0 && className[className.length - 1].toLowerCase() == 'repository'
			className.pop!

		pluralize(className.join('_').toLowerCase())

	get db
		Database

	get database
		Database

	get table
		Database.table(self.tableName)
