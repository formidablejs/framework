const $__init__$ = Symbol.for('#__init__'), $__patch__$ = Symbol.for('#__patch__'), $__initor__$ = Symbol.for('#__initor__'), $__inited__$ = Symbol.for('#__inited__'), $__hooks__$ = Symbol.for('#__hooks__');
var $1 = Symbol();
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
class ApplicationException extends Error {
	static [$__init__$](){
		this.prototype[$__initor__$] = $1;
		return this;
	}
	[$__patch__$]($$ = {}){
		var $2;
		super[$__patch__$] && super[$__patch__$]($$);
		($2 = $$.response) !== undefined && (this.response = $2);
		($2 = $$.status) !== undefined && (this.status = $2);
		
	}
	[$__init__$]($$ = null,deep = true){
		deep && super[$__init__$] && super[$__init__$](...arguments);
		this.response = $$ ? $$.response : undefined;
		this.status = $$ ? $$.status : undefined;
		
	}
	/**
	@param {any} response
	@param {Number} status
	*/
	constructor(response,status = 500){
		
		super();
		
		super[$__init__$] || this[$__init__$]();
		this.response = response;
		this.status = status;
		
		this.initMessage();
		this.initName();
		this[$__initor__$]===$1 && (this[$__hooks__$]&&this[$__hooks__$].inited(this),this[$__inited__$] && this[$__inited__$]());
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
}; ApplicationException[$__init__$]();

exports.default = ApplicationException;
