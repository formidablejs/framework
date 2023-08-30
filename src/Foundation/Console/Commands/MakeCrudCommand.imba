import pluralize from 'pluralize'
import { Command } from '../Command'
import { Prop } from '@formidablejs/console'
import { MakeResourceCommand } from './MakeResourceCommand'

export class MakeCrudCommand < Command

	get signature
		'make:crud {name} {--api} {--type} {--repository} {?--schema} {?--domain}'

	get props
		{
			name: Prop.string!.description('The name of the class')
			api: Prop.boolean!.description('Exclude the create and edit methods from the controller').nullable!
			schema: Prop.string!.alias('s').description('Set database schema').nullable!
			repository: Prop.boolean!.default(false).alias('r').description('Add a repository').nullable!
			type: Prop.boolean!.default(false).alias('t').description('Add a type').nullable!
			domain: Prop.string!.nullable!.description('Domain name')
		}

	get description
		'Create a new crud'

	def handle
		let path = self.argument('name').split('/')

		path.pop()

		const name = pluralize(self.argument('name').split('/').pop())
		const namespace = path.length > 0 ? "{path.join('/')}/" : ''
		const storeRequest = "{namespace}Store{self.argument('name').split('/').pop()}Request"
		const updateRequest = "{namespace}Update{self.argument('name').split('/').pop()}Request"

		const tableName = "Create{name}Table"
		const controllerName = "{self.argument('name')}Controller"
		const typeName = "Database/{self.argument('name')}"
		const domain = self.option('domain', null) ? " --domain={self.option('domain')}" : ''

		process.env.CONSOLE_FORMIDABLE_GROUP = JSON.stringify({
			newLine: false
		})

		await self.app.console!.run("make:controller {controllerName} --store-request={storeRequest} --update-request={updateRequest} {self.option('--api') ? '--api' : '-r'}{domain}")
		await self.app.console!.run("make:migration {tableName} --table={name.toLowerCase!} --schema={self.option('schema', '')}")
		await self.app.console!.run("make:request {storeRequest}{domain}")
		await self.app.console!.run("make:request {updateRequest}{domain}")
		await self.app.console!.run("make:seeder {name} --table={name.toLowerCase!}")

		if self.option('repository')
			await self.app.console!.run("make:repository {self.argument('name')}Repository{domain}")

		if self.option('type')
			await self.app.console!.run("make:type {typeName} --schema={self.option('schema', '')}{domain}")

		console.log('')

		self.exit()
