function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('@formidablejs/console'/*$path$*/);
var $2 = require('./MakeResourceCommand'/*$path$*/);
var $3 = requireDefault$__(require('@formidablejs/stubs/src/stubs/seeder/seeder'/*$path$*/));

class MakeSeederCommand extends $2.MakeResourceCommand {
	
	
	get signature(){
		
		return 'make:seeder {name} {--table}';
	}
	
	get props(){
		
		return {
			name: $1.Prop.string().description('The name of the class'),
			table: $1.Prop.string().description('The table to seed to')
		};
	}
	
	get description(){
		
		return 'Create a new seeder file';
	}
	
	get resource(){
		
		return 'Seeder';
	}
	
	get stub(){
		
		return new $3.default(this.argument('name'),{table: this.option('table')},'seeder');
	}
};
exports.MakeSeederCommand = MakeSeederCommand;
