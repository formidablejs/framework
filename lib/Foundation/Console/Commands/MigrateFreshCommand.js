Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$consoleφ = require('@formidablejs/console'/*$path$*/);
var _$MigrationCommandφ = require('./MigrationCommand'/*$path$*/);

class MigrateFreshCommand extends _$MigrationCommandφ.MigrationCommand {
	
	
	get signature(){
		
		return 'migrate:fresh {?--no-interaction}';
	}
	
	get props(){
		
		return {
			'no-interaction': _$consoleφ.Prop.boolean().default(false).description('Do not ask any interactive question')
		};
	}
	
	handle(){
		
		return this.run('fresh');
	}
};
exports.MigrateFreshCommand = MigrateFreshCommand;
