function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};;
function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : []; };
const Ψ__init__ = Symbol.for('#__init__'), Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$Helpersφ = require('../../Support/Helpers'/*$path$*/);
var _$HttpExceptionφ = requireDefault$__(require('../Exceptions/HttpException'/*$path$*/));
var _$JsonResponseφ = requireDefault$__(require('../Response/JsonResponse'/*$path$*/));
var _$NotFoundExceptionφ = requireDefault$__(require('../Exceptions/NotFoundException'/*$path$*/));
var _$Redirectφ = requireDefault$__(require('../Redirect/Redirect'/*$path$*/));
var _$Requestφ = requireDefault$__(require('../Request/Request'/*$path$*/));
var _$Responseφ = requireDefault$__(require('../Response/Response'/*$path$*/));
var _$stacktrace_jsφ = requireDefault$__(require('stacktrace-js'/*$path$*/));
var _$ValidationExceptionφ = requireDefault$__(require('../../Validator/Exceptions/ValidationException'/*$path$*/));
var _$ViewResponseφ = requireDefault$__(require('../Response/ViewResponse'/*$path$*/));
const config = {resolvers: []};

class ExitMiddleware {
	[Ψ__init__]($$ = null){
		this.response = $$ ? $$.response : undefined;
		
	}
	constructor(response){
		this[Ψ__init__]();
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
		var resφ;
		
		resφ = [];
		for (let resolver of iter$__(config.resolvers)){
			
			const results = resolver(this.response,request,reply);
			
			if (!(_$Helpersφ.isEmpty(results))) { return results };
		};
		return resφ;
	}
	
	/**
	@param {Request} request
	@param {FastifyReply} reply
	*/
	handle(request,reply){
		
		const customResponse = this.handleRegistered(request,reply);
		
		if (!(_$Helpersφ.isEmpty(customResponse))) {
			
			return customResponse;
		} else if (this.response instanceof _$Redirectφ.default) {
			
			return this.response.handle(request,reply);
		} else if (this.response(_$Responseφ.default)) {
			
			return this.response.handle(reply);
		} else if (this.response instanceof _$JsonResponseφ.default) {
			
			return this.response.toJson(reply);
		} else if (this.response instanceof _$ViewResponseφ.default) {
			
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
		var φ, φ2;
		
		const customResponse = this.handleRegistered(request,reply);
		
		if (!(_$Helpersφ.isEmpty(customResponse))) { return customResponse };
		
		const response = {
			message: 'An error has occured.',
			exception: this.response.name
		};
		
		if (this.response instanceof _$ValidationExceptionφ.default) {
			
			response.message = this.response.message;
		} else if ((this.response instanceof _$HttpExceptionφ.default) || request.config.get('app.debug',false)) {
			
			response.message = (this.response.message !== undefined || this.response.message !== null) ? this.response.message : response.message;
			
			if (this.response instanceof _$HttpExceptionφ.default) {
				
				(((φ = response.exception),delete response.exception, φ));
			} else {
				
				const stack = await _$stacktrace_jsφ.default.fromError(this.response);
				
				/**@type {String}*/ response.file = stack[0].fileName;
				/**@type {Number}*/ response.line = stack[0].lineNumber;
				/**@type {Array}*/ response.stack = stack;
				
				if (shouldReport) { console.error(this.response) };
			};
		} else {
			
			response.message = 'Internal Server Error';
			
			(((φ2 = response.exception),delete response.exception, φ2));
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
		
		for (let iφ = 0, keysφ = Object.keys(hooks), lφ = keysφ.length, hook, registeredHooks; iφ < lφ; iφ++){
			hook = keysφ[iφ];registeredHooks = hooks[hook];
			for (let iφ2 = 0, itemsφ = iter$__(registeredHooks), lenφ = itemsφ.length; iφ2 < lenφ; iφ2++) {
				let hookHandler = itemsφ[iφ2];
				if (hook == 'onMaintenance') { hookHandler(this.response,request,reply) };
			};
		};
		
		return reply.code(this.response.getStatus()).send({message: this.response.response});
	}
	
	/**
	@param {Request} request
	*/
	static notFoundHandler(request){
		
		return new _$NotFoundExceptionφ.default(("Route " + request.method() + ":" + request.url() + " not found."));
	}
};
exports.default = ExitMiddleware;
