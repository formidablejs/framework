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
		let path = self.argument('name').split('/')

		path.pop()

		const name = pluralize(self.argument('name').split('/').pop())
		const namespace = path.length > 0 ? "{path.join('/')}/" : ''
		const storeRequest = "{namespace}Store{self.argument('name').split('/').pop()}Request"
		const updateRequest = "{namespace}Update{self.argument('name').split('/').pop()}Request"

		const tableName = "Create{name}Table"
		const controllerName = "{self.argument('name')}Controller"

		await self.app.console!.run("make:controller {controllerName} --store-request={storeRequest} --update-request={updateRequest} {self.option('--api') ? '--api' : '-r'}")
		await self.app.console!.run("make:migration {tableName} --table={name.toLowerCase!}")
		await self.app.console!.run("make:request {storeRequest}")
		await self.app.console!.run("make:request {updateRequest}")
		await self.app.console!.run("make:seeder {name} --table={name.toLowerCase!}")

		self.exit()
