function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const $__initor__$ = Symbol.for('#__initor__'), $__inited__$ = Symbol.for('#__inited__'), $__hooks__$ = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../../Foundation/Encrypter'/*$path$*/));
var $2 = requireDefault$__(require('../../Foundation/Exceptions/InvalidAppKeyException'/*$path$*/));
var $3 = requireDefault$__(require('../Helpers/isEmpty'/*$path$*/));
var $4 = requireDefault$__(require('./Exceptions/MissingAppKeyException'/*$path$*/));
var $5 = requireDefault$__(require('../../Http/URL/URL'/*$path$*/));

class HasEncryptionKey {
	
	
	/**
	@param {Repository} config
	*/
	constructor(config){
		
		this.config = config;
	}
	
	/**
	@param {FormRequest} request
	*/
	handle(request){
		
		if (!(this.config.get('app.key'))) {
			
			throw new $4.default('No application encryption key has been specified.');
		};
		
		if ($3.default($1.default.iv())) {
			
			throw new $2.default('Application key is not valid.');
		};
		
		$5.default.setSecret($1.default.key());
		
		return request;
	}
	
	key(){
		
		return this.config.get('app.key');
	}
};
exports.default = HasEncryptionKey;
