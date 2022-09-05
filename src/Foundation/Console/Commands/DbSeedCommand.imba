import { isArray } from '../../../Support/Helpers'
import { Command } from '../Command'

export class DbSeedCommand < Command

	get signature
		'db:seed'

	get description
		'Seed the database with records'

	def handle
		await self.shouldRun!

		self.usingEnv!

		const results = await app.seeder!.run!

		if results === false then return self.message 'error', 'Seeding failed'

		if isArray(results)
			results[0].forEach do(seeder) self.write "<fg:green>Seeded:</fg:green> {seeder}"

			exit!

		console.error results

		self.exit!
