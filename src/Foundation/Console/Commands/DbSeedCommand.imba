import { Prop, Output } from '@formidablejs/console'
import { isArray } from '../../../Support/Helpers'
import { Command } from '../Command'
import { join } from 'path'
import { existsSync } from 'fs-extra'

export class DbSeedCommand < Command

	get isTS
		const appPackage = join(process.cwd!, 'package.json')

		if !existsSync(appPackage)
			return false

		const language = require(appPackage).language || 'imba'

		language.toLowerCase! == 'typescript'

	get signature
		'db:seed {?--seeder}'

	get props
		{
			seeder: Prop.string!.default("DatabaseSeeder.{isTS ? 'ts' : 'js'}").description('The specific seeder to run. If not provided, all seeders will be run')
		}

	get description
		'Seed the database with records'

	def defaultSeeder seeder\string
		const seederDirectory = join(process.cwd!, app.config.get('database.seeders', 'database/seeders'))
		const seederFile = join(seederDirectory, seeder)

		if existsSync(seederFile)
			return seeder

		this.error "Seeder file {seeder} does not exist"

	def handle
		await self.shouldRun!

		self.usingEnv!

		if isTS
			require('ts-node').register({
				transpileOnly: true,
				compilerOptions: {
					module: 'commonjs',
					target: 'ESNext',
					moduleResolution: 'node',
					esModuleInterop: true,
				},
			})

		const results = await app.seeder!.run({
			specific: defaultSeeder(self.option('seeder'))
		})

		if results === false then return self.message 'error', 'Seeding failed'

		if isArray(results)
			const root = process.cwd!

			Output.group { newLine: false }, do
				results[0].forEach do(seeder)
					self.message 'info', "Seeder \x1b[1m[{seeder.substring(root.length)}]\x1b[0m ran successfully."

			exit!

		console.error results

		self.exit!
