Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('./MaintenanceCommand'/*$path$*/);
var $2 = require('@formidablejs/console'/*$path$*/);

class DownCommand extends $1.MaintenanceCommand {
	
	
	get signature(){
		
		return 'down {?--message} {?--retry} {?--refresh} {?--secret} {?--status} {?--redirect}';
	}
	
	get props(){
		
		return {
			message: $2.Prop.string().description('The message for the maintenance mode'),
			retry: $2.Prop.number().description('The number of seconds after which the request may be retried'),
			refresh: $2.Prop.number().description('The number of seconds after which the browser may refresh'),
			secret: $2.Prop.string().description('The secret phrase that may be used to bypass maintenance mode'),
			status: $2.Prop.number().default(503).description('The status code that should be used when returning the maintenance mode response'),
			redirect: $2.Prop.string().description('The URL to which the browser should be redirected')
		};
	}
	
	get description(){
		
		return 'Put the application into maintenance mode';
	}
	
	handle(){
		
		this.down();
		
		return this.exit();
	}
};
exports.DownCommand = DownCommand;
