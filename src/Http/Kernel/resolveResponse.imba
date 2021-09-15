import { Mailable } from '@formidablejs/mailer'
import JsonResponse from '../Response/JsonResponse'
import Redirect from '../Redirect/Redirect'
import Response from '../Response/Response'

export default def resolveResponse response\any, reply
	if response instanceof Redirect then return reply.code(response.statusCode).redirect(response.path)

	if response instanceof JsonResponse then return response.toJson(reply)

	if (response instanceof Mailable)
		reply.header('content-type', 'text/html')

		return response.render! ? String(await response.render!) : ''

	if response instanceof Response
		reply.code(response.statusCode)

		if response.data then return response.data;

		return ''

	if response === undefined then return null

	response
