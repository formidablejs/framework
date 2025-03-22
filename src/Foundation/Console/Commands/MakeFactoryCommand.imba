import { Prop } from '@formidablejs/console'
import { MakeResourceCommand } from './MakeResourceCommand'
import Factory from '@formidablejs/stubs/src/stubs/factory/factory'

export class MakeFactoryCommand < MakeResourceCommand

	get signature
		'make:factory {name}'

	get props
		{
			name: Prop.string!.description('The class of the factory')
		}

	get description
		'Create a new factory class'

	get resource
		'Factory'

	get stub
		new Factory(
			self.argument('name'),
			{},
			'factory',
			self.language.toLowerCase!
		)
