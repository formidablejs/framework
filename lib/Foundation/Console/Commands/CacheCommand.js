Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$fs_extraφ = require('fs-extra'/*$path$*/);
var _$Commandφ = require('../Command'/*$path$*/);
var _$pathφ = require('path'/*$path$*/);

class CacheCommand extends _$Commandφ.Command {
	
	
	get config(){
		
		return _$pathφ.join(process.cwd(),'bootstrap','cache','config.json');
	}
	
	get address(){
		
		return _$pathφ.join(process.cwd(),'storage','framework','address.json');
	}
	
	cache(){
		
		this.clear();
		
		this.app.cache();
		
		return this.info('Configuration cached successfully!');
	}
	
	clear(){
		
		if (_$fs_extraφ.existsSync(this.config)) { _$fs_extraφ.unlinkSync(this.config) };
		
		if (_$fs_extraφ.existsSync(this.address)) { _$fs_extraφ.unlinkSync(this.address) };
		
		this.info('Configuration address cleared!');
		return this.info('Configuration cache cleared!');
	}
};
exports.CacheCommand = CacheCommand;
