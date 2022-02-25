import { Command } from '@formidablejs/console'
import { join } from 'path'
import inquirer from 'inquirer'
import type Application from '../../Application'

export class MigrationCommand < Command
	
	# @returns {Application}
	get app
		self.constructor.ctx

	def shouldRun environment\String
		if !environment then return false
		
		self.write `<fg:green>**************************************
*     Application In Production!     *
**************************************</fg:green>`
		
		const res = await inquirer.prompt([{
			name: 'run'
			message: 'Do you really wish to run this command'
			type: 'confirm'
		}])

		if !res.run
			self.write "<fg:green>Command Canceled!</fg:green>"
		
		res.run

	def run action\String
		const environment = app.config.get('app.env', 'development')

		if environment.toLowerCase!.trim! === 'production' && (self.globalOptions ? self.globalOptions.noInteraction : false) !== true 
			const runCommand = await shouldRun(environment)

			if !runCommand then return

		self.write "<fg:green>Using environment: {environment}</fg:green>"

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
			results[1].forEach do(migration) self.write "<fg:green>{action === 'rollback' ? 'Rollback' : 'Migrate'}: {migration}</fg:green>"

			return
		
		self.write "<fg:red>No migration to run</fg:red>"
