import { Mailable } from '@formidablejs/mailer'
import isEmpty from '../../Support/Helpers/isEmpty'
import JsonResponse from '../Response/JsonResponse'
import Redirect from '../Redirect/Redirect'
import Response from '../Response/Response'
import View from '../View/View'
import ViewResponse from '../Response/ViewResponse'

const settings = {
	resolvers: []
}

def addResolver resolver
	settings.resolvers.push resolver

exports.addResolver = addResolver

export default def resolveResponse response\any, request, reply
	for resolver of settings.resolvers
		const results = resolver(response, request, reply)

		if !isEmpty(results) then return results

	if response instanceof Redirect
		return reply.code(response.statusCode).redirect(response.path)

	if response instanceof JsonResponse
		return response.toJson(reply)

	if response instanceof ViewResponse
		return await response.toView(reply)

	if response instanceof View
		reply.header('content-type', 'text/html')

		return await response.make!

	if response instanceof Mailable
		reply.header('content-type', 'text/html')

		return await response.render!

	if response instanceof Response
		reply.code(response.statusCode)

		if response.data then return response.data;

		return ''

	if response === undefined then return null

	response
