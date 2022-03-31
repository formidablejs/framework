const $1 = Symbol.for('#__init__'), $2 = Symbol.for('#__patch__'), $5 = Symbol.for('#__initor__'), $6 = Symbol.for('#__inited__'), $3 = Symbol.for('#__hooks__');
var $4 = Symbol();
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
class ApplicationException extends Error {
	static [$1](){
		this.prototype[$5] = $4;
		return this;
	}
	[$2]($$ = {}){
		var $7;
		super[$2] && super[$2]($$);
		($7 = $$.response) !== undefined && (this.response = $7);
		($7 = $$.status) !== undefined && (this.status = $7);
		
	}
	[$1]($$ = null){
		super[$1] && super[$1](...arguments);
		this.response = $$ ? $$.response : undefined;
		this.status = $$ ? $$.status : undefined;
		
	}
	/**
	@param {any} response
	@param {Number} status
	*/
	constructor(response,status = 500){
		
		super();
		
		super[$1] || this[$1]();
		this.response = response;
		this.status = status;
		
		this.initMessage();
		this.initName();
		this[$5]===$4 && (this[$3]&&this[$3].inited(this),this[$6] && this[$6]());
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
}; ApplicationException[$1]();

exports.default = ApplicationException;
