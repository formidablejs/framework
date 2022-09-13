import { Command } from '../Command'
import { join } from 'path'
import type Application from '../../Application'

export class MigrationCommand < Command

	def call action\String
		await shouldRun!

		self.usingEnv!

		let results

		if action === 'up' || action === 'down'
			results = await app.migration!.migrate(self.option('migration'), action === 'up' ? true : false)
		elif action === 'latest'
			results = await app.migration!.latest!
		elif action === 'rollback'
			results = await app.migration!.rollback self.option('all', false)
		elif action === 'fresh'
			results = await app.migration!.fresh!

		if results === false
			self.message 'error', 'Migration failed'

			self.exit!

			return

		if results[1].length > 0
			results[1].forEach do(migration) self.write "<fg:green>{action === 'rollback' ? 'Rollback' : 'Migrate'}:</fg:green> {migration}"

			exit!

			return

		self.write "<fg:red>No migration to run</fg:red>"

		exit!
