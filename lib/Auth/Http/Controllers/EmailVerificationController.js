function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};;
function decorate$__(decorators,target,key,desc){
	var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const $__init__$ = Symbol.for('#__init__'), $__hooks__$ = Symbol.for('#__hooks__'), $__initor__$ = Symbol.for('#__initor__'), $__inited__$ = Symbol.for('#__inited__');
var $5 = Symbol();
const {use_hooks: imba_use_hooks, hooks: imba_hooks} = require('imba'/*$path$*/);
(imba_use_hooks());
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../Requests/VerifyEmailRequest'/*$path$*/));
var $2 = requireDefault$__(require('../Requests/EmailResendRequest'/*$path$*/));
var $3 = requireDefault$__(require('../../../Http/Controller'/*$path$*/));
var $4 = require('../../../Support/Decorators/use'/*$path$*/);

const emailVerification = {
	onVerification: null,
	onEmailResend: null
};

class EmailVerificationController extends $3.default {
	constructor(){
		super(...arguments);
		this[$__initor__$]===$5 && (this[$__hooks__$]&&this[$__hooks__$].inited(this),this[$__inited__$] && this[$__inited__$]());
	}
	static [$__init__$](){
		this.prototype[$__initor__$] = $5;
		this.prototype[$__hooks__$] = imba_hooks;
		decorate$__([$4.αuse.bind([$1.default])],this.prototype,'verify',null);
		decorate$__([$4.αuse.bind([$2.default])],this.prototype,'resend',null);
		
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
}; EmailVerificationController[$__init__$]();

exports.default = EmailVerificationController;
