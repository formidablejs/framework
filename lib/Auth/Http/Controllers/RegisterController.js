function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};;
function decorate$__(decorators,target,key,desc){
	var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const $4 = Symbol.for('#__init__'), $5 = Symbol.for('#__hooks__'), $7 = Symbol.for('#__initor__'), $8 = Symbol.for('#__inited__');
var $6 = Symbol();
const {use_hooks: imba_use_hooks, hooks: imba_hooks} = require('imba'/*$path$*/);
(imba_use_hooks());
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../Requests/RegisterRequest'/*$path$*/));
var $2 = requireDefault$__(require('../../../Http/Controller'/*$path$*/));
var $3 = require('../../../Support/Decorators/use'/*$path$*/);

const registerAuth = {
	onRegister: null,
	onRegistered: null
};

class RegisterController extends $2.default {
	constructor(){
		super(...arguments);
		this[$7]===$6 && (this[$5]&&this[$5].inited(this),this[$8] && this[$8]());
	}
	static [$4](){
		this.prototype[$7] = $6;
		this.prototype[$5] = imba_hooks;
		decorate$__([$3.αuse.bind([$1.default])],this.prototype,'register',null);
		
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
}; RegisterController[$4]();

exports.default = RegisterController;
