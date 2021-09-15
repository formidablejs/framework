function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const Ψ__init__ = Symbol.for('#__init__'), Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__');
var φ = Symbol();
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$mailerφ = require('@formidablejs/mailer'/*$path$*/);
var _$FormRequestφ = requireDefault$__(require('../../Http/Request/FormRequest'/*$path$*/));

class ResetPassword extends _$mailerφ.Mailable {
	static [Ψ__init__](){
		this.prototype[Ψ__initor__] = φ;
		return this;
	}
	[Ψ__init__]($$ = null){
		super[Ψ__init__] && super[Ψ__init__](...arguments);
		this.subject = $$ ? $$.subject : undefined;
		this.request = $$ ? $$.request : undefined;
		
	}
	/**
	@param {FormRequest} request
	*/
	constructor(request){
		
		super();
		
		super[Ψ__init__] || this[Ψ__init__]();
		this.request = request;
		this.subject = "Forgot Password";
		this[Ψ__initor__]===φ && this[Ψ__inited__] && this[Ψ__inited__]();
	}
	
	render(){
		
		return 'publish @formidablejs/framework and @formidablejs/mailer';
	}
};
exports.default = ResetPassword; ResetPassword[Ψ__init__]();
