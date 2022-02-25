function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$consoleφ = require('@formidablejs/console'/*$path$*/);
var _$MakeResourceCommandφ = require('./MakeResourceCommand'/*$path$*/);
var _$seederφ = requireDefault$__(require('@formidablejs/stubs/src/stubs/seeder/seeder'/*$path$*/));

class MakeSeederCommand extends _$MakeResourceCommandφ.MakeResourceCommand {
	
	
	get signature(){
		
		return 'make:seeder {name} {--table}';
	}
	
	get props(){
		
		return {
			name: _$consoleφ.Prop.string().description('The name of the class'),
			table: _$consoleφ.Prop.string().description('The table to seed to')
		};
	}
	
	get description(){
		
		return 'Create a new seeder file';
	}
	
	get resource(){
		
		return 'Seeder';
	}
	
	get stub(){
		
		return new _$seederφ.default(this.argument('name'),{table: this.option('table')},'seeder');
	}
};
exports.MakeSeederCommand = MakeSeederCommand;
