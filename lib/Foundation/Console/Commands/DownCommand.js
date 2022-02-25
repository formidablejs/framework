Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$MaintenanceCommandφ = require('./MaintenanceCommand'/*$path$*/);
var _$consoleφ = require('@formidablejs/console'/*$path$*/);

class DownCommand extends _$MaintenanceCommandφ.MaintenanceCommand {
	
	
	get signature(){
		
		return 'down {--message} {?--retry} {?--refresh} {?--secret} {?--status} {?--redirect}';
	}
	
	get props(){
		
		return {
			message: _$consoleφ.Prop.string().description('The message for the maintenance mode'),
			retry: _$consoleφ.Prop.number().description('The number of seconds after which the request may be retried'),
			refresh: _$consoleφ.Prop.number().description('The number of seconds after which the browser may refresh'),
			secret: _$consoleφ.Prop.string().description('The secret phrase that may be used to bypass maintenance mode'),
			status: _$consoleφ.Prop.number().default(503).description('The status code that should be used when returning the maintenance mode response'),
			redirect: _$consoleφ.Prop.string().description('The URL to which the browser should be redirected')
		};
	}
	
	get description(){
		
		return 'Put the application into maintenance mode';
	}
	
	handle(){
		
		return this.down();
	}
};
exports.DownCommand = DownCommand;
