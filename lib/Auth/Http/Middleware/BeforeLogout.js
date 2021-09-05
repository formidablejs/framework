
const DriverManager = require('../../DriverManager'/*$path$*/);

const logoutAuth = {
	beforeLogout: null
};

module.exports = class BeforeLogout {
	
	
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
		
		return request.authDriver = DriverManager.get(protocol,request,reply,params,this.config);
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
