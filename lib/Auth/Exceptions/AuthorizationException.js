const Ψinit = Symbol.for('#init');

const HttpException = require('../../Http/Exceptions/HttpException'/*$path$*/);

class AuthorizationException extends HttpException {
	constructor(){
		super(...arguments);
		super[Ψinit] || this[Ψinit]();
	}
	[Ψinit]($$ = null){
		var φ;
		super[Ψinit] && super[Ψinit](...arguments);
		this.status = ($$ && (φ = $$.status) !== undefined) ? (φ) : 401;
		
	}
};

module.exports = AuthorizationException;
