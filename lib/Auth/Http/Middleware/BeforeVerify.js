
const DriverManager = require('../../DriverManager'/*$path$*/);

const emailVerification = {
	beforeVerify: null
};

module.exports = class BeforeVerify {
	
	
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
		
		return request.authDriver = DriverManager.get(protocol,request,reply,params,this.config);
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
