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
var $1 = requireDefault$__(require('../Requests/ForgotPasswordRequest'/*$path$*/));
var $2 = requireDefault$__(require('../Requests/ResetPasswordRequest'/*$path$*/));
var $3 = requireDefault$__(require('../../../Http/Controller'/*$path$*/));
var $4 = require('../../../Support/Decorators/use'/*$path$*/);

const password = {
	onForgot: null,
	onReset: null
};

class PasswordController extends $3.default {
	constructor(){
		super(...arguments);
		this[$__initor__$]===$5 && (this[$__hooks__$]&&this[$__hooks__$].inited(this),this[$__inited__$] && this[$__inited__$]());
	}
	static [$__init__$](){
		this.prototype[$__initor__$] = $5;
		this.prototype[$__hooks__$] = imba_hooks;
		decorate$__([$4.αuse.bind([$1.default])],this.prototype,'forgot',null);
		decorate$__([$4.αuse.bind([$2.default])],this.prototype,'reset',null);
		
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
	@param {function} handler
	*/
	static onForgot(handler){
		
		if (password.onForgot !== null) {
			
			throw new Error('onForgot handler is already set.');
			
			return;
		};
		
		return password.onForgot = handler;
	}
	
	/**
	@param {function} handler
	*/
	static onReset(handler){
		
		if (password.onReset !== null) {
			
			throw new Error('onReset handler is already set.');
			
			return;
		};
		
		return password.onReset = handler;
	}
}; PasswordController[$__init__$]();

exports.default = PasswordController;
