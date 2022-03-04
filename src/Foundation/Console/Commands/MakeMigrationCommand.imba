import { Prop } from '@formidablejs/console'
import { MakeResourceCommand } from './MakeResourceCommand'
import Migration from '@formidablejs/stubs/src/stubs/migration/migration'

export class MakeMigrationCommand < MakeResourceCommand

	get signature
		'make:migration {name} {--table} {?--alter}'

	get props
		{
			name: Prop.string!.description('The name of the migration')
			table: Prop.string!.description('The table to migrate')
			alter: Prop.boolean!.description('Alter existing table')
		}
	
	get description
		'Create a new migration class'

	get resource
		'Migration'
	
	get stub
		new Migration(
			self.argument('name'),
			{
				table: self.option('table')
				alter: self.option('alter', false)
			},
			'migration'
		)
