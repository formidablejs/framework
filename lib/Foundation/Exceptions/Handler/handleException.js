
const ConfigRepostory = require('../../../Config/Repository'/*$path$*/);
const HttpException = require('../../../Http/Exceptions/HttpException'/*$path$*/);
const StackTrace = require('stacktrace-js'/*$path$*/);
const ValidationException = require('../../../Validator/Exceptions/ValidationException'/*$path$*/);

const settings = {
	config: null
};

/**
@param {Boolean} returns
*/
async function handleException(error,request,reply,returns = false){
	var φ, φ2;
	
	const statusCode = (typeof error.getStatus === 'function') ? error.getStatus() : 500;
	
	const response = {
		message: 'An error has occured.',
		exception: error.name
	};
	
	if (error instanceof ValidationException) {
		
		response.message = error.message;
	} else if (settings.config.get('app.debug',false)) {
		
		response.message = (error.message !== undefined || error.message !== null) ? error.message : response.message;
		
		const stack = await StackTrace.fromError(error);
		
		response.file = stack[0].fileName;
		response.line = stack[0].lineNumber;
		response.stack = stack;
		
		console.error(error);
	} else if (error instanceof HttpException) {
		
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

exports.handleException = handleException;
exports.setConfig = setConfig;
