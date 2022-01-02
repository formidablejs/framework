const Ψrequest = Symbol.for('#request');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
/**
@param {Object} route
*/
async function getResponse(route,request,reply){
	
	if (route.action instanceof Function) { return await route.action(request,reply) };
	
	const controller = new route.action[0];
	const action = route.action[1];
	
	controller[Ψrequest] = request;
	
	return await controller[action](request,reply);
};
exports.default = getResponse;
