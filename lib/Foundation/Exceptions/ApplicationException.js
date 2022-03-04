const $1 = Symbol.for('#__init__'), $4 = Symbol.for('#__initor__'), $5 = Symbol.for('#__inited__'), $2 = Symbol.for('#__hooks__');
var $3 = Symbol();
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
class ApplicationException extends Error {
	static [$1](){
		this.prototype[$4] = $3;
		return this;
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
		this[$4]===$3 && (this[$2]&&this[$2].inited(this),this[$5] && this[$5]());
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
