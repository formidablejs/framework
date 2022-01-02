import type FormRequest from '../Request/FormRequest'
import { Mailable } from '@formidablejs/mailer'
import isEmpty from '../../Support/Helpers/isEmpty'
import JsonResponse from '../Response/JsonResponse'
import Redirect from '../Redirect/Redirect'
import Response from '../Response/Response'
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
	elif response instanceof Mailable
		reply.header('content-type', 'text/html')
		return await response.render!
	elif response instanceof Response
		return await response.handle(reply)
	elif response === undefined
		return null
	else
		response
