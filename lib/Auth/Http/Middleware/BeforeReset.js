
const DriverManager = require('../../DriverManager'/*$path$*/);

const password = {
	beforeReset: null
};

module.exports = class BeforeReset {
	
	
	constructor(config){
		
		this.config = config;
	}
	
	/**
	@param {any[]} params
	*/
	handle(request,reply,params){
		
		const handler = password.beforeReset;
		
		if (handler) { handler(request,reply,params,this.config) };
		
		const [protocol] = (params[0] != undefined) ? params : ['api'];
		
		return request.authDriver = DriverManager.get(protocol,request,reply,params,this.config);
	}
	
	/**
	@param {Function} handler
	*/
	static beforeReset(handler){
		
		if (password.beforeReset !== null) {
			
			throw new Error('beforeReset handler is already set.');
		};
		
		return password.beforeReset = handler;
	}
};
