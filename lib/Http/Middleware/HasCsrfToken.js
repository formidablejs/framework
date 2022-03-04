function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const $3 = Symbol.for('#__initor__'), $4 = Symbol.for('#__inited__'), $2 = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('@fastify/csrf'/*$path$*/));
class HasCsrfToken {
	
	
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
		
		if (['HEAD','GET','OPTIONS'].includes(request.method())) {
			
			const secret = this.tokens().secretSync();
			const token = this.tokens().create(secret);
			
			request.request.session.secret = secret;
			return request.request.session.token = token;
		};
	}
	
	tokens(){
		
		return new $1.default({
			saltLength: 48,
			secretLength: 48
		});
	}
};
exports.default = HasCsrfToken;
