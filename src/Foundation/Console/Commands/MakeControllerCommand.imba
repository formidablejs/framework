import { Prop } from '@formidablejs/console'
import { MakeResourceCommand } from './MakeResourceCommand'
import Controller from '@formidablejs/stubs/src/stubs/controller/controller'

export class MakeControllerCommand < MakeResourceCommand

	get signature
		'make:controller {name}'

	get props
		{
			name: Prop.string!.description('The name of the class')
		}

	get description
		'Create a new controller class'

	get resource
		'Controller'

	get stub
		new Controller(self.argument('name'), {}, 'controller', self.language.toLowerCase!)
