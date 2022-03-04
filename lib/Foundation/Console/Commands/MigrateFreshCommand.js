Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('@formidablejs/console'/*$path$*/);
var $2 = require('./MigrationCommand'/*$path$*/);

class MigrateFreshCommand extends $2.MigrationCommand {
	
	
	get signature(){
		
		return 'migrate:fresh';
	}
	
	get description(){
		
		return 'Drop all tables and re-run all migrations';
	}
	
	handle(){
		
		return this.call('fresh');
	}
};
exports.MigrateFreshCommand = MigrateFreshCommand;
