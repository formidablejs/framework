function decorate$__(decorators,target,key,desc){
	var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const Ψinit = Symbol.for('#init');

const VerifyEmailRequest = require('../Requests/VerifyEmailRequest'/*$path$*/);
const EmailResendRequest = require('../Requests/EmailResendRequest'/*$path$*/);
const Controller = require('../../../Http/Controller'/*$path$*/);
const decorator$use = require('../../../Support/Decorators/use'/*$path$*/);

const emailVerification = {
	onVerification: null,
	onEmailResend: null
};

class EmailVerificationController extends Controller {
	static [Ψinit](){
		decorate$__([decorator$use.bind([VerifyEmailRequest])],this.prototype,'verify',null);
		decorate$__([decorator$use.bind([EmailResendRequest])],this.prototype,'resend',null);
		
		return this;
	}
	/**
	@param {VerifyEmailRequest} request
	*/
	verify(request,reply){
		
		const handler = emailVerification.onVerification;
		
		if (handler) { return handler(request,reply) };
		
		return request.persist();
	}
	
	/**
	@param {EmailResendRequest} request
	*/
	resend(request,reply){
		
		const handler = emailVerification.onEmailResend;
		
		if (handler) { return handler(request,reply) };
		
		return request.persist();
	}
	
	/**
	@param {Function} handler
	*/
	static onVerification(handler){
		
		if (emailVerification.onVerification !== null) {
			
			throw new Error('onVerification handler is already set.');
			
			return;
		};
		
		return emailVerification.onVerification = handler;
	}
	
	/**
	@param {Function} handler
	*/
	static onEmailResend(handler){
		
		if (emailVerification.onEmailResend !== null) {
			
			throw new Error('onEmailResend handler is already set.');
			
			return;
		};
		
		return emailVerification.onEmailResend = handler;
	}
}; EmailVerificationController[Ψinit]();

module.exports = EmailVerificationController;
