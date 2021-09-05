const Ψinit = Symbol.for('#init');

const InvalidSignatureException = require('../Exceptions/InvalidSignatureException'/*$path$*/);
const jwt = require('jsonwebtoken'/*$path$*/);

module.exports = class ValidateSignature {
	[Ψinit]($$ = null){
		this.config = $$ ? $$.config : undefined;
		
	}
	constructor(config){
		this[Ψinit]();
		this.config = config;
	}
	
	async handle(request){
		var φ;
		
		try {
			
			const decodedSignature = await jwt.verify(((φ = request.signature()) != null) ? (φ) : '',this.config.get('app.key'));
			
			const uri = decodedSignature.uri;
			
			if (request.urlWithoutSignature() !== uri) {
				
				throw new InvalidSignatureException('Invalid signature');
			};
			
			return request;
		} catch (e) { };
		
		throw new InvalidSignatureException('Invalid signature');
	}
};

