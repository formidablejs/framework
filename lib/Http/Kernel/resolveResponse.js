function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$mailerφ = require('@formidablejs/mailer'/*$path$*/);
var _$JsonResponseφ = requireDefault$__(require('../Response/JsonResponse'/*$path$*/));
var _$Redirectφ = requireDefault$__(require('../Redirect/Redirect'/*$path$*/));
var _$Responseφ = requireDefault$__(require('../Response/Response'/*$path$*/));

/**
@param {any} response
*/
async function resolveResponse(response,reply){
	
	if (response instanceof _$Redirectφ.default) { return reply.code(response.statusCode).redirect(response.path) };
	
	if (response instanceof _$JsonResponseφ.default) { return response.toJson(reply) };
	
	if ((response instanceof _$mailerφ.Mailable)) {
		
		reply.header('content-type','text/html');
		
		return response.render() ? String(await response.render()) : '';
	};
	
	if (response instanceof _$Responseφ.default) {
		
		reply.code(response.statusCode);
		
		if (response.data) { return response.data };;
		
		return '';
	};
	
	if (response === undefined) { return null };
	
	return response;
};
exports.default = resolveResponse;
