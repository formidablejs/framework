export default def getResponse route\Object, request, reply
	if route.action instanceof Function then return await route.action request, reply

	const controller = new route.action[0]
	const action = route.action[1]

	controller.#request = request

	await controller[action](request, reply)
