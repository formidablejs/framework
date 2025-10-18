import { Output } from '@formidablejs/console'
import { Command } from '../Command'
import { join } from 'path'
import { existsSync } from 'fs-extra'
import type Application from '../../Application'

export class MigrationCommand < Command

	get isTS?
		const appPackage = join(process.cwd!, 'package.json')

		if !existsSync(appPackage)
			return false

		const language = require(appPackage).language || 'imba'

		language.toLowerCase! == 'typescript'

	def call action\string, exitOnEnd\boolean = true
		await shouldRun!

		self.usingEnv!

		if isTS?
			require('ts-node').register({
				transpileOnly: true,
				compilerOptions: {
					module: 'commonjs',
					target: 'ESNext',
					moduleResolution: 'node',
					esModuleInterop: true,
				},
			})

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
			Output.group { newLine: false }, do
				for migration in results[1]
					self.message 'info', "<fg:green>{action === 'rollback' ? 'Rollback' : 'Migrate'}:</fg:green> {migration}"

			if exitOnEnd
				exit!

			return

		self.write "<fg:red>No migration to run</fg:red>"

		if exitOnEnd
			exit!
