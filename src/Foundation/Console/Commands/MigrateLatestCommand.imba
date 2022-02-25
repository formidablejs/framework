import { Prop } from '@formidablejs/console'
import { MigrationCommand } from './MigrationCommand'

export class MigrateLatestCommand < MigrationCommand

	get signature
		'migrate:latest {?--no-interaction}'

	get props
		{
			'no-interaction': Prop.boolean!.default(false).description 'Do not ask any interactive question'
		}
	
	get description
		'Run latest migrations'
	
	def handle
		run 'latest'
