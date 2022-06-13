function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const $2 = Symbol.for('#__init__'), $3 = Symbol.for('#__patch__'), $6 = Symbol.for('#__initor__'), $7 = Symbol.for('#__inited__'), $4 = Symbol.for('#__hooks__');
var $5 = Symbol();
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../../Support/Helpers/isEmpty'/*$path$*/));

class HttpException extends Error {
	static [$2](){
		this.prototype[$6] = $5;
		return this;
	}
	[$3]($$ = {}){
		var $8;
		super[$3] && super[$3]($$);
		($8 = $$.response) !== undefined && (this.response = $8);
		($8 = $$.status) !== undefined && (this.status = $8);
		
	}
	[$2]($$ = null,deep = true){
		var $9;
		deep && super[$2] && super[$2](...arguments);
		this.response = $$ ? $$.response : undefined;
		this.status = ($$ && ($9 = $$.status) !== undefined) ? ($9) : 400;
		
	}
	/**
	@param {String} response
	@param {Number|null} statusCode
	*/
	constructor(response,statusCode = null){
		
		super();
		
		super[$2] || this[$2]();
		this.response = response;
		
		if (!($1.default(statusCode))) { this.status = statusCode };
		
		this.initMessage();
		this.initName();
		this[$6]===$5 && (this[$4]&&this[$4].inited(this),this[$7] && this[$7]());
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
}; HttpException[$2]();

exports.default = HttpException;
