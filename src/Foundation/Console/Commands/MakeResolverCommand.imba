import { Prop } from '@formidablejs/console'
import { MakeResourceCommand } from './MakeResourceCommand'
import Resolver from '@formidablejs/stubs/src/stubs/resolver/resolver'

export class MakeResolverCommand < MakeResourceCommand

	get signature
		'make:resolver {name}'

	get props
		{
			name: Prop.string!.description('The name of the class')
		}

	get description
		'Create a new resolver class'

	get resource
		'Resolver'

	get stub
		new Resolver(self.argument('name'), {}, 'resolver', self.language.toLowerCase!)
