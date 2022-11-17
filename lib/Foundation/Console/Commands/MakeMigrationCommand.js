function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('@formidablejs/console'/*$path$*/);
var $2 = require('./MakeResourceCommand'/*$path$*/);
var $3 = requireDefault$__(require('@formidablejs/stubs/src/stubs/migration/migration'/*$path$*/));

class MakeMigrationCommand extends $2.MakeResourceCommand {
	
	
	get signature(){
		
		return 'make:migration {name} {--table} {?--alter} {?--schema}';
	}
	
	get props(){
		
		return {
			name: $1.Prop.string().description('The name of the migration'),
			table: $1.Prop.string().description('The table to migrate'),
			alter: $1.Prop.boolean().description('Alter existing table'),
			schema: $1.Prop.string().alias('s').description('Set database schema').nullable()
		};
	}
	
	get description(){
		
		return 'Create a new migration class';
	}
	
	get resource(){
		
		return 'Migration';
	}
	
	get stub(){
		
		return new $3.default(
			this.argument('name'),
			{
				table: this.option('table'),
				alter: this.option('alter',false),
				schema: this.option('schema',null)
			},
			'migration',
			this.language.toLowerCase()
		);
	}
};
exports.MakeMigrationCommand = MakeMigrationCommand;
