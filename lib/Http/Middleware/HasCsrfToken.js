
const csrf = require('@fastify/csrf'/*$path$*/);

module.exports = class HasCsrfToken {
	
	
	constructor(config){
		
		this.config = config;
	}
	
	handle(request,reply){
		
		if (['HEAD','GET','OPTIONS'].includes(request.method())) {
			
			const secret = this.tokens().secretSync();
			const token = this.tokens().create(secret);
			
			request.request.session.secret = secret;
			return request.request.session.token = token;
		};
	}
	
	tokens(){
		
		return new csrf({
			saltLength: 48,
			secretLength: 48
		});
	}
};
