function decorate$__(decorators,target,key,desc){
	var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const Ψinit = Symbol.for('#init');

const RegisterRequest = require('../Requests/RegisterRequest'/*$path$*/);
const Controller = require('../../../Http/Controller'/*$path$*/);
const decorator$use = require('../../../Support/Decorators/use'/*$path$*/);

const registerAuth = {
	onRegister: null,
	onRegistered: null
};

class RegisterController extends Controller {
	static [Ψinit](){
		decorate$__([decorator$use.bind([RegisterRequest])],this.prototype,'register',null);
		
		return this;
	}
	/**
	@param {RegisterRequest} request
	*/
	register(request,reply){
		
		const handler = registerAuth.onRegister;
		
		if (handler) { return handler(request,reply) };
		
		return request.persist();
	}
	
	/**
	@param {Function} handler
	*/
	static onRegister(handler){
		
		if (registerAuth.onRegister !== null) {
			
			throw new Error('onRegister handler is already set.');
			
			return;
		};
		
		return registerAuth.onRegister = handler;
	}
}; RegisterController[Ψinit]();

module.exports = RegisterController;
