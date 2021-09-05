
module.exports = /**
@param {Object} route
*/
async function getResponse(route,request,reply){
	
	if (route.action instanceof Function) { return await route.action(request,reply) };
	
	return await (new route.action[0])[route.action[1]](request,reply);
};
