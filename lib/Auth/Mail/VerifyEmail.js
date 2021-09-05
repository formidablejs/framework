const Ψinit = Symbol.for('#init');

const {config: config} = require('@formidablejs/helpers'/*$path$*/);
const {Mailable: Mailable} = require('@formidablejs/mailer'/*$path$*/);
const FormRequest = require('../../Http/Request/FormRequest'/*$path$*/);
const URL = require('../../Http/URL/URL'/*$path$*/);

module.exports = class VerifyEmail extends Mailable {
	[Ψinit]($$ = null){
		super[Ψinit] && super[Ψinit](...arguments);
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
		
		super[Ψinit] || this[Ψinit]();
		this.request = request;
		this.subject = request.t('auth.email.verify.subject','Verify Email Address');
		this.user = user;
	}
	
	render(){
		
		return 'publish @formidablejs/framework and @formidablejs/mailer';
	}
};
