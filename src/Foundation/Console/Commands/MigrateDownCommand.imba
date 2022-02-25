import { Prop } from '@formidablejs/console'
import { MigrationCommand } from './MigrationCommand'

export class MigrateDownCommand < MigrationCommand

	get signature
		'migrate:down {?migration} {?--no-interaction}'

	get props
		{
			migration: Prop.string!.description 'Migration file to run'
			'no-interaction': Prop.boolean!.default(false).description 'Do not ask any interactive question'
		}
	
	get description
		'Reverse migration(s)'

	def handle
		run 'down'
