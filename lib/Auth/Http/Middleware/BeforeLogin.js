
const DriverManager = require('../../DriverManager'/*$path$*/);

const loginAuth = {
	beforeLogin: null
};

module.exports = class BeforeLogin {
	
	
	constructor(config){
		
		this.config = config;
	}
	
	/**
	@param {any[]} params
	*/
	handle(request,reply,params){
		
		const handler = loginAuth.beforeLogin;
		
		if (handler) { handler(request,reply,params,this.config) };
		
		const [protocol] = (params[0] != undefined) ? params : ['api'];
		
		return request.authDriver = DriverManager.get(protocol,request,reply,params,this.config);
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
