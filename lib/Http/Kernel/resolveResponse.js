function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};;
function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : []; };
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/

var _$mailerφ = require('@formidablejs/mailer'/*$path$*/);
var _$isEmptyφ = requireDefault$__(require('../../Support/Helpers/isEmpty'/*$path$*/));
var _$JsonResponseφ = requireDefault$__(require('../Response/JsonResponse'/*$path$*/));
var _$Redirectφ = requireDefault$__(require('../Redirect/Redirect'/*$path$*/));
var _$Responseφ = requireDefault$__(require('../Response/Response'/*$path$*/));
var _$ViewResponseφ = requireDefault$__(require('../Response/ViewResponse'/*$path$*/));

const settings = {
	resolvers: []
};

function addResolver(resolver){
	
	return settings.resolvers.push(resolver);
};

exports.addResolver = addResolver;

/**
@param {any} response
@param {FormRequest} request
*/
async function resolveResponse(response,request,reply){
	
	for (let resolver of iter$__(settings.resolvers)){
		
		const results = resolver(response,request,reply);
		
		if (!(_$isEmptyφ.default(results))) { return results };
	};
	
	if (response instanceof _$Redirectφ.default) {
		
		if (_$isEmptyφ.default(response.path)) { response.path = request.header('referer') };
		
		if (response.hasFlash()) { request.flashMany(response.flashed()) };
		
		return reply.code(response.statusCode).redirect(response.path);
	};
	
	if (response instanceof _$JsonResponseφ.default) {
		
		return response.toJson(reply);
	};
	
	if (response instanceof _$ViewResponseφ.default) {
		
		return await response.toView(request,reply);
	};
	
	if (response instanceof _$mailerφ.Mailable) {
		
		reply.header('content-type','text/html');
		
		return await response.render();
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
