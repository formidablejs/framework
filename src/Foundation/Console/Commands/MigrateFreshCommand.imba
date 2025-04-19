import { Prop, Output } from '@formidablejs/console'
import { MigrationCommand } from './MigrationCommand'
import { join } from 'path'
import { existsSync } from 'fs-extra'

export class MigrateFreshCommand < MigrationCommand

	get isTS
		const appPackage = join(process.cwd!, 'package.json')

		if !existsSync(appPackage)
			return false

		const language = require(appPackage).language || 'imba'

		language.toLowerCase! == 'typescript'

	get signature
		'migrate:fresh {?--seed} {?--seeder}'

	get description
		'Drop all tables and re-run all migrations'

	get props
		{
			seed: Prop.boolean!.default(false).description('Indicates if db:seed should run after migrations have been ran')
			seeder: Prop.string!.default("DatabaseSeeder.{isTS ? 'ts' : 'js'}").description('The specific seeder to run. If not provided, all seeders will be run')
		}

	def handle
		const shouldSeed? = this.option('seed')

		if shouldSeed?
			process.env.CONSOLE_FORMIDABLE_GROUP = JSON.stringify({
				newLine: false
			})

			await call 'fresh', false

			const seeder = this.option('seeder', 'DefaultSeeder')

			Output.write "Running <dim>db:seed --seeder={seeder}</dim>"

			await self.app.console!.run("db:seed --seeder={seeder}")

			self.exit!
		else
			call 'fresh'
