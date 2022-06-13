function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const $4 = Symbol.for('#__init__'), $5 = Symbol.for('#__patch__'), $9 = Symbol.for('#__initor__'), $10 = Symbol.for('#__inited__'), $6 = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../../Foundation/Encrypter'/*$path$*/));
var $2 = requireDefault$__(require('../Exceptions/InvalidSignatureException'/*$path$*/));
var $3 = requireDefault$__(require('jsonwebtoken'/*$path$*/));
class ValidateSignature {
	[$5]($$ = {}){
		var $7;
		($7 = $$.config) !== undefined && (this.config = $7);
		
	}
	[$4]($$ = null,deep = true){
		this.config = $$ ? $$.config : undefined;
		
	}
	constructor(config){
		this[$4]();
		this.config = config;
	}
	
	/**
	@param {FormRequest} request
	*/
	async handle(request){
		var $8;
		
		try {
			
			const decodedSignature = await $3.default.verify((($8 = request.signature()) != null) ? ($8) : '',$1.default.key());
			
			const uri = decodedSignature.uri;
			
			if (request.urlWithoutSignature() !== uri) {
				
				throw new $2.default('Invalid signature.');
			};
			
			return request;
		} catch (e) { };
		
		throw new $2.default('Invalid signature.');
	}
};
exports.default = ValidateSignature;

