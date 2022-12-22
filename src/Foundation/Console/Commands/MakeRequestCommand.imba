import { Prop } from '@formidablejs/console'
import { MakeResourceCommand } from './MakeResourceCommand'
import Request from '@formidablejs/stubs/src/stubs/request/request'

export class MakeRequestCommand < MakeResourceCommand

	get signature
		'make:request {name} {?--domain}'

	get props
		{
			name: Prop.string!.description('The name of the class')
			domain: Prop.string!.nullable!.description('Domain name')
		}

	get description
		'Create a new form request class'

	get resource
		'Request'

	get stub
		new Request(self.argument('name'), {
			domain: self.option('domain', null)
		}, 'request', self.language.toLowerCase!)
