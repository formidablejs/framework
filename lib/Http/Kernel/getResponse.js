function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const $2 = Symbol.for('#request');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../../Support/Helpers/isClass'/*$path$*/));

/**
@param {Object} route
*/
async function getResponse(route,request,reply){
	
	if ((route.action instanceof Function) && !($1.default(route.action))) {
		
		return await route.action(request,reply);
	};
	
	let controller;
	let action;
	
	if (!(Array.isArray(route.action))) {
		
		controller = new route.action;
		action = '__invoke';
	} else {
		
		controller = new route.action[0];
		action = route.action[1];
	};
	
	controller[$2] = request;
	
	return await controller[action](request,reply);
};
exports.default = getResponse;
