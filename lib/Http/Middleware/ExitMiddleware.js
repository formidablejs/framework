function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};;
function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : a; };
const $__init__$ = Symbol.for('#__init__'), $__patch__$ = Symbol.for('#__patch__'), $__initor__$ = Symbol.for('#__initor__'), $__inited__$ = Symbol.for('#__inited__'), $__hooks__$ = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('../../Support/Helpers'/*$path$*/);
var $2 = requireDefault$__(require('../Exceptions/HttpException'/*$path$*/));
var $3 = requireDefault$__(require('../Response/JsonResponse'/*$path$*/));
var $4 = requireDefault$__(require('../Exceptions/NotFoundException'/*$path$*/));
var $5 = requireDefault$__(require('../Redirect/Redirect'/*$path$*/));
var $6 = requireDefault$__(require('../Request/Request'/*$path$*/));
var $7 = requireDefault$__(require('../Response/Response'/*$path$*/));
var $8 = requireDefault$__(require('stacktrace-js'/*$path$*/));
var $9 = requireDefault$__(require('../../Validator/Exceptions/ValidationException'/*$path$*/));
var $10 = requireDefault$__(require('../Response/ViewResponse'/*$path$*/));
const config = {resolvers: []};

class ExitMiddleware {
	[$__patch__$]($$ = {}){
		var $11;
		($11 = $$.response) !== undefined && (this.response = $11);
		
	}
	[$__init__$]($$ = null,deep = true){
		this.response = $$ ? $$.response : undefined;
		
	}
	constructor(response){
		this[$__init__$]();
		this.response = response;
	}
	
	static register(resolver){
		
		config.resolvers.push(resolver);
		
		return this;
	}
	
	static make(response){
		
		return new this(response);
	}
	
	/**
	@param {Request} request
	@param {FastifyReply} reply
	*/
	handleRegistered(request,reply){
		var $12;
		
		$12 = [];
		for (let resolver of iter$__(config.resolvers)){
			
			const results = resolver(this.response,request,reply);
			
			if (!($1.isEmpty(results))) { return results };
		};
		return $12;
	}
	
	/**
	@param {Request} request
	@param {FastifyReply} reply
	*/
	handle(request,reply){
		
		const customResponse = this.handleRegistered(request,reply);
		
		if (!($1.isEmpty(customResponse))) {
			
			return customResponse;
		} else if (this.response instanceof $5.default) {
			
			return this.response.handle(request,reply);
		} else if (this.response($7.default)) {
			
			return this.response.handle(reply);
		} else if (this.response instanceof $3.default) {
			
			return this.response.toJson(reply);
		} else if (this.response instanceof $10.default) {
			
			return this.response.toView(request,reply);
		} else if (this.response === undefined) {
			
			return null;
		} else {
			
			return this.response;
		};
	}
	
	/**
	@param {Request} request
	@param {FastifyReply} reply
	@param {Boolean} returns
	@param {Boolean} shouldReport
	*/
	async errorHandler(request,reply,returns = false,shouldReport = true){
		var $13, $14;
		
		const customResponse = this.handleRegistered(request,reply);
		
		if (!($1.isEmpty(customResponse))) { return customResponse };
		
		const response = {
			message: 'An error has occured.',
			exception: this.response.name
		};
		
		if (this.response instanceof $9.default) {
			
			response.message = this.response.message;
		} else if ((this.response instanceof $2.default) || request.config.get('app.debug',false)) {
			
			response.message = (this.response.message !== undefined || this.response.message !== null) ? this.response.message : response.message;
			
			if (this.response instanceof $2.default) {
				
				((($13 = response.exception),delete response.exception, $13));
			} else {
				
				const stack = await $8.default.fromError(this.response);
				
				/**@type {String}*/ response.file = stack[0].fileName;
				/**@type {Number}*/ response.line = stack[0].lineNumber;
				/**@type {Array}*/ response.stack = stack;
				
				if (shouldReport) { console.error(this.response) };
			};
		} else {
			
			response.message = 'Internal Server Error';
			
			((($14 = response.exception),delete response.exception, $14));
		};
		
		if (returns) { return response };
		
		const statusCode = (typeof this.response.getStatus === 'function') ? this.response.getStatus() : 500;
		
		if (response.message !== undefined && response.message !== null && response.message.constructor == Object) {
			
			return reply.code(statusCode).send(response.message);
		};
		
		return reply.code(statusCode).send(response);
	}
	
	/**
	@param {Request} request
	@param {FastifyReply} reply
	@param {Array} hooks
	*/
	maintenanceModeHandler(request,reply,hooks){
		
		for (let $15 = 0, $16 = Object.keys(hooks), $20 = $16.length, hook, registeredHooks; $15 < $20; $15++){
			hook = $16[$15];registeredHooks = hooks[hook];
			for (let $17 = 0, $18 = iter$__(registeredHooks), $19 = $18.length; $17 < $19; $17++) {
				let hookHandler = $18[$17];
				if (hook == 'onMaintenance') { hookHandler(this.response,request,reply) };
			};
		};
		
		return reply.code(this.response.getStatus()).send({message: this.response.response});
	}
	
	/**
	@param {Request} request
	*/
	static notFoundHandler(request){
		
		return new $4.default(("Route " + request.method() + ":" + request.url() + " not found."));
	}
};
exports.default = ExitMiddleware;
