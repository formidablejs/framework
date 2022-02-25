Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$consoleφ = require('@formidablejs/console'/*$path$*/);
var _$MigrationCommandφ = require('./MigrationCommand'/*$path$*/);

class MigrateUpCommand extends _$MigrationCommandφ.MigrationCommand {
	
	
	get signature(){
		
		return 'migrate:up {?migration}';
	}
	
	get props(){
		
		return {
			migration: _$consoleφ.Prop.string().nullable().description('Migration file to run')
		};
	}
	
	get description(){
		
		return 'Run migration(s)';
	}
	
	handle(){
		
		return this.run('up');
	}
};
exports.MigrateUpCommand = MigrateUpCommand;
