Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$CacheCommandφ = require('./CacheCommand'/*$path$*/);

class ConfigCacheCommand extends _$CacheCommandφ.CacheCommand {
	
	
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
