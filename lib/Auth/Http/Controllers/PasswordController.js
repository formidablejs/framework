function decorate$__(decorators,target,key,desc){
	var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const Ψinit = Symbol.for('#init');

const ForgotPasswordRequest = require('../Requests/ForgotPasswordRequest'/*$path$*/);
const ResetPasswordRequest = require('../Requests/ResetPasswordRequest'/*$path$*/);
const Controller = require('../../../Http/Controller'/*$path$*/);
const decorator$use = require('../../../Support/Decorators/use'/*$path$*/);

const password = {
	onForgot: null,
	onReset: null
};

class PasswordController extends Controller {
	static [Ψinit](){
		decorate$__([decorator$use.bind([ForgotPasswordRequest])],this.prototype,'forgot',null);
		decorate$__([decorator$use.bind([ResetPasswordRequest])],this.prototype,'reset',null);
		
		return this;
	}
	/**
	@param {ForgotPasswordRequest} request
	*/
	forgot(request,reply){
		
		const handler = password.onForgot;
		
		if (handler) { return handler(request,reply) };
		
		return request.persist();
	}
	
	/**
	@param {ResetPasswordRequest} request
	*/
	reset(request,reply){
		
		const handler = password.onReset;
		
		if (handler) { return handler(request,reply) };
		
		return request.persist();
	}
	
	/**
	@param {Function} handler
	*/
	static onForgot(handler){
		
		if (password.onForgot !== null) {
			
			throw new Error('onForgot handler is already set.');
			
			return;
		};
		
		return password.onForgot = handler;
	}
	
	/**
	@param {Function} handler
	*/
	static onReset(handler){
		
		if (password.onReset !== null) {
			
			throw new Error('onReset handler is already set.');
			
			return;
		};
		
		return password.onReset = handler;
	}
}; PasswordController[Ψinit]();

module.exports = PasswordController;
