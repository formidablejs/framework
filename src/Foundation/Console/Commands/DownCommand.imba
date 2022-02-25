import { MaintenanceCommand } from './MaintenanceCommand'
import { Prop } from '@formidablejs/console'

export class DownCommand < MaintenanceCommand

	get signature
		'down {--message} {?--retry} {?--refresh} {?--secret} {?--status} {?--redirect}'

	get props
		{
			message: Prop.string!.description 'The message for the maintenance mode'
			retry: Prop.number!.description 'The number of seconds after which the request may be retried'
			refresh: Prop.number!.description 'The number of seconds after which the browser may refresh'
			secret: Prop.string!.description 'The secret phrase that may be used to bypass maintenance mode'
			status: Prop.number!.default(503).description 'The status code that should be used when returning the maintenance mode response'
			redirect: Prop.string!.description 'The URL to which the browser should be redirected'
		}

	get description
		'Put the application into maintenance mode'

	def handle
		down!