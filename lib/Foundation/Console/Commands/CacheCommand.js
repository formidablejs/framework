Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('fs-extra'/*$path$*/);
var $2 = require('../Command'/*$path$*/);
var $3 = require('path'/*$path$*/);

class CacheCommand extends $2.Command {
	
	
	get config(){
		
		return $3.join(process.cwd(),'bootstrap','cache','config.json');
	}
	
	get address(){
		
		return $3.join(process.cwd(),'storage','framework','address.json');
	}
	
	cache(){
		
		this.clear(false);
		
		this.app.cache();
		
		this.message('info','Configuration cached successfully!');
		
		return this.exit();
	}
	
	/**
	@param {boolean} newLine
	*/
	clear(newLine = true){
		
		if ($1.existsSync(this.config)) { $1.unlinkSync(this.config) };
		
		if ($1.existsSync(this.address)) { $1.unlinkSync(this.address) };
		
		this.message('info','Configuration address cleared!',false);
		return this.message('info','Configuration cache cleared!',newLine);
	}
};
exports.CacheCommand = CacheCommand;
