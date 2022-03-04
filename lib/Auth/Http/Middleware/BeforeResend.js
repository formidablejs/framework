function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const $3 = Symbol.for('#__initor__'), $4 = Symbol.for('#__inited__'), $2 = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../../DriverManager'/*$path$*/));

const emailVerification = {
	beforeResend: null
};

class BeforeResend {
	
	
	constructor(config){
		
		this.config = config;
	}
	
	/**
	@param {any[]} params
	*/
	handle(request,reply,params){
		
		const handler = emailVerification.beforeResend;
		
		if (handler) { handler(request,reply,params,this.config) };
		
		const [protocol] = (params[0] != undefined) ? params : [this.defaultProtocol];
		
		return request.authDriver = $1.default.get(protocol,request,reply,params,this.config);
	}
	
	get defaultProtocol(){
		
		return this.config.get('auth.defaults.protocol','api');
	}
	
	/**
	@param {Function} handler
	*/
	static beforeResend(handler){
		
		if (emailVerification.beforeResend !== null) {
			
			throw new Error('beforeResend handler is already set');
		};
		
		return emailVerification.beforeResend = handler;
	}
};
exports.default = BeforeResend;
