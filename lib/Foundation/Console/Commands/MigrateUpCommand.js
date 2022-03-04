Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('@formidablejs/console'/*$path$*/);
var $2 = require('./MigrationCommand'/*$path$*/);

class MigrateUpCommand extends $2.MigrationCommand {
	
	
	get signature(){
		
		return 'migrate:up {?migration}';
	}
	
	get props(){
		
		return {
			migration: $1.Prop.string().nullable().description('Migration file to run')
		};
	}
	
	get description(){
		
		return 'Run migration(s)';
	}
	
	handle(){
		
		return this.call('up');
	}
};
exports.MigrateUpCommand = MigrateUpCommand;
