function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('@formidablejs/console'/*$path$*/);
var $2 = require('./MakeResourceCommand'/*$path$*/);
var $3 = requireDefault$__(require('@formidablejs/stubs/src/stubs/controller/controller'/*$path$*/));

class MakeControllerCommand extends $2.MakeResourceCommand {
	
	
	get signature(){
		
		return 'make:controller {name} {--api} {--invokable} {--resource}';
	}
	
	get props(){
		
		return {
			name: $1.Prop.string().description('The name of the class'),
			api: $1.Prop.boolean().description('Exclude the create and edit methods from the controller').nullable(),
			invokable: $1.Prop.boolean().description('Generate a single method, invokable controller class').alias('i').nullable(),
			resource: $1.Prop.boolean().description('Generate a resource controller class').alias('r').nullable()
		};
	}
	
	get description(){
		
		return 'Create a new controller class';
	}
	
	get resource(){
		
		return 'Controller';
	}
	
	get stub(){
		var $4, $5, $6;
		
		return new $3.default(this.argument('name'),{
			api: (($4 = this.option('api')) != null) ? ($4) : false,
			invokable: (($5 = this.option('invokable')) != null) ? ($5) : false,
			resource: (($6 = this.option('resource')) != null) ? ($6) : false
		},'controller',this.language.toLowerCase());
	}
};
exports.MakeControllerCommand = MakeControllerCommand;
