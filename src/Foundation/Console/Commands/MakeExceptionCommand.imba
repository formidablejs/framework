import { Prop } from '@formidablejs/console'
import { MakeResourceCommand } from './MakeResourceCommand'
import Exception from '@formidablejs/stubs/src/stubs/exception/exception'

export class MakeExceptionCommand < MakeResourceCommand

	get signature
		'make:exception {name} {?--domain}'

	get props
		{
			name: Prop.string!.description('The name of the class')
			domain: Prop.string!.nullable!.description('Domain name')
		}

	get description
		'Create a new exception class'

	get resource
		'Exception'

	get stub
		new Exception(self.argument('name'), {
			domain: self.option('domain', null)
		}, 'exception', self.language.toLowerCase!)
