import { Prop } from '@formidablejs/console'
import { MigrationCommand } from './MigrationCommand'

export class MigrateUpCommand < MigrationCommand

	get signature
		'migrate:up {?migration} {?--no-interaction}'

	get props
		{
			migration: Prop.string!.description 'Migration file to run'
			'no-interaction': Prop.boolean!.default(false).description 'Do not ask any interactive question'
		}
	
	get description
		'Run migration(s)'
	
	def handle
		run 'up'
