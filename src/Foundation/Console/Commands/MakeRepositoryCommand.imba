import { Prop } from '@formidablejs/console'
import { MakeResourceCommand } from './MakeResourceCommand'
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
		}, 'repository', self.language.toLowerCase!)
