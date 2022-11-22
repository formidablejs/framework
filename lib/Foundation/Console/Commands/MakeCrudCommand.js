function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('pluralize'/*$path$*/));
var $2 = require('../Command'/*$path$*/);
var $3 = require('@formidablejs/console'/*$path$*/);
var $4 = require('./MakeResourceCommand'/*$path$*/);

class MakeCrudCommand extends $2.Command {
	
	
	get signature(){
		
		return 'make:crud {name} {--api} {--type} {--repository} {?--schema}';
	}
	
	get props(){
		
		return {
			name: $3.Prop.string().description('The name of the class'),
			api: $3.Prop.boolean().description('Exclude the create and edit methods from the controller').nullable(),
			schema: $3.Prop.string().alias('s').description('Set database schema').nullable(),
			repository: $3.Prop.boolean().default(false).alias('r').description('Add a repository').nullable(),
			type: $3.Prop.boolean().default(false).alias('t').description('Add a type').nullable()
		};
	}
	
	get description(){
		
		return 'Create a new crud';
	}
	
	async handle(){
		
		let path = this.argument('name').split('/');
		
		path.pop();
		
		const name = $1.default(this.argument('name').split('/').pop());
		const namespace = (path.length > 0) ? (("" + path.join('/') + "/")) : '';
		const storeRequest = ("" + namespace + "Store" + this.argument('name').split('/').pop() + "Request");
		const updateRequest = ("" + namespace + "Update" + this.argument('name').split('/').pop() + "Request");
		
		const tableName = ("Create" + name + "Table");
		const controllerName = ("" + this.argument('name') + "Controller");
		const typeName = ("Database/" + this.argument('name'));
		
		await this.app.console().run(("make:controller " + controllerName + " --store-request=" + storeRequest + " --update-request=" + updateRequest + " " + (this.option('--api') ? '--api' : '-r')));
		await this.app.console().run(("make:migration " + tableName + " --table=" + name.toLowerCase() + " --schema=" + this.option('schema','')));
		await this.app.console().run(("make:request " + storeRequest));
		await this.app.console().run(("make:request " + updateRequest));
		await this.app.console().run(("make:seeder " + name + " --table=" + name.toLowerCase()));
		
		if (this.option('repository')) {
			
			await this.app.console().run(("make:repository " + this.argument('name') + "Repository"));
		};
		
		if (this.option('type')) {
			
			await this.app.console().run(("make:type " + typeName + " --schema=" + this.option('schema','')));
		};
		
		return this.exit();
	}
};
exports.MakeCrudCommand = MakeCrudCommand;
