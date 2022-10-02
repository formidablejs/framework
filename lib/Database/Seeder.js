function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('./Database'/*$path$*/));
var $2 = requireDefault$__(require('../Support/Helpers/isEmpty'/*$path$*/));

class Seeder {
	
	
	/**
	@param {string} name
	*/
	make(name){
		
		if ($2.default($1.default)) { return false };
		
		return $1.default.seed.make(name);
	}
	
	run(){
		
		if ($2.default($1.default)) { return false };
		
		return $1.default.seed.run();
	}
};
exports.default = Seeder;
