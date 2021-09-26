function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$Encrypterφ = requireDefault$__(require('../../Foundation/Encrypter'/*$path$*/));
var _$InvalidAppKeyExceptionφ = requireDefault$__(require('../../Foundation/Exceptions/InvalidAppKeyException'/*$path$*/));
var _$isEmptyφ = requireDefault$__(require('../Helpers/isEmpty'/*$path$*/));
var _$MissingAppKeyExceptionφ = requireDefault$__(require('./Exceptions/MissingAppKeyException'/*$path$*/));
var _$URLφ = requireDefault$__(require('../../Http/URL/URL'/*$path$*/));

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
		
		if (!this.config.get) {
			
			throw new _$MissingAppKeyExceptionφ.default('No application encryption key has been specified.');
		};
		
		if (_$isEmptyφ.default(_$Encrypterφ.default.iv())) {
			
			throw new _$InvalidAppKeyExceptionφ.default('Application key is not valid.');
		};
		
		_$URLφ.default.setSecret(_$Encrypterφ.default.key());
		
		return request;
	}
	
	key(){
		
		return this.config.get('app.key');
	}
};
exports.default = HasEncryptionKey;
