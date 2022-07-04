function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const $__init__$ = Symbol.for('#__init__'), $__patch__$ = Symbol.for('#__patch__'), $__initor__$ = Symbol.for('#__initor__'), $__inited__$ = Symbol.for('#__inited__'), $__hooks__$ = Symbol.for('#__hooks__');
var $5 = Symbol();
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('./HttpException'/*$path$*/));
var $2 = require('fastify'/*$path$*/);
var $3 = requireDefault$__(require('../Request/FormRequest'/*$path$*/));
var $4 = requireDefault$__(require('../Request/Request'/*$path$*/));

class NotFoundException extends $1.default {
	static [$__init__$](){
		this.prototype[$__initor__$] = $5;
		return this;
	}
	[$__patch__$]($$ = {}){
		var $6;
		super[$__patch__$] && super[$__patch__$]($$);
		($6 = $$.status) !== undefined && (this.status = $6);
		
	}
	constructor(){
		super(...arguments);
		super[$__init__$] || this[$__init__$]();this[$__initor__$]===$5 && (this[$__hooks__$]&&this[$__hooks__$].inited(this),this[$__inited__$] && this[$__inited__$]());
	}
	[$__init__$]($$ = null,deep = true){
		var $7;
		deep && super[$__init__$] && super[$__init__$](...arguments);
		this.status = ($$ && ($7 = $$.status) !== undefined) ? ($7) : 404;
		
	}
	/**
	@param {Request|FormRequest|FastifyRequest} request
	*/
	static using(request){
		
		return new this((request instanceof $3.default) ? (("Route " + (request.req.method) + ":" + (request.req.url) + " not found.")) : (("Route " + (request.method) + ":" + (request.url) + " not found.")));
	}
}; NotFoundException[$__init__$]();

exports.default = NotFoundException;
