import pluralize from 'pluralize'
import { Command } from '../Command'
import { Prop } from '@formidablejs/console'
import { MakeResourceCommand } from './MakeResourceCommand'

export class MakeCrudCommand < Command

	get signature
		'make:crud {name} {--api}'

	get props
		{
			name: Prop.string!.description('The name of the class')
			api: Prop.boolean!.description('Exclude the create and edit methods from the controller').nullable!
		}

	get description
		'Create a new Crud'

	def handle
		const name = pluralize(self.argument('name'))

		const tableName = "Create{name}Table"
		const controllerName = "{self.argument('name')}Controller"

		self.app.console!.run("make:controller {controllerName} {self.option('--api') ? '--api' : '-r'}")
		self.app.console!.run("make:migration {tableName} --table={name.toLowerCase!}")
		self.app.console!.run("make:request Store{self.argument('name')}Request")
		self.app.console!.run("make:request Update{self.argument('name')}Request")
		self.app.console!.run("make:seeder {name} --table={name}")
