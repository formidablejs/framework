import { AuthService as Auth } from '@formidablejs/framework'
import { Route } from '@formidablejs/framework'
import { ServiceResolver } from '@formidablejs/framework'

export class RouterServiceResolver < ServiceResolver

	def boot
		Route.group { middleware: ['session'] }, do
			Auth.routes!

			require '../../routes/web'

		Route.group { middleware: ['jwt'], prefix: 'api' }, do
			require '../../routes/api'

		self
