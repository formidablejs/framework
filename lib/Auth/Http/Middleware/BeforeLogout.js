function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$DriverManagerφ = requireDefault$__(require('../../DriverManager'/*$path$*/));

const logoutAuth = {
	beforeLogout: null
};

class BeforeLogout {
	
	
	constructor(config){
		
		this.config = config;
	}
	
	/**
	@param {any[]} params
	*/
	handle(request,reply,params){
		
		const handler = logoutAuth.beforeLogout;
		
		if (handler) { handler(request,reply,params,this.config) };
		
		const [protocol] = (params[0] != undefined) ? params : ['api'];
		
		return request.authDriver = _$DriverManagerφ.default.get(protocol,request,reply,params,this.config);
	}
	
	/**
	@param {Function} handler
	*/
	static beforeLogout(handler){
		
		if (logoutAuth.beforeLogout !== null) {
			
			throw new Error('beforeLogout handler is already set.');
		};
		
		return logoutAuth.beforeLogout = handler;
	}
};
exports.default = BeforeLogout;
