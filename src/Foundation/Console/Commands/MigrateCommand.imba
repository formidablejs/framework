import { Prop } from '@formidablejs/console'
import { MigrateUpCommand } from './MigrateUpCommand'

export class MigrateCommand < MigrateUpCommand

	get signature
		'migrate {?--migration}'
