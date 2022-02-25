import { Prop } from '@formidablejs/console'
import { MigrationCommand } from './MigrationCommand'

export class MigrateLatestCommand < MigrationCommand

	get signature
		'migrate:latest'
	
	get description
		'Run latest migrations'
	
	def handle
		run 'latest'
