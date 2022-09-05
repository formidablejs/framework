import { Prop } from '@formidablejs/console'
import { MigrationCommand } from './MigrationCommand'

export class MigrateFreshCommand < MigrationCommand

	get signature
		'migrate:fresh'

	get description
		'Drop all tables and re-run all migrations'

	def handle
		call 'fresh'
