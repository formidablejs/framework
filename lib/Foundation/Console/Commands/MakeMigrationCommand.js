function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$consoleφ = require('@formidablejs/console'/*$path$*/);
var _$MakeResourceCommandφ = require('./MakeResourceCommand'/*$path$*/);
var _$migrationφ = requireDefault$__(require('@formidablejs/stubs/src/stubs/migration/migration'/*$path$*/));

class MakeMigrationCommand extends _$MakeResourceCommandφ.MakeResourceCommand {
	
	
	get signature(){
		
		return 'make:migration {name} {--table} {?--alter}';
	}
	
	get props(){
		
		return {
			name: _$consoleφ.Prop.string().description('The name of the migration'),
			table: _$consoleφ.Prop.string().description('The table to migrate'),
			alter: _$consoleφ.Prop.boolean().description('Alter existing table')
		};
	}
	
	get description(){
		
		return 'Create a new migration class';
	}
	
	get resource(){
		
		return 'Migration';
	}
	
	get stub(){
		
		return new _$migrationφ.default(
			this.argument('name'),
			{
				table: this.option('table'),
				alter: this.option('alter',false)
			},
			'migration'
		);
	}
};
exports.MakeMigrationCommand = MakeMigrationCommand;
