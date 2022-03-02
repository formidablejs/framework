Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$CacheCommandφ = require('./CacheCommand'/*$path$*/);

class ConfigClearCommand extends _$CacheCommandφ.CacheCommand {
	
	
	get signature(){
		
		return 'config:clear';
	}
	
	get description(){
		
		return 'Remove the configuration cache file';
	}
	
	handle(){
		
		return this.clear();
	}
};
exports.ConfigClearCommand = ConfigClearCommand;
