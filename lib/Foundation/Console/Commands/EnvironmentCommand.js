Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('../Command'/*$path$*/);
class EnvironmentCommand extends $1.Command {
	
	
	get signature(){
		
		return 'env';
	}
	
	get description(){
		
		return 'Display the current framework environment';
	}
	
	handle(){
		
		this.message('info',("Current application environment: " + this.app.config.get('app.env','development')));
		
		return this.exit();
	}
};
exports.EnvironmentCommand = EnvironmentCommand;
