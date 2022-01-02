function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const Ψ__init__ = Symbol.for('#__init__'), Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__');
var φ = Symbol();
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$HttpExceptionφ = requireDefault$__(require('./HttpException'/*$path$*/));
var _$fastifyφ = require('fastify'/*$path$*/);
var _$FormRequestφ = requireDefault$__(require('../Request/FormRequest'/*$path$*/));
var _$Requestφ = requireDefault$__(require('../Request/Request'/*$path$*/));

class NotFoundException extends _$HttpExceptionφ.default {
	static [Ψ__init__](){
		this.prototype[Ψ__initor__] = φ;
		return this;
	}
	constructor(){
		super(...arguments);
		super[Ψ__init__] || this[Ψ__init__]();this[Ψ__initor__]===φ && this[Ψ__inited__] && this[Ψ__inited__]();
	}
	[Ψ__init__]($$ = null){
		var vφ;
		super[Ψ__init__] && super[Ψ__init__](...arguments);
		this.status = ($$ && (vφ = $$.status) !== undefined) ? (vφ) : 404;
		
	}
	/**
	@param {Request|FormRequest|FastifyRequest} request
	*/
	static using(request){
		
		return new this((request instanceof _$FormRequestφ.default) ? (("Route " + (request.req.method) + ":" + (request.req.url) + " not found.")) : (("Route " + (request.method) + ":" + (request.url) + " not found.")));
	}
}; NotFoundException[Ψ__init__]();

exports.default = NotFoundException;
