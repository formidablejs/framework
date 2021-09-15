function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$ForbiddenExceptionφ = requireDefault$__(require('../../../Http/Exceptions/ForbiddenException'/*$path$*/));

class ErrorIfAuthenticated {
	
	
	handle(request,reply,params){
		
		if (this.isAuthenticated(request)) { return this.onAuthenticated(request,reply,params) };
		
		return request;
	}
	
	isAuthenticated(request){
		
		return request.hasHeader('authorization') || request.request.session.personal_access_token !== undefined;
	}
	
	onAuthenticated(request,reply,params){
		
		throw new _$ForbiddenExceptionφ.default('Action not allowed.');
	}
};
exports.default = ErrorIfAuthenticated;
