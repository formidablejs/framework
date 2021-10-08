function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};;
function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : []; };
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$isEmptyφ = requireDefault$__(require('../../../Support/Helpers/isEmpty'/*$path$*/));
var _$Repositoryφ = requireDefault$__(require('../../../Config/Repository'/*$path$*/));
var _$HttpExceptionφ = requireDefault$__(require('../../../Http/Exceptions/HttpException'/*$path$*/));
var _$MaintenanceModeExceptionφ = requireDefault$__(require('../MaintenanceModeException'/*$path$*/));
var _$stacktrace_jsφ = requireDefault$__(require('stacktrace-js'/*$path$*/));
var _$ValidationExceptionφ = requireDefault$__(require('../../../Validator/Exceptions/ValidationException'/*$path$*/));
const settings = {
	config: null,
	resolvers: []
};

function addExceptionResolver(resolver){
	
	return settings.resolvers.push(resolver);
};

/**
@param {MaintenanceModeException} error
@param {FormRequest} request
@param {FastifyReply} reply
*/
function handleMaintenanceMode(error,request,reply,hooks){
	
	for (let iφ = 0, keysφ = Object.keys(hooks), lφ = keysφ.length, hook, registeredHooks; iφ < lφ; iφ++){
		hook = keysφ[iφ];registeredHooks = hooks[hook];
		for (let iφ2 = 0, itemsφ = iter$__(registeredHooks), lenφ = itemsφ.length; iφ2 < lenφ; iφ2++) {
			let hookHandler = itemsφ[iφ2];
			if (hook == 'onMaintenance') {
				
				hookHandler(error,request,reply);
			};
		};
	};
	
	const message = error.response;
	const statusCode = error.getStatus();
	
	return reply.code(statusCode).send({message: message});
};

/**
@param {Error|ApplicationException|HttpException} error
@param {FormRequest} request
@param {FastifyReply} reply
@param {Boolean} returns
*/
async function handleException(error,request,reply,returns = false){
	var φ, φ2;
	
	for (let resolver of iter$__(settings.resolvers)){
		
		const results = resolver(error,request,reply);
		
		if (!(_$isEmptyφ.default(results))) { return results };
	};
	
	const statusCode = (typeof error.getStatus === 'function') ? error.getStatus() : 500;
	
	const response = {
		message: 'An error has occured.',
		exception: error.name
	};
	
	if (error instanceof _$ValidationExceptionφ.default) {
		
		response.message = error.message;
	} else if (settings.config.get('app.debug',false)) {
		
		response.message = (error.message !== undefined || error.message !== null) ? error.message : response.message;
		
		const stack = await _$stacktrace_jsφ.default.fromError(error);
		
		response.file = stack[0].fileName;
		response.line = stack[0].lineNumber;
		response.stack = stack;
		
		console.error(error);
	} else if (error instanceof _$HttpExceptionφ.default) {
		
		response.message = (error.message !== undefined || error.message !== null) ? error.message : response.message;
		(((φ = response.exception),delete response.exception, φ));
	} else {
		
		response.message = 'Internal Server Error';
		(((φ2 = response.exception),delete response.exception, φ2));
	};
	
	if (returns) { return response };
	
	if (response.message !== undefined && response.message !== null && response.message.constructor == Object) {
		
		return reply.code(statusCode).send(response.message);
	};
	
	return reply.code(statusCode).send(response);
};

/**
@param {ConfigRepostory} config
*/
function setConfig(config){
	
	if (settings.config !== null) {
		
		throw new Error('config repository is already set.');
	};
	
	return settings.config = config;
};

exports.addExceptionResolver = addExceptionResolver;
exports.handleException = handleException;
exports.handleMaintenanceMode = handleMaintenanceMode;
exports.setConfig = setConfig;
