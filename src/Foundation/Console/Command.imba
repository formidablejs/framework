import inquirer from 'inquirer'
import { Command as BaseCommand } from '@formidablejs/console'
import type Application from '../Application'

export class Command < BaseCommand

	# @returns {Application}
	get app
		self.constructor.ctx

	# @returns {String}
	def env default\String
		app.config.get('app.env', default)

	def usingEnv
		self.write "Using environment: <fg:green>{env('development')}</fg:green>"

	# @returns {Promise<Boolean>}
	def confirm message\String
		const results = await inquirer.prompt([{
			name: 'run'
			message: message
			type: 'confirm'
		}])

		results.run

	# @returns {Promise<boolean>}
	def shouldRun
		if env('development').toLowerCase!.trim! === 'production' && (self.globalOptions ? self.globalOptions.noInteraction : false) !== true
			self.info `**************************************
*     Application In Production!     *
**************************************`
			
			const confirmed = await self.confirm('Do you really wish to run this command')

			if !confirmed
				self.info "Command Canceled!"

				exit!

			confirmed

		else true

	def exit code\Number = 0
		process.exit code
