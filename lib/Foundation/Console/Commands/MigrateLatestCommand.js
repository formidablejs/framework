Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('@formidablejs/console'/*$path$*/);
var $2 = require('./MigrationCommand'/*$path$*/);

class MigrateLatestCommand extends $2.MigrationCommand {
	
	
	get signature(){
		
		return 'migrate:latest';
	}
	
	get description(){
		
		return 'Run latest migrations';
	}
	
	handle(){
		
		return this.call('latest');
	}
};
exports.MigrateLatestCommand = MigrateLatestCommand;
