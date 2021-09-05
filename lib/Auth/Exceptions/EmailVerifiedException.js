const Ψinit = Symbol.for('#init');

const HttpException = require('../../Http/Exceptions/HttpException'/*$path$*/);

class EmailVerifiedException extends HttpException {
	constructor(){
		super(...arguments);
		super[Ψinit] || this[Ψinit]();
	}
	[Ψinit]($$ = null){
		var φ;
		super[Ψinit] && super[Ψinit](...arguments);
		this.status = ($$ && (φ = $$.status) !== undefined) ? (φ) : 403;
		
	}
};

module.exports = EmailVerifiedException;
