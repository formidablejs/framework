import { Prop } from '@formidablejs/console'
import { MigrationCommand } from './MigrationCommand'

export class MigrateUpCommand < MigrationCommand

	get signature
		'migrate:up {?--no-interaction}'

	get props
		{
			'no-interaction': Prop.boolean!.default(false).description 'Do not ask any interactive question'
		}
	
	def handle
		run 'up'
