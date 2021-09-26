function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const Ψ__init__ = Symbol.for('#__init__'), Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__');
var φ = Symbol();
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/

var _$FormRequestφ = requireDefault$__(require('../../../Http/Request/FormRequest'/*$path$*/));

class LoginRequest extends _$FormRequestφ.default {
	static [Ψ__init__](){
		this.prototype[Ψ__initor__] = φ;
		return this;
	}
	constructor(){
		super(...arguments);
		super[Ψ__init__] || this[Ψ__init__]();this[Ψ__initor__]===φ && this[Ψ__inited__] && this[Ψ__inited__]();
	}
	[Ψ__init__]($$ = null){
		super[Ψ__init__] && super[Ψ__init__](...arguments);
		this.authDriver = $$ ? $$.authDriver : undefined;
		
	}
	authorize(){
		
		return true;
	}
	
	rules(){
		
		return {
			email: 'required|email',
			password: 'required',
			remember_me: 'boolean'
		};
	}
	
	async persist(){
		
		return await this.authDriver.authenticate(this.body());
	}
};
exports.default = LoginRequest; LoginRequest[Ψ__init__]();
