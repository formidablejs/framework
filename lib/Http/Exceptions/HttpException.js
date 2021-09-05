const Ψinit = Symbol.for('#init');

class HttpException extends Error {
	[Ψinit]($$ = null){
		var φ;
		super[Ψinit] && super[Ψinit](...arguments);
		this.response = $$ ? $$.response : undefined;
		this.status = ($$ && (φ = $$.status) !== undefined) ? (φ) : 400;
		
	}
	/**
	@param {String} response
	*/
	constructor(response){
		
		super();
		
		super[Ψinit] || this[Ψinit]();
		this.response = response;
		
		this.initMessage();
		this.initName();
	}
	
	initMessage(){
		
		if (this.response !== undefined && this.response !== null) {
			
			return this.message = this.response;
		} else if (this.response !== undefined && this.response !== null && this.response.constructor.name) {
			
			return this.message = this.response.constructor.name.match(/[A-Z][a-z]+|[0-9]+/g).join(' ');
		};
	}
	
	initName(){
		
		return this.name = this.constructor.name;
	}
	
	getStatus(){
		
		return this.status;
	}
};

module.exports = HttpException;
