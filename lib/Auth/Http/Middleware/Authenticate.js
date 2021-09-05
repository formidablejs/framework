
const Auth = require('../../Auth'/*$path$*/);
const DriverManager = require('../../DriverManager'/*$path$*/);

module.exports = class Authenticate {
	
	
	constructor(config){
		
		this.config = config;
	}
	
	/**
	@param {any[]} params
	*/
	async handle(request,reply,params){
		
		const [protocol] = (params[0] !== undefined && params[0] !== null) ? params : ['api'];
		
		this.configure(protocol);
		
		const handler = DriverManager.get(protocol,request,reply,params,this.config);
		
		const personalAccessToken = await handler.verify();
		
		return request.auth = function() { return new Auth(personalAccessToken.tokenable,personalAccessToken.token.abilities); };
	}
	
	configure(protocol){
		
		const fetchedProtocol = this.config.get(("auth.protocols." + protocol + ".provider"));
		
		if (fetchedProtocol == undefined || fetchedProtocol == null) {
			
			throw new Error(("" + protocol + " is not a valid authentication protocol"));
		};
		
		const provider = this.config.get(("auth.providers." + fetchedProtocol));
		
		return Auth.setProvider(provider);
	}
};
