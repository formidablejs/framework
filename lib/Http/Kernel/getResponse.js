function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const $3 = Symbol.for('#request');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../../Support/Helpers/isClass'/*$path$*/));
var $2 = requireDefault$__(require('../../Support/Helpers/isFunction'/*$path$*/));

/**
@param {Object} route
*/
async function getResponse(route,request,reply){
	
	if (route.action instanceof Function) { return await route.action(request,reply) };
	
	let controller;
	let action;
	
	if ($1.default(route.action) && !($2.default(route.action))) {
		
		controller = route.action;
		action = '__invoke';
	} else {
		
		controller = new route.action[0];
		action = route.action[1];
	};
	
	controller[$3] = request;
	
	return await controller[action](request,reply);
};
exports.default = getResponse;
