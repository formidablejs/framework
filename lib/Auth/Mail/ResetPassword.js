function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const $3 = Symbol.for('#__init__'), $6 = Symbol.for('#__initor__'), $7 = Symbol.for('#__inited__'), $4 = Symbol.for('#__hooks__');
var $5 = Symbol();
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('@formidablejs/mailer'/*$path$*/);
var $2 = requireDefault$__(require('../../Http/Request/FormRequest'/*$path$*/));

class ResetPassword extends $1.Mailable {
	static [$3](){
		this.prototype[$6] = $5;
		return this;
	}
	[$3]($$ = null){
		super[$3] && super[$3](...arguments);
		this.subject = $$ ? $$.subject : undefined;
		this.request = $$ ? $$.request : undefined;
		
	}
	/**
	@param {FormRequest} request
	*/
	constructor(request){
		
		super();
		
		super[$3] || this[$3]();
		this.request = request;
		this.subject = "Forgot Password";
		this[$6]===$5 && (this[$4]&&this[$4].inited(this),this[$7] && this[$7]());
	}
	
	render(){
		
		return 'publish @formidablejs/framework and @formidablejs/mailer';
	}
};
exports.default = ResetPassword; ResetPassword[$3]();
