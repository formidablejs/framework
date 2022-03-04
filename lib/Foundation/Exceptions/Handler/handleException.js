function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};;
function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : []; };
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../../../Support/Helpers/isArray'/*$path$*/));
var $2 = requireDefault$__(require('../../../Support/Helpers/isEmpty'/*$path$*/));
var $3 = requireDefault$__(require('../../../Config/Repository'/*$path$*/));
var $4 = requireDefault$__(require('../../../Http/Exceptions/HttpException'/*$path$*/));
var $5 = requireDefault$__(require('../MaintenanceModeException'/*$path$*/));
var $6 = requireDefault$__(require('stacktrace-js'/*$path$*/));
var $7 = requireDefault$__(require('../../../Validator/Exceptions/ValidationException'/*$path$*/));
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
	
	for (let $8 = 0, $9 = Object.keys(hooks), $13 = $9.length, hook, registeredHooks; $8 < $13; $8++){
		hook = $9[$8];registeredHooks = hooks[hook];
		for (let $10 = 0, $11 = iter$__(registeredHooks), $12 = $11.length; $10 < $12; $10++) {
			let hookHandler = $11[$10];
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
@param {Boolean} shouldReport
*/
async function handleException(error,request,reply,returns = false,shouldReport = true){
	var $14, $15;
	
	for (let resolver of iter$__(settings.resolvers)){
		
		const results = resolver(error,request,reply);
		
		if (!($2.default(results))) { return results };
	};
	
	const statusCode = (typeof error.getStatus === 'function') ? error.getStatus() : 500;
	
	const response = {
		message: 'An error has occured.',
		exception: error.name
	};
	
	if (error instanceof $7.default) {
		
		response.message = error.message;
	} else if (settings.config.get('app.debug',false)) {
		
		response.message = (error.message !== undefined || error.message !== null) ? error.message : response.message;
		
		const stack = await $6.default.fromError(error);
		
		response.file = stack[0].fileName;
		response.line = stack[0].lineNumber;
		response.stack = stack;
		
		if (shouldReport) {
			
			console.error(error);
		};
	} else if (error instanceof $4.default) {
		
		response.message = (error.message !== undefined || error.message !== null) ? error.message : response.message;
		((($14 = response.exception),delete response.exception, $14));
	} else {
		
		response.message = 'Internal Server Error';
		((($15 = response.exception),delete response.exception, $15));
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
