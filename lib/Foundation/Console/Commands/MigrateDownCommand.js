Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('@formidablejs/console'/*$path$*/);
var $2 = require('./MigrationCommand'/*$path$*/);

class MigrateDownCommand extends $2.MigrationCommand {
	
	
	get signature(){
		
		return 'migrate:down {?--migration}';
	}
	
	get props(){
		
		return {
			migration: $1.Prop.string().alias('m').nullable().description('Migration file to run')
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
