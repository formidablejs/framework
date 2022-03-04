Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('@formidablejs/console'/*$path$*/);
var $2 = require('./MigrationCommand'/*$path$*/);

class MigrateRollbackCommand extends $2.MigrationCommand {
	
	
	get signature(){
		
		return 'migrate:rollback {?--all}';
	}
	
	get props(){
		
		return {
			all: $1.Prop.boolean().default(false).description('Rollback all migrations')
		};
	}
	
	get description(){
		
		return 'Rollback the last or all database migrations';
	}
	
	handle(){
		
		return this.call('rollback');
	}
};
exports.MigrateRollbackCommand = MigrateRollbackCommand;
