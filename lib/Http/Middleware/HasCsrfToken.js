function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$csrfφ = requireDefault$__(require('@fastify/csrf'/*$path$*/));

class HasCsrfToken {
	
	
	constructor(config){
		
		this.config = config;
	}
	
	handle(request,reply){
		
		if (['HEAD','GET','OPTIONS'].includes(request.method())) {
			
			const secret = this.tokens().secretSync();
			const token = this.tokens().create(secret);
			
			request.request.session.secret = secret;
			return request.request.session.token = token;
		};
	}
	
	tokens(){
		
		return new _$csrfφ.default({
			saltLength: 48,
			secretLength: 48
		});
	}
};
exports.default = HasCsrfToken;
