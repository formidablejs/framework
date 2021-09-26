function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const Ψ__init__ = Symbol.for('#__init__'), Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$Encrypterφ = requireDefault$__(require('../../Foundation/Encrypter'/*$path$*/));
var _$InvalidSignatureExceptionφ = requireDefault$__(require('../Exceptions/InvalidSignatureException'/*$path$*/));
var _$jsonwebtokenφ = requireDefault$__(require('jsonwebtoken'/*$path$*/));
class ValidateSignature {
	[Ψ__init__]($$ = null){
		this.config = $$ ? $$.config : undefined;
		
	}
	constructor(config){
		this[Ψ__init__]();
		this.config = config;
	}
	
	/**
	@param {FormRequest} request
	*/
	async handle(request){
		var φ;
		
		try {
			
			const decodedSignature = await _$jsonwebtokenφ.default.verify(((φ = request.signature()) != null) ? (φ) : '',_$Encrypterφ.default.key());
			
			const uri = decodedSignature.uri;
			
			if (request.urlWithoutSignature() !== uri) {
				
				throw new _$InvalidSignatureExceptionφ.default('Invalid signature.');
			};
			
			return request;
		} catch (e) { };
		
		throw new _$InvalidSignatureExceptionφ.default('Invalid signature.');
	}
};
exports.default = ValidateSignature;

