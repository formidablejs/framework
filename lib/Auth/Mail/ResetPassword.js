const Ψinit = Symbol.for('#init');

const {Mailable: Mailable} = require('@formidablejs/mailer'/*$path$*/);
const FormRequest = require('../../Http/Request/FormRequest'/*$path$*/);

module.exports = class ResetPassword extends Mailable {
	[Ψinit]($$ = null){
		super[Ψinit] && super[Ψinit](...arguments);
		this.subject = $$ ? $$.subject : undefined;
		this.request = $$ ? $$.request : undefined;
		
	}
	/**
	@param {FormRequest} request
	*/
	constructor(request){
		
		super();
		
		super[Ψinit] || this[Ψinit]();
		this.request = request;
		this.subject = "Forgot Password";
	}
	
	render(){
		
		return 'publish @formidablejs/framework and @formidablejs/mailer';
	}
};
