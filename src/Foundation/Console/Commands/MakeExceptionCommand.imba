import { Prop } from '@formidablejs/console'
import { MakeResourceCommand } from './MakeResourceCommand'
import Exception from '@formidablejs/stubs/src/stubs/exception/exception'

export class MakeExceptionCommand < MakeResourceCommand

	get signature
		'make:exception {name}'

	get props
		{
			name: Prop.string!.description('The name of the class')
		}

	get description
		'Create a new exception class'

	get resource
		'Exception'

	get stub
		new Exception(self.argument('name'), {}, 'exception', self.language.toLowerCase!)
