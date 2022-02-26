Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$consoleφ = require('@formidablejs/console'/*$path$*/);
var _$MigrationCommandφ = require('./MigrationCommand'/*$path$*/);

class MigrateDownCommand extends _$MigrationCommandφ.MigrationCommand {
	
	
	get signature(){
		
		return 'migrate:down {?migration}';
	}
	
	get props(){
		
		return {
			migration: _$consoleφ.Prop.string().nullable().description('Migration file to run')
		};
	}
	
	get description(){
		
		return 'Reverse migration(s)';
	}
	
	handle(){
		
		return this.call('down');
	}
};
exports.MigrateDownCommand = MigrateDownCommand;
