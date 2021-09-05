
const DriverManager = require('../../DriverManager'/*$path$*/);

const emailVerification = {
	beforeResend: null
};

module.exports = class BeforeResend {
	
	
	constructor(config){
		
		this.config = config;
	}
	
	/**
	@param {any[]} params
	*/
	handle(request,reply,params){
		
		const handler = emailVerification.beforeResend;
		
		if (handler) { handler(request,reply,params,this.config) };
		
		const [protocol] = (params[0] != undefined) ? params : ['api'];
		
		return request.authDriver = DriverManager.get(protocol,request,reply,params,this.config);
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
