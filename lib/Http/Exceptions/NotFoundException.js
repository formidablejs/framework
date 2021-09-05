const Ψinit = Symbol.for('#init');

const HttpException = require('./HttpException'/*$path$*/);

class NotFoundException extends HttpException {
	constructor(){
		super(...arguments);
		super[Ψinit] || this[Ψinit]();
	}
	[Ψinit]($$ = null){
		var φ;
		super[Ψinit] && super[Ψinit](...arguments);
		this.status = ($$ && (φ = $$.status) !== undefined) ? (φ) : 404;
		
	}
};

module.exports = NotFoundException;
