import { Prop } from '@formidablejs/console'
import { MakeResourceCommand } from './MakeResourceCommand'
import Middleware from '@formidablejs/stubs/src/stubs/middleware/middleware'

export class MakeMiddlewareCommand < MakeResourceCommand

	get signature
		'make:middleware {name} {?--domain}'

	get props
		{
			name: Prop.string!.description('The name of the class')
			domain: Prop.string!.nullable!.description('Domain name')
		}

	get description
		'Create a new middleware class'

	get resource
		'Middleware'

	get stub
		new Middleware(self.argument('name'), {
			domain: self.option('domain', null)
		}, 'middleware', self.language.toLowerCase!)
