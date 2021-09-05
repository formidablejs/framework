function decorate$__(decorators,target,key,desc){
	var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const Ψinit = Symbol.for('#init');

const LogoutRequest = require('../Requests/LogoutRequest'/*$path$*/);
const Controller = require('../../../Http/Controller'/*$path$*/);
const decorator$use = require('../../../Support/Decorators/use'/*$path$*/);

const logoutAuth = {
	onLogout: null
};

class LogoutController extends Controller {
	static [Ψinit](){
		decorate$__([decorator$use.bind([LogoutRequest])],this.prototype,'logout',null);
		
		return this;
	}
	/**
	@param {LogoutRequest} request
	*/
	logout(request,reply){
		
		const handler = logoutAuth.onLogout;
		
		if (handler) { return handler(request,reply) };
		
		return request.persist();
	}
	
	/**
	@param {Function} handler
	*/
	static onLogout(handler){
		
		if (logoutAuth.onLogout !== null) {
			
			throw new Error('onLogout handler is already set.');
			
			return;
		};
		
		return logoutAuth.onLogout = handler;
	}
}; LogoutController[Ψinit]();

module.exports = LogoutController;
