function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const Ψ__init__ = Symbol.for('#__init__'), Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__');
var φ = Symbol();
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$isEmptyφ = requireDefault$__(require('../../Support/Helpers/isEmpty'/*$path$*/));

class HttpException extends Error {
	static [Ψ__init__](){
		this.prototype[Ψ__initor__] = φ;
		return this;
	}
	[Ψ__init__]($$ = null){
		var vφ;
		super[Ψ__init__] && super[Ψ__init__](...arguments);
		this.response = $$ ? $$.response : undefined;
		this.status = ($$ && (vφ = $$.status) !== undefined) ? (vφ) : 400;
		
	}
	/**
	@param {String} response
	@param {Number|null} statusCode
	*/
	constructor(response,statusCode = null){
		
		super();
		
		super[Ψ__init__] || this[Ψ__init__]();
		this.response = response;
		
		if (!(_$isEmptyφ.default(statusCode))) { this.status = statusCode };
		
		this.initMessage();
		this.initName();
		this[Ψ__initor__]===φ && this[Ψ__inited__] && this[Ψ__inited__]();
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
}; HttpException[Ψ__init__]();

exports.default = HttpException;
