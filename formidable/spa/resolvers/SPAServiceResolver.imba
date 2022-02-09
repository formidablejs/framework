import { App } from '../../resources/views/app'
import { SPAServiceResolver as ServiceResolver } from '@formidablejs/framework'

export class SPAServiceResolver < ServiceResolver

	get view
		App

	get props
		{

		}

	get middleware
		[
			'session'
		]
