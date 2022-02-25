import { Prop } from '@formidablejs/console'
import { MigrationCommand } from './MigrationCommand'

export class MigrateRollbackCommand < MigrationCommand

	get signature
		'migrate:rollback {?--all} {?--no-interaction}'

	get props
		{
			all: Prop.boolean!.default(true).description 'Rollback all migrations'
			'no-interaction': Prop.boolean!.default(false).description 'Do not ask any interactive question'
		}
	
	def handle
		run 'rollback'
