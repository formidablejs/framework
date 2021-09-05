const { Mailable } = require '@formidablejs/mailer'
const JsonResponse = require '../Response/JsonResponse'
const Redirect = require '../Redirect/Redirect'
const Response = require '../Response/Response'

module.exports = def resolveResponse response\any, reply
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
