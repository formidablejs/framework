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

const settings = {resolvers: []};

function addResolver(resolver){
	
	return settings.resolvers.push(resolver);
};

exports.addResolver = addResolver;

/**
@param {any} response
@param {FormRequest} request
*/
async function resolveResponse(response,request,reply,skipResolvers = false){
	
	if (skipResolvers !== true) {
		
		for (let resolver of iter$__(settings.resolvers)){
			
			const results = resolver(response,request,reply);
			
			if (!(_$isEmptyφ.default(results))) { return results };
		};
	};
	
	if (response instanceof _$Redirectφ.default) {
		
		return await response.handle(request,reply);
	} else if (response instanceof _$JsonResponseφ.default) {
		
		return await response.toJson(reply);
	} else if (response instanceof _$ViewResponseφ.default) {
		
		return await response.toView(request,reply);
	} else if (response instanceof _$mailerφ.Mailable) {
		
		reply.header('content-type','text/html');
		return await response.render();
	} else if (response instanceof _$Responseφ.default) {
		
		return await response.handle(reply);
	} else if (response === undefined) {
		
		return null;
	} else {
		
		return response;
	};
};
exports.default = resolveResponse;
