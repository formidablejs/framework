function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};;
function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : a; };
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/

var $1 = requireDefault$__(require('../../Support/Helpers/isEmpty'/*$path$*/));
var $2 = requireDefault$__(require('../Response/JsonResponse'/*$path$*/));
var $3 = requireDefault$__(require('../Redirect/Redirect'/*$path$*/));
var $4 = requireDefault$__(require('../Response/ViewResponse'/*$path$*/));

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
			
			if (!($1.default(results))) { return results };
		};
	};
	
	if (response instanceof $3.default) {
		
		return await response.handle(request,reply);
	} else if (response instanceof $2.default) {
		
		return await response.toJson(reply);
	} else if (response instanceof $4.default) {
		
		return await response.toView(request,reply);
	} else if (response === undefined) {
		
		return null;
	} else {
		
		return response;
	};
};
exports.default = resolveResponse;
