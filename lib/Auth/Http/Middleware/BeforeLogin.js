function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const $__initor__$ = Symbol.for('#__initor__'), $__inited__$ = Symbol.for('#__inited__'), $__hooks__$ = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../../DriverManager'/*$path$*/));

const loginAuth = {
	beforeLogin: null
};

class BeforeLogin {
	
	
	constructor(config){
		
		this.config = config;
	}
	
	/**
	@param {any[]} params
	*/
	handle(request,reply,params){
		
		const handler = loginAuth.beforeLogin;
		
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
	static beforeLogin(handler){
		
		if (loginAuth.beforeLogin !== null) {
			
			throw new Error('beforeLogin handler is already set.');
		};
		
		return loginAuth.beforeLogin = handler;
	}
};
exports.default = BeforeLogin;
