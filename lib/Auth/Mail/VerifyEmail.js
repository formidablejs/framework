function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const $3 = Symbol.for('#__init__'), $6 = Symbol.for('#__initor__'), $7 = Symbol.for('#__inited__'), $4 = Symbol.for('#__hooks__');
var $5 = Symbol();
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('@formidablejs/mailer'/*$path$*/);
var $2 = requireDefault$__(require('../../Http/Request/FormRequest'/*$path$*/));

class VerifyEmail extends $1.Mailable {
	static [$3](){
		this.prototype[$6] = $5;
		return this;
	}
	[$3]($$ = null){
		super[$3] && super[$3](...arguments);
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
		
		super[$3] || this[$3]();
		this.request = request;
		this.subject = request.t('auth.email.verify.subject','Verify Email Address');
		this.user = user;
		this[$6]===$5 && (this[$4]&&this[$4].inited(this),this[$7] && this[$7]());
	}
	
	render(){
		
		return 'publish @formidablejs/framework and @formidablejs/mailer';
	}
};
exports.default = VerifyEmail; VerifyEmail[$3]();
