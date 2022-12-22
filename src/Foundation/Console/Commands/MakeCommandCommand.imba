import { Prop } from '@formidablejs/console'
import { MakeResourceCommand } from './MakeResourceCommand'
import Command from '@formidablejs/stubs/src/stubs/command/command'

export class MakeCommandCommand < MakeResourceCommand

	get signature
		'make:command {name} {?--domain}'

	get props
		{
			name: Prop.string!.description('The name of the class')
			domain: Prop.string!.nullable!.description('Domain name')
		}

	get description
		'Create a new command class'

	get resource
		'Command'

	get stub
		new Command(self.argument('name'), {
			domain: self.option('domain', null)
		}, 'command', self.language.toLowerCase!)
