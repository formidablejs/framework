Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$consoleφ = require('@formidablejs/console'/*$path$*/);
var _$MigrationCommandφ = require('./MigrationCommand'/*$path$*/);

class MigrateRollbackCommand extends _$MigrationCommandφ.MigrationCommand {
	
	
	get signature(){
		
		return 'migrate:rollback {?--all} {?--no-interaction}';
	}
	
	get props(){
		
		return {
			all: _$consoleφ.Prop.boolean().default(true).description('Rollback all migrations'),
			'no-interaction': _$consoleφ.Prop.boolean().default(false).description('Do not ask any interactive question')
		};
	}
	
	handle(){
		
		return this.run('rollback');
	}
};
exports.MigrateRollbackCommand = MigrateRollbackCommand;
