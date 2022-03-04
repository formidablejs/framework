import { Prop } from '@formidablejs/console'
import { MakeResourceCommand } from './MakeResourceCommand'
import Seeder from '@formidablejs/stubs/src/stubs/seeder/seeder'

export class MakeSeederCommand < MakeResourceCommand

	get signature
		'make:seeder {name} {--table}'

	get props
		{
			name: Prop.string!.description('The name of the class')
			table: Prop.string!.description('The table to seed to')
		}
	
	get description
		'Create a new seeder file'

	get resource
		'Seeder'
	
	get stub
		new Seeder(self.argument('name'), { table: self.option('table') }, 'seeder')
