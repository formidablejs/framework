import { Prop } from '@formidablejs/console'
import { MakeResourceCommand } from './MakeResourceCommand'
import pluralize from 'pluralize'
import Repository from '@formidablejs/stubs/src/stubs/repository/repository'

export class MakeRepositoryCommand < MakeResourceCommand

	get signature
		'make:repository {name} {?--domain}'

	get props
		{
			name: Prop.string!.description('The name of the class')
			domain: Prop.string!.nullable!.description('Domain name')
		}

	get description
		'Create a new repository class'

	get resource
		'Repository'

	get stub
		new Repository(self.argument('name'), {
			domain: self.option('domain', null)
			table: self.tableName
		}, 'repository', self.language.toLowerCase!)

	get tableName
		const name = self.argument('name').split(/(?=[A-Z])/)

		if name.length > 0 && name[name.length - 1].toLowerCase() == 'repository'
			name.pop!

		pluralize(name.join('_').toLowerCase())
