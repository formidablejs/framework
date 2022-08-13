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
		
		return 'make:crud {name} {--api}';
	}
	
	get props(){
		
		return {
			name: $3.Prop.string().description('The name of the class'),
			api: $3.Prop.boolean().description('Exclude the create and edit methods from the controller').nullable()
		};
	}
	
	get description(){
		
		return 'Create a new Crud';
	}
	
	handle(){
		
		const name = $1.default(this.argument('name'));
		
		const tableName = ("Create" + name + "Table");
		const controllerName = ("" + this.argument('name') + "Controller");
		
		this.app.console().run(("make:controller " + controllerName + " " + (this.option('--api') ? '--api' : '-r')));
		this.app.console().run(("make:migration " + tableName + " --table=" + name.toLowerCase()));
		this.app.console().run(("make:request Store" + this.argument('name') + "Request"));
		this.app.console().run(("make:request Update" + this.argument('name') + "Request"));
		return this.app.console().run(("make:seeder " + name + " --table=" + name));
	}
};
exports.MakeCrudCommand = MakeCrudCommand;
