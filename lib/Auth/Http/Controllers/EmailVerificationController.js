function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};;
function decorate$__(decorators,target,key,desc){
	var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const Ψ__init__ = Symbol.for('#__init__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$VerifyEmailRequestφ = requireDefault$__(require('../Requests/VerifyEmailRequest'/*$path$*/));
var _$EmailResendRequestφ = requireDefault$__(require('../Requests/EmailResendRequest'/*$path$*/));
var _$Controllerφ = requireDefault$__(require('../../../Http/Controller'/*$path$*/));
var _$useφ = require('../../../Support/Decorators/use'/*$path$*/);

const emailVerification = {
	onVerification: null,
	onEmailResend: null
};

class EmailVerificationController extends _$Controllerφ.default {
	static [Ψ__init__](){
		decorate$__([_$useφ.αuse.bind([_$VerifyEmailRequestφ.default])],this.prototype,'verify',null);
		decorate$__([_$useφ.αuse.bind([_$EmailResendRequestφ.default])],this.prototype,'resend',null);
		
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
}; EmailVerificationController[Ψ__init__]();

exports.default = EmailVerificationController;
