import isClass from '../../Support/Helpers/isClass'

export default def getResponse route\Object, request, reply
	if route.action instanceof Function then return await route.action request, reply

	let controller
	let action

	if isClass(route.action)
		controller = new route.action
		action = '__invoke'
	else
		controller = new route.action[0]
		action = route.action[1]

	controller.#request = request

	await controller[action](request, reply)
