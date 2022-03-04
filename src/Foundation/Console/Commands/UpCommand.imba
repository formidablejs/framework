import { MaintenanceCommand } from './MaintenanceCommand'

export class UpCommand < MaintenanceCommand

	get signature
		'up'

	get description
		'Bring the application out of maintenance mode'

	def handle
		up!
