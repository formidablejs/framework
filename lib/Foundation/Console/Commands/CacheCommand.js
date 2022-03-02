Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$fs_extraφ = require('fs-extra'/*$path$*/);
var _$Commandφ = require('../Command'/*$path$*/);
var _$pathφ = require('path'/*$path$*/);

class CacheCommand extends _$Commandφ.Command {
	
	
	get path(){
		
		return _$pathφ.join(process.cwd(),'bootstrap','cache','config.json');
	}
	
	cache(){
		
		this.clear();
		
		this.app.cache();
		
		return this.info('Configuration cached successfully!');
	}
	
	clear(){
		
		if (_$fs_extraφ.existsSync(this.path)) { _$fs_extraφ.unlinkSync(this.path) };
		
		return this.info('Configuration cached cleared!');
	}
};
exports.CacheCommand = CacheCommand;
