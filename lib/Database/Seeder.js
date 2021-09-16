function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$Databaseφ = requireDefault$__(require('./Database'/*$path$*/));
var _$isEmptyφ = requireDefault$__(require('../Support/Helpers/isEmpty'/*$path$*/));

class Seeder {
	
	
	/**
	@param {String} name
	*/
	make(name){
		
		if (_$isEmptyφ.default(_$Databaseφ.default)) { return false };
		
		return _$Databaseφ.default.seed.make(name);
	}
	
	run(){
		
		if (_$isEmptyφ.default(_$Databaseφ.default)) { return false };
		
		return _$Databaseφ.default.seed.run();
	}
};
exports.default = Seeder;
