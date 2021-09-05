
const ForbiddenException = require('../../../Http/Exceptions/ForbiddenException'/*$path$*/);

module.exports = class ErrorIfAuthenticated {
	
	
	handle(request,reply,params){
		
		if (this.isAuthenticated(request)) { return this.onAuthenticated(request,reply,params) };
		
		return request;
	}
	
	isAuthenticated(request){
		
		return request.hasHeader('authorization') || request.request.session.personal_access_token !== undefined;
	}
	
	onAuthenticated(request,reply,params){
		
		throw new ForbiddenException('Action not allowed.');
	}
};
