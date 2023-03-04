import type { FastifyReply } from 'fastify'
import type FormRequest from '../Request/FormRequest'

export default class EnsureStateless

	get strict\boolean
		false

	def handle request\FormRequest, reply\FastifyReply, params\any[]|null
		reply.setCookie = do null

		if self.strict
			try delete request.req.session
			try delete request.req.cookies
