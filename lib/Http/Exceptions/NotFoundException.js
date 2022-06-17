function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const $5 = Symbol.for('#__init__'), $6 = Symbol.for('#__patch__'), $9 = Symbol.for('#__initor__'), $10 = Symbol.for('#__inited__'), $7 = Symbol.for('#__hooks__');
var $8 = Symbol();
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('./HttpException'/*$path$*/));
var $2 = require('fastify'/*$path$*/);
var $3 = requireDefault$__(require('../Request/FormRequest'/*$path$*/));
var $4 = requireDefault$__(require('../Request/Request'/*$path$*/));

class NotFoundException extends $1.default {
	static [$5](){
		this.prototype[$9] = $8;
		return this;
	}
	[$6]($$ = {}){
		var $11;
		super[$6] && super[$6]($$);
		($11 = $$.status) !== undefined && (this.status = $11);
		
	}
	constructor(){
		super(...arguments);
		super[$5] || this[$5]();this[$9]===$8 && (this[$7]&&this[$7].inited(this),this[$10] && this[$10]());
	}
	[$5]($$ = null,deep = true){
		var $12;
		deep && super[$5] && super[$5](...arguments);
		this.status = ($$ && ($12 = $$.status) !== undefined) ? ($12) : 404;
		
	}
	/**
	@param {Request|FormRequest|FastifyRequest} request
	*/
	static using(request){
		
		return new this((request instanceof $3.default) ? (("Route " + (request.req.method) + ":" + (request.req.url) + " not found.")) : (("Route " + (request.method) + ":" + (request.url) + " not found.")));
	}
}; NotFoundException[$5]();

exports.default = NotFoundException;
