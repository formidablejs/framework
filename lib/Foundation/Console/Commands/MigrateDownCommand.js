Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$consoleφ = require('@formidablejs/console'/*$path$*/);
var _$MigrationCommandφ = require('./MigrationCommand'/*$path$*/);

class MigrateDownCommand extends _$MigrationCommandφ.MigrationCommand {
	
	
	get signature(){
		
		return 'migrate:down {?migration} {?--no-interaction}';
	}
	
	get props(){
		
		return {
			migration: _$consoleφ.Prop.string().description('Migration file to run'),
			'no-interaction': _$consoleφ.Prop.boolean().default(false).description('Do not ask any interactive question')
		};
	}
	
	get description(){
		
		return 'Reverse migration(s)';
	}
	
	handle(){
		
		return this.run('down');
	}
};
exports.MigrateDownCommand = MigrateDownCommand;
