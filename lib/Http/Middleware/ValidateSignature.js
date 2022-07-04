function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const $__init__$ = Symbol.for('#__init__'), $__patch__$ = Symbol.for('#__patch__'), $__initor__$ = Symbol.for('#__initor__'), $__inited__$ = Symbol.for('#__inited__'), $__hooks__$ = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../../Foundation/Encrypter'/*$path$*/));
var $2 = requireDefault$__(require('../Exceptions/InvalidSignatureException'/*$path$*/));
var $3 = requireDefault$__(require('jsonwebtoken'/*$path$*/));
class ValidateSignature {
	[$__patch__$]($$ = {}){
		var $4;
		($4 = $$.config) !== undefined && (this.config = $4);
		
	}
	[$__init__$]($$ = null,deep = true){
		this.config = $$ ? $$.config : undefined;
		
	}
	constructor(config){
		this[$__init__$]();
		this.config = config;
	}
	
	/**
	@param {FormRequest} request
	*/
	async handle(request){
		var $5;
		
		try {
			
			const decodedSignature = await $3.default.verify((($5 = request.signature()) != null) ? ($5) : '',$1.default.key());
			
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

