function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};;
function decorate$__(decorators,target,key,desc){
	var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const $5 = Symbol.for('#__init__'), $6 = Symbol.for('#__hooks__'), $8 = Symbol.for('#__initor__'), $9 = Symbol.for('#__inited__');
var $7 = Symbol();
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
		this[$8]===$7 && (this[$6]&&this[$6].inited(this),this[$9] && this[$9]());
	}
	static [$5](){
		this.prototype[$8] = $7;
		this.prototype[$6] = imba_hooks;
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
}; PasswordController[$5]();

exports.default = PasswordController;
