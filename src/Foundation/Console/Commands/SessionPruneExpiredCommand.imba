import Database from '../../../Database/Database'
import { Command } from '../Command'

export class SessionPruneExpiredCommand < Command

	get signature
		'session:prune-expired'

	get description
		'Prune expired sessions.'

	def handle
		const total = await Database.table('personal_access_tokens')
			.where('name', 'auth:session')
			.where('ttl', '<', (new Date!).valueOf!)
			.delete!

		if !isNaN(total)
			self.message('info', 'Successfully pruned expired sessions')

			return exit!

		self.message('error', 'An error occured while trying to prune expired sessions')

