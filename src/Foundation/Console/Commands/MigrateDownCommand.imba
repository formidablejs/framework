import { Prop } from '@formidablejs/console'
import { MigrationCommand } from './MigrationCommand'

export class MigrateDownCommand < MigrationCommand

	get signature
		'migrate:down {?--migration}'

	get props
		{
			migration: Prop.string!.alias('m').nullable!.description 'Migration file to run'
		}

	get description
		'Reverse migration(s)'

	def handle
		call 'down'
