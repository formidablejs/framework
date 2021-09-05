
const DriverManager = require('../../DriverManager'/*$path$*/);

const registerAuth = {
	beforeRegister: null
};

module.exports = class BeforeRegister {
	
	
	constructor(config){
		
		this.config = config;
	}
	
	/**
	@param {any[]} params
	*/
	handle(request,reply,params){
		
		const handler = registerAuth.beforeRegister;
		
		if (handler) { handler(request,reply,params,this.config) };
		
		const [protocol] = (params[0] != undefined) ? params : ['api'];
		
		return request.authDriver = DriverManager.get(protocol,request,reply,params,this.config);
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
