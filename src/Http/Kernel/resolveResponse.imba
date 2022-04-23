import type FormRequest from '../Request/FormRequest'
import isEmpty from '../../Support/Helpers/isEmpty'
import JsonResponse from '../Response/JsonResponse'
import Redirect from '../Redirect/Redirect'
import ViewResponse from '../Response/ViewResponse'

const settings = { resolvers: [] }

def addResolver resolver
	settings.resolvers.push resolver

exports.addResolver = addResolver

export default def resolveResponse response\any, request\FormRequest, reply, skipResolvers = false
	if skipResolvers !== true
		for resolver of settings.resolvers
			const results = resolver(response, request, reply)

			if !isEmpty(results) then return results

	if response instanceof Redirect
		return await response.handle(request, reply)
	elif response instanceof JsonResponse
		return await response.toJson(reply)
	elif response instanceof ViewResponse
		return await response.toView(request, reply)
	elif response === undefined
		return null
	else
		response
