function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const Ψ__init__ = Symbol.for('#__init__'), Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__');
var φ = Symbol();
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$mailerφ = require('@formidablejs/mailer'/*$path$*/);
var _$FormRequestφ = requireDefault$__(require('../../Http/Request/FormRequest'/*$path$*/));

class VerifyEmail extends _$mailerφ.Mailable {
	static [Ψ__init__](){
		this.prototype[Ψ__initor__] = φ;
		return this;
	}
	[Ψ__init__]($$ = null){
		super[Ψ__init__] && super[Ψ__init__](...arguments);
		this.subject = $$ ? $$.subject : undefined;
		this.request = $$ ? $$.request : undefined;
		this.user = $$ ? $$.user : undefined;
		
	}
	/**
	@param {FormRequest} request
	@param {Object} user
	*/
	constructor(request,user){
		
		super();
		
		super[Ψ__init__] || this[Ψ__init__]();
		this.request = request;
		this.subject = request.t('auth.email.verify.subject','Verify Email Address');
		this.user = user;
		this[Ψ__initor__]===φ && this[Ψ__inited__] && this[Ψ__inited__]();
	}
	
	render(){
		
		return 'publish @formidablejs/framework and @formidablejs/mailer';
	}
};
exports.default = VerifyEmail; VerifyEmail[Ψ__init__]();
