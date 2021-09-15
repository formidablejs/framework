function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$DriverManagerφ = requireDefault$__(require('../../DriverManager'/*$path$*/));

const emailVerification = {
	beforeVerify: null
};

class BeforeVerify {
	
	
	constructor(config){
		
		this.config = config;
	}
	
	/**
	@param {any[]} params
	*/
	handle(request,reply,params){
		
		const handler = emailVerification.beforeVerify;
		
		if (handler) { handler(request,reply,params,this.config) };
		
		const [protocol] = (params[0] != undefined) ? params : ['api'];
		
		return request.authDriver = _$DriverManagerφ.default.get(protocol,request,reply,params,this.config);
	}
	
	/**
	@param {Function} handler
	*/
	static beforeVerify(handler){
		
		if (emailVerification.beforeVerify !== null) {
			
			throw new Error('beforeVerify handler is already set');
		};
		
		return emailVerification.beforeVerify = handler;
	}
};
exports.default = BeforeVerify;
