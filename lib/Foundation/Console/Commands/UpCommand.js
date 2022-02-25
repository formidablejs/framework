Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$MaintenanceCommandφ = require('./MaintenanceCommand'/*$path$*/);

class UpCommand extends _$MaintenanceCommandφ.MaintenanceCommand {
	
	
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
