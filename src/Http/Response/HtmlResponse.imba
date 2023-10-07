import Response from './Response'
import type { FastifyReply } from 'fastify'

export default class HtmlResponse < Response

	def toResponse reply\FastifyReply
		reply.type('text/html')
		reply.code(self.statusCode)

		reply.send(self.data)

