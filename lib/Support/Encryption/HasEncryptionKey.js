function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$URLφ = requireDefault$__(require('../../Http/URL/URL'/*$path$*/));
var _$MissingAppKeyExceptionφ = requireDefault$__(require('./Exceptions/MissingAppKeyException'/*$path$*/));

class HasEncryptionKey {
	
	
	constructor(config){
		
		this.config = config;
	}
	
	handle(request){
		
		(!(this.key())) ? (new _$MissingAppKeyExceptionφ.default('No application encryption key has been specified.')) : null;
		
		_$URLφ.default.setSecret(this.key());
		
		return request;
	}
	
	key(){
		
		return this.config.get('app.key');
	}
};
exports.default = HasEncryptionKey;
