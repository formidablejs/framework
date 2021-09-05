const Ψinit = Symbol.for('#init');

const HttpException = require('../../Http/Exceptions/HttpException'/*$path$*/);

class ValidationException extends HttpException {
	constructor(){
		super(...arguments);
		super[Ψinit] || this[Ψinit]();
	}
	[Ψinit]($$ = null){
		var φ;
		super[Ψinit] && super[Ψinit](...arguments);
		this.status = ($$ && (φ = $$.status) !== undefined) ? (φ) : 422;
		
	}
	/**
	@param {Object} messages
	*/
	static withMessages(messages){
		
		return new this({
			message: 'The given data was invalid.',
			errors: messages
		});
	}
};

module.exports = ValidationException;
