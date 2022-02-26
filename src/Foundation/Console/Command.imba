import inquirer from 'inquirer'
import { Command as BaseCommand } from '@formidablejs/console'
import type Application from '../Application'

export class Command < BaseCommand

	# @returns {Application}
	get app
		self.constructor.ctx

	def env default\String
		app.config.get('app.env', default)

	def usingEnv
		self.write "Using environment: <fg:green>{env('development')}</fg:green>"

	def confirm message\String
		const results = await inquirer.prompt([{
			name: 'run'
			message: message
			type: 'confirm'
		}])

		results.run
