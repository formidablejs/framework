const Ψinit = Symbol.for('#init');

class ApplicationException extends Error {
	[Ψinit]($$ = null){
		super[Ψinit] && super[Ψinit](...arguments);
		this.response = $$ ? $$.response : undefined;
		this.status = $$ ? $$.status : undefined;
		
	}
	/**
	@param {any} response
	@param {Number} status
	*/
	constructor(response,status = 500){
		
		super();
		
		super[Ψinit] || this[Ψinit]();
		this.response = response;
		this.status = status;
		
		this.initMessage();
		this.initName();
	}
	
	initMessage(){
		
		if (this.response !== undefined && this.response !== null) {
			
			return this.message = this.response;
		} else if (this.response.constructor.name) {
			
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

module.exports = ApplicationException;
