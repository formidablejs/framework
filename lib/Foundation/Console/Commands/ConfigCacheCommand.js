Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('./CacheCommand'/*$path$*/);

class ConfigCacheCommand extends $1.CacheCommand {
	
	
	get signature(){
		
		return 'config:cache';
	}
	
	get description(){
		
		return 'Create a cache file for faster configuration loading';
	}
	
	handle(){
		
		return this.cache();
	}
};
exports.ConfigCacheCommand = ConfigCacheCommand;
