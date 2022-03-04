import { Prop } from '@formidablejs/console'
import { MakeResourceCommand } from './MakeResourceCommand'
import Config from '@formidablejs/stubs/src/stubs/config/config'

export class MakeConfigCommand < MakeResourceCommand

	get signature
		'make:config {name}'

	get props
		{
			name: Prop.string!.description('The name of the file')
		}
	
	get description
		'Create a new config file'

	get resource
		'Config'
	
	get stub
		new Config(self.argument('name'), {}, 'config')
