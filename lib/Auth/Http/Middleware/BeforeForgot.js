
const DriverManager = require('../../DriverManager'/*$path$*/);

const password = {
	beforeForgot: null
};

module.exports = class BeforeForgot {
	
	
	constructor(config){
		
		this.config = config;
	}
	
	/**
	@param {any[]} params
	*/
	handle(request,reply,params){
		
		const handler = password.beforeForgot;
		
		if (handler) { handler(request,reply,params,this.config) };
		
		const [protocol] = (params[0] != undefined) ? params : ['api'];
		
		return request.authDriver = DriverManager.get(protocol,request,reply,params,this.config);
	}
	
	/**
	@param {Function} handler
	*/
	static beforeForgot(handler){
		
		if (password.beforeForgot !== null) {
			
			throw new Error('beforeForgot handler is already set.');
		};
		
		return password.beforeForgot = handler;
	}
};
