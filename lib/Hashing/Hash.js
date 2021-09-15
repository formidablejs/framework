function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$argon2ιφ = requireDefault$__(require('argon2'/*$path$*/));
var _$bcryptφ = requireDefault$__(require('bcrypt'/*$path$*/));
var _$InvalidHashDriverExceptionφ = requireDefault$__(require('./Exceptions/InvalidHashDriverException'/*$path$*/));

const settings = {
	config: null
};

class Hash {
	
	
	/**
	@param {String} value
	*/
	static async make(value){
		var φ;
		
		if (settings.config.driver == 'argon2') {
			
			return await _$argon2ιφ.default.hash(value,settings.config.argon2);
		};
		
		if (settings.config.driver == 'bcrypt') {
			
			return await _$bcryptφ.default.hash(value,((φ = settings.config.bcrypt.rounds) != null) ? (φ) : 10);
		};
		
		throw new _$InvalidHashDriverExceptionφ.default(("" + (settings.config.driver) + " is not a valid driver."));
	}
	
	/**
	@param {String} value
	@param {String} hash
	*/
	static async check(value,hash){
		
		if (settings.config.driver == 'argon2') {
			
			return await _$argon2ιφ.default.verify(value,hash,settings.config.argon2);
		};
		
		if (settings.config.driver == 'bcrypt') {
			
			return await _$bcryptφ.default.compare(value,hash);
		};
		
		throw new _$InvalidHashDriverExceptionφ.default(("" + (settings.config.driver) + " is not a valid driver."));
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
