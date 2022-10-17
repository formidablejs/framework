import Database from './Database'
import pluralize from 'pluralize'

export default class Repository

	get table
		const className = this.constructor.name.split(/(?=[A-Z])/)

		if className.length > 0 && className[className.length - 1].toLowerCase() == 'repository'
			clsasName.pop!

		pluralize(className.join('_').toLowerCase())

	get database
		Database.table(self.table)

	get db
		Database.table(self.table)
