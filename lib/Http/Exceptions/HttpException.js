function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const $__init__$ = Symbol.for('#__init__'), $__patch__$ = Symbol.for('#__patch__'), $__initor__$ = Symbol.for('#__initor__'), $__inited__$ = Symbol.for('#__inited__'), $__hooks__$ = Symbol.for('#__hooks__');
var $2 = Symbol();
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../../Support/Helpers/isEmpty'/*$path$*/));

class HttpException extends Error {
	static [$__init__$](){
		this.prototype[$__initor__$] = $2;
		return this;
	}
	[$__patch__$]($$ = {}){
		var $3;
		super[$__patch__$] && super[$__patch__$]($$);
		($3 = $$.response) !== undefined && (this.response = $3);
		($3 = $$.status) !== undefined && (this.status = $3);
		
	}
	[$__init__$]($$ = null,deep = true){
		var $4;
		deep && super[$__init__$] && super[$__init__$](...arguments);
		this.response = $$ ? $$.response : undefined;
		this.status = ($$ && ($4 = $$.status) !== undefined) ? ($4) : 400;
		
	}
	/**
	@param {String} response
	@param {Number|null} statusCode
	*/
	constructor(response,statusCode = null){
		
		super();
		
		super[$__init__$] || this[$__init__$]();
		this.response = response;
		
		if (!($1.default(statusCode))) { this.status = statusCode };
		
		this.initMessage();
		this.initName();
		this[$__initor__$]===$2 && (this[$__hooks__$]&&this[$__hooks__$].inited(this),this[$__inited__$] && this[$__inited__$]());
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
}; HttpException[$__init__$]();

exports.default = HttpException;
