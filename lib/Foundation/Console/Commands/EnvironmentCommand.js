Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$Commandφ = require('../Command'/*$path$*/);
class EnvironmentCommand extends _$Commandφ.Command {
	
	
	get signature(){
		
		return 'env';
	}
	
	get description(){
		
		return 'Display the current framework environment';
	}
	
	handle(){
		
		return this.info(("Current application environment: " + this.app.config.get('app.env','development')));
	}
};
exports.EnvironmentCommand = EnvironmentCommand;
