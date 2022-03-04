function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const $5 = Symbol.for('#__init__'), $8 = Symbol.for('#__initor__'), $9 = Symbol.for('#__inited__'), $6 = Symbol.for('#__hooks__');
var $7 = Symbol();
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('./HttpException'/*$path$*/));
var $2 = require('fastify'/*$path$*/);
var $3 = requireDefault$__(require('../Request/FormRequest'/*$path$*/));
var $4 = requireDefault$__(require('../Request/Request'/*$path$*/));

class NotFoundException extends $1.default {
	static [$5](){
		this.prototype[$8] = $7;
		return this;
	}
	constructor(){
		super(...arguments);
		super[$5] || this[$5]();this[$8]===$7 && (this[$6]&&this[$6].inited(this),this[$9] && this[$9]());
	}
	[$5]($$ = null){
		var $10;
		super[$5] && super[$5](...arguments);
		this.status = ($$ && ($10 = $$.status) !== undefined) ? ($10) : 404;
		
	}
	/**
	@param {Request|FormRequest|FastifyRequest} request
	*/
	static using(request){
		
		return new this((request instanceof $3.default) ? (("Route " + (request.req.method) + ":" + (request.req.url) + " not found.")) : (("Route " + (request.method) + ":" + (request.url) + " not found.")));
	}
}; NotFoundException[$5]();

exports.default = NotFoundException;
