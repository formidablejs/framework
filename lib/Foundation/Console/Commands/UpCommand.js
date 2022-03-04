Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('./MaintenanceCommand'/*$path$*/);

class UpCommand extends $1.MaintenanceCommand {
	
	
	get signature(){
		
		return 'up';
	}
	
	get description(){
		
		return 'Bring the application out of maintenance mode';
	}
	
	handle(){
		
		return this.up();
	}
};
exports.UpCommand = UpCommand;
