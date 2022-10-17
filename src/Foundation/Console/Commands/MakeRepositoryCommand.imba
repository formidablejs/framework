import { Prop } from '@formidablejs/console'
import { MakeResourceCommand } from './MakeResourceCommand'
import Repository from '@formidablejs/stubs/src/stubs/repository/repository'

export class MakeRepositoryCommand < MakeResourceCommand

	get signature
		'make:repository {name}'

	get props
		{
			name: Prop.string!.description('The name of the class')
		}

	get description
		'Create a new repository class'

	get resource
		'Repository'

	get stub
		new Repository(self.argument('name'), {}, 'repository', self.language.toLowerCase!)
