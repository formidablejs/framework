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
var $4 = Symbol();
const {use_hooks: imba_use_hooks, hooks: imba_hooks} = require('imba'/*$path$*/);
(imba_use_hooks());
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../Requests/LoginRequest'/*$path$*/));
var $2 = requireDefault$__(require('../../../Http/Controller'/*$path$*/));
var $3 = require('../../../Support/Decorators/use'/*$path$*/);

const loginAuth = {
	onLogin: null
};

class LoginController extends $2.default {
	constructor(){
		super(...arguments);
		this[$__initor__$]===$4 && (this[$__hooks__$]&&this[$__hooks__$].inited(this),this[$__inited__$] && this[$__inited__$]());
	}
	static [$__init__$](){
		this.prototype[$__initor__$] = $4;
		this.prototype[$__hooks__$] = imba_hooks;
		decorate$__([$3.αuse.bind([$1.default])],this.prototype,'login',null);
		
		return this;
	}
	/**
	@param {LoginRequest} request
	*/
	login(request,reply){
		
		const handler = loginAuth.onLogin;
		
		if (handler) { return handler(request,reply) };
		
		return request.persist();
	}
	
	/**
	@param {function} handler
	*/
	static onLogin(handler){
		
		if (loginAuth.onLogin !== null) {
			
			throw new Error('onLogin handler is already set.');
			
			return;
		};
		
		return loginAuth.onLogin = handler;
	}
}; LoginController[$__init__$]();

exports.default = LoginController;
