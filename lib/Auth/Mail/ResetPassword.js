function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const $3 = Symbol.for('#__init__'), $4 = Symbol.for('#__patch__'), $7 = Symbol.for('#__initor__'), $8 = Symbol.for('#__inited__'), $5 = Symbol.for('#__hooks__');
var $6 = Symbol();
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('@formidablejs/mailer'/*$path$*/);
var $2 = requireDefault$__(require('../../Http/Request/FormRequest'/*$path$*/));

class ResetPassword extends $1.Mailable {
	static [$3](){
		this.prototype[$7] = $6;
		return this;
	}
	[$4]($$ = {}){
		var $9;
		super[$4] && super[$4]($$);
		($9 = $$.subject) !== undefined && (this.subject = $9);
		($9 = $$.request) !== undefined && (this.request = $9);
		
	}
	[$3]($$ = null,deep = true){
		deep && super[$3] && super[$3](...arguments);
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
		this[$7]===$6 && (this[$5]&&this[$5].inited(this),this[$8] && this[$8]());
	}
	
	render(){
		
		return 'publish @formidablejs/framework and @formidablejs/mailer';
	}
};
exports.default = ResetPassword; ResetPassword[$3]();
