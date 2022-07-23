import { Prop } from '@formidablejs/console'
import { MakeResourceCommand } from './MakeResourceCommand'
import Request from '@formidablejs/stubs/src/stubs/request/request'

export class MakeRequestCommand < MakeResourceCommand

	get signature
		'make:request {name}'

	get props
		{
			name: Prop.string!.description('The name of the class')
		}

	get description
		'Create a new form request class'

	get resource
		'Request'

	get stub
		new Request(self.argument('name'), {}, 'request', self.language.toLowerCase!)
