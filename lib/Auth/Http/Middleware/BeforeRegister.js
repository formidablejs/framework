function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$DriverManagerφ = requireDefault$__(require('../../DriverManager'/*$path$*/));

const registerAuth = {
	beforeRegister: null
};

class BeforeRegister {
	
	
	constructor(config){
		
		this.config = config;
	}
	
	/**
	@param {any[]} params
	*/
	handle(request,reply,params){
		
		const handler = registerAuth.beforeRegister;
		
		if (handler) { handler(request,reply,params,this.config) };
		
		const [protocol] = (params[0] != undefined) ? params : [this.defaultProtocol];
		
		return request.authDriver = _$DriverManagerφ.default.get(protocol,request,reply,params,this.config);
	}
	
	get defaultProtocol(){
		
		return this.config.get('auth.defaults.protocol','api');
	}
	
	/**
	@param {Function} handler
	*/
	static beforeRegister(handler){
		
		if (registerAuth.beforeRegister !== null) {
			
			throw new Error('beforeRegister handler is already set');
		};
		
		return registerAuth.beforeRegister = handler;
	}
};
exports.default = BeforeRegister;
