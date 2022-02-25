Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$consoleφ = require('@formidablejs/console'/*$path$*/);
var _$MigrationCommandφ = require('./MigrationCommand'/*$path$*/);

class MigrateFreshCommand extends _$MigrationCommandφ.MigrationCommand {
	
	
	get signature(){
		
		return 'migrate:fresh';
	}
	
	get description(){
		
		return 'Drop all tables and re-run all migrations';
	}
	
	handle(){
		
		return this.run('fresh');
	}
};
exports.MigrateFreshCommand = MigrateFreshCommand;
