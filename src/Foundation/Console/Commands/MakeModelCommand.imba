import { Prop } from '@formidablejs/console'
import { MakeResourceCommand } from './MakeResourceCommand'
import Model from '@formidablejs/stubs/src/stubs/model/model'

export class MakeModelCommand < MakeResourceCommand

	get signature
		'make:model {name}'

	get props
		{
			name: Prop.string!.description('The name of the class')
		}
	
	get description
		'Create a new model class'

	get resource
		'Model'
	
	get stub
		new Model(self.argument('name'), {}, 'model')
