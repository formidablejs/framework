import { Prop } from '@formidablejs/console'
import { MakeResourceCommand } from './MakeResourceCommand'
import Controller from '@formidablejs/stubs/src/stubs/controller/controller'

export class MakeControllerCommand < MakeResourceCommand

	get signature
		'make:controller {name} {--api} {--invokable} {--resource} {--store-request} {--update-request} {?--domain}'

	get props
		{
			name: Prop.string!.description('The name of the class')
			api: Prop.boolean!.description('Exclude the create and edit methods from the controller').nullable!
			invokable: Prop.boolean!.description('Generate a single method, invokable controller class').alias('i').nullable!
			resource: Prop.boolean!.description('Generate a resource controller class').alias('r').nullable!
			"store-request": Prop.string!.nullable().description('Store Request class')
			"update-request": Prop.string!.nullable().description('Update Request class')
			domain: Prop.string!.nullable!.description('Domain name')
		}

	get description
		'Create a new controller class'

	get resource
		'Controller'

	get stub
		new Controller(self.argument('name'), {
			api: self.option('api') ?? false
			invokable: self.option('invokable') ?? false
			resource: self.option('resource') ?? false
			"store-request": self.option('store-request') ?? 'null'
			"update-request": self.option('update-request') ?? 'null'
			domain: self.option('domain', null)
		}, 'controller', self.language.toLowerCase!)
