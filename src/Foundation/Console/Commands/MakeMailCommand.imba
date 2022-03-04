import { Prop } from '@formidablejs/console'
import { MakeResourceCommand } from './MakeResourceCommand'
import Mail from '@formidablejs/stubs/src/stubs/mail/mail'

export class MakeMailCommand < MakeResourceCommand

	get signature
		'make:mail {name}'

	get props
		{
			name: Prop.string!.description('The name of the class')
		}
	
	get description
		'Create a new email class'

	get resource
		'Mail'
	
	get stub
		new Mail(self.argument('name'), {}, 'mail')
