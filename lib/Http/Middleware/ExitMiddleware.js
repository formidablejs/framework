function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};;
function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : []; };
const $11 = Symbol.for('#__init__'), $22 = Symbol.for('#__initor__'), $23 = Symbol.for('#__inited__'), $12 = Symbol.for('#__hooks__');
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
	[$11]($$ = null){
		this.response = $$ ? $$.response : undefined;
		
	}
	constructor(response){
		this[$11]();
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
		var $13;
		
		$13 = [];
		for (let resolver of iter$__(config.resolvers)){
			
			const results = resolver(this.response,request,reply);
			
			if (!($1.isEmpty(results))) { return results };
		};
		return $13;
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
		var $14, $15;
		
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
				
				((($14 = response.exception),delete response.exception, $14));
			} else {
				
				const stack = await $8.default.fromError(this.response);
				
				/**@type {String}*/ response.file = stack[0].fileName;
				/**@type {Number}*/ response.line = stack[0].lineNumber;
				/**@type {Array}*/ response.stack = stack;
				
				if (shouldReport) { console.error(this.response) };
			};
		} else {
			
			response.message = 'Internal Server Error';
			
			((($15 = response.exception),delete response.exception, $15));
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
		
		for (let $16 = 0, $17 = Object.keys(hooks), $21 = $17.length, hook, registeredHooks; $16 < $21; $16++){
			hook = $17[$16];registeredHooks = hooks[hook];
			for (let $18 = 0, $19 = iter$__(registeredHooks), $20 = $19.length; $18 < $20; $18++) {
				let hookHandler = $19[$18];
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
