export default def getResponse route\Object, request, reply
	if route.action instanceof Function then return await route.action request, reply

	return await (new route.action[0])[route.action[1]](request, reply)
