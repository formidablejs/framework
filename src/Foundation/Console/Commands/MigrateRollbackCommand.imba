import { Prop } from '@formidablejs/console'
import { MigrationCommand } from './MigrationCommand'

export class MigrateRollbackCommand < MigrationCommand

	get signature
		'migrate:rollback {?--all}'

	get props
		{
			all: Prop.boolean!.default(false).description 'Rollback all migrations'
		}
	
	get description
		'Rollback the last or all database migrations'
	
	def handle
		call 'rollback'
