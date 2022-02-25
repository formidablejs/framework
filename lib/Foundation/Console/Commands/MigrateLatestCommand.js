Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$consoleφ = require('@formidablejs/console'/*$path$*/);
var _$MigrationCommandφ = require('./MigrationCommand'/*$path$*/);

class MigrateLatestCommand extends _$MigrationCommandφ.MigrationCommand {
	
	
	get signature(){
		
		return 'migrate:latest';
	}
	
	get description(){
		
		return 'Run latest migrations';
	}
	
	handle(){
		
		return this.run('latest');
	}
};
exports.MigrateLatestCommand = MigrateLatestCommand;
