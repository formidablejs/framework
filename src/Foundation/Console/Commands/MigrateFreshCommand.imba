import { Prop } from '@formidablejs/console'
import { MigrationCommand } from './MigrationCommand'

export class MigrateFreshCommand < MigrationCommand

	get signature
		'migrate:fresh {?--no-interaction}'

	get props
		{
			'no-interaction': Prop.boolean!.default(false).description 'Do not ask any interactive question'
		}
	
	def handle
		run 'fresh'
