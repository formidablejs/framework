import { Prop } from '@formidablejs/console'
import { MakeResourceCommand } from './MakeResourceCommand'
import View from '@formidablejs/stubs/src/stubs/view/view'

export class MakeViewCommand < MakeResourceCommand

	get signature
		'make:view {name}'

	get props
		{
			name: Prop.string!.description('The name of the class')
		}

	get description
		'Create a new view class'

	get resource
		'View'

	get stub
		new View(self.argument('name'), { }, 'view')
