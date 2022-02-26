import { Command } from '../Command'
import { join } from 'path'
import inquirer from 'inquirer'
import type Application from '../../Application'

export class MigrationCommand < Command

	def shouldRun environment\String
		if !environment then return false
		
		self.info `**************************************
*     Application In Production!     *
**************************************`
		
		const res = await inquirer.prompt([{
			name: 'run'
			message: 'Do you really wish to run this command'
			type: 'confirm'
		}])

		if !res.run
			self.info "Command Canceled!"
		
		res.run

	def call action\String
		const environment = app.config.get('app.env', 'development')

		if environment.toLowerCase!.trim! === 'production' && (self.globalOptions ? self.globalOptions.noInteraction : false) !== true 
			const runCommand = await shouldRun(environment)

			if !runCommand then return

		self.info "Using environment: {environment}"

		let results

		if action === 'up' || action === 'down'
			results = await app.migration!.migrate self.option('migration', action === 'up' ? true : false)
		elif action === 'latest'
			results = await app.migration!.latest!
		elif action === 'rollback'
			results = await app.migration!.rollback self.option('all', false)
		elif action === 'fresh'
			results = await app.migration!.fresh(true)

		if results === false
			return self.error 'Migration failed'
		
		if results[1].length > 0
			results[1].forEach do(migration) self.info "{action === 'rollback' ? 'Rollback' : 'Migrate'}: {migration}"

			return
		
		self.write "<fg:red>No migration to run</fg:red>"
