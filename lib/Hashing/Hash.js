function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('argon2'/*$path$*/));
var $2 = requireDefault$__(require('bcrypt'/*$path$*/));
var $3 = requireDefault$__(require('./Exceptions/InvalidHashDriverException'/*$path$*/));

const settings = {
	config: null
};

class Hash {
	
	
	/**
	@param {String} value
	*/
	static async make(value){
		var $4;
		
		if (settings.config.driver == 'argon2') {
			
			return await $1.default.hash(value,settings.config.argon2);
		};
		
		if (settings.config.driver == 'bcrypt') {
			
			return await $2.default.hash(value,(($4 = settings.config.bcrypt.rounds) != null) ? ($4) : 10);
		};
		
		throw new $3.default(("" + (settings.config.driver) + " is not a valid driver."));
	}
	
	/**
	@param {String} value
	@param {String} hash
	*/
	static async check(value,hash){
		
		if (settings.config.driver == 'argon2') {
			
			return await $1.default.verify(value,hash,settings.config.argon2);
		};
		
		if (settings.config.driver == 'bcrypt') {
			
			return await $2.default.compare(value,hash);
		};
		
		throw new $3.default(("" + (settings.config.driver) + " is not a valid driver."));
	}
	
	/**
	@param {Object} config
	*/
	static configure(config){
		
		if (settings.config != null) { throw new Error('Hashing has been already configured.') };
		
		return settings.config = config;
	}
};
exports.default = Hash;
