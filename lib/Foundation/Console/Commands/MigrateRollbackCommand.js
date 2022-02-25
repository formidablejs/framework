Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$consoleφ = require('@formidablejs/console'/*$path$*/);
var _$MigrationCommandφ = require('./MigrationCommand'/*$path$*/);

class MigrateRollbackCommand extends _$MigrationCommandφ.MigrationCommand {
	
	
	get signature(){
		
		return 'migrate:rollback {?--all}';
	}
	
	get props(){
		
		return {
			all: _$consoleφ.Prop.boolean().default(false).description('Rollback all migrations')
		};
	}
	
	get description(){
		
		return 'Rollback the last or all database migrations';
	}
	
	handle(){
		
		return this.run('rollback');
	}
};
exports.MigrateRollbackCommand = MigrateRollbackCommand;
