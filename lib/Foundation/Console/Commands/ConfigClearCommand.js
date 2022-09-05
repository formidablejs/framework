Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('./CacheCommand'/*$path$*/);

class ConfigClearCommand extends $1.CacheCommand {
	
	
	get signature(){
		
		return 'config:clear';
	}
	
	get description(){
		
		return 'Remove the configuration cache file';
	}
	
	handle(){
		
		this.clear();
		
		return this.exit();
	}
};
exports.ConfigClearCommand = ConfigClearCommand;
