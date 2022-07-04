function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const $__init__$ = Symbol.for('#__init__'), $__patch__$ = Symbol.for('#__patch__'), $__initor__$ = Symbol.for('#__initor__'), $__inited__$ = Symbol.for('#__inited__'), $__hooks__$ = Symbol.for('#__hooks__');
var $3 = Symbol();
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('@formidablejs/mailer'/*$path$*/);
var $2 = requireDefault$__(require('../../Http/Request/FormRequest'/*$path$*/));

class VerifyEmail extends $1.Mailable {
	static [$__init__$](){
		this.prototype[$__initor__$] = $3;
		return this;
	}
	[$__patch__$]($$ = {}){
		var $4;
		super[$__patch__$] && super[$__patch__$]($$);
		($4 = $$.subject) !== undefined && (this.subject = $4);
		($4 = $$.request) !== undefined && (this.request = $4);
		($4 = $$.user) !== undefined && (this.user = $4);
		
	}
	[$__init__$]($$ = null,deep = true){
		deep && super[$__init__$] && super[$__init__$](...arguments);
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
		
		super[$__init__$] || this[$__init__$]();
		this.request = request;
		this.subject = request.t('auth.email.verify.subject','Verify Email Address');
		this.user = user;
		this[$__initor__$]===$3 && (this[$__hooks__$]&&this[$__hooks__$].inited(this),this[$__inited__$] && this[$__inited__$]());
	}
	
	render(){
		
		return 'publish @formidablejs/framework and @formidablejs/mailer';
	}
};
exports.default = VerifyEmail; VerifyEmail[$__init__$]();
