
const argon2 = require('argon2'/*$path$*/);
const bcrypt = require('bcrypt'/*$path$*/);
const InvalidHashDriverException = require('./Exceptions/InvalidHashDriverException'/*$path$*/);

const settings = {
	config: null
};

module.exports = class Hash {
	
	
	/**
	@param {String} value
	*/
	static async make(value){
		var φ;
		
		if (settings.config.driver == 'argon2') {
			
			return await argon2.hash(value,settings.config.argon2);
		};
		
		if (settings.config.driver == 'bcrypt') {
			
			return await bcrypt.hash(value,((φ = settings.config.bcrypt.rounds) != null) ? (φ) : 10);
		};
		
		throw new InvalidHashDriverException(("" + (settings.config.driver) + " is not a valid driver."));
	}
	
	/**
	@param {String} value
	@param {String} hash
	*/
	static async check(value,hash){
		
		if (settings.config.driver == 'argon2') {
			
			return await argon2.verify(value,hash,settings.config.argon2);
		};
		
		if (settings.config.driver == 'bcrypt') {
			
			return await bcrypt.compare(value,hash);
		};
		
		throw new InvalidHashDriverException(("" + (settings.config.driver) + " is not a valid driver."));
	}
	
	/**
	@param {Object} config
	*/
	static configure(config){
		
		if (settings.config != null) { throw new Error('Hashing has been already configured.') };
		
		return settings.config = config;
	}
};
