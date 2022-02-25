import { Prop } from '@formidablejs/console'
import { MigrationCommand } from './MigrationCommand'

export class MigrateUpCommand < MigrationCommand

	get signature
		'migrate:up {?migration}'

	get props
		{
			migration: Prop.string!.nullable!.description 'Migration file to run'
		}
	
	get description
		'Run migration(s)'
	
	def handle
		run 'up'
