import { AuthService as Auth } from '@formidablejs/framework'
import { ServiceResolver } from '@formidablejs/framework'

export class AppServiceResolver < ServiceResolver

	def boot
		self
