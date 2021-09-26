import type { FastifyReply } from 'fastify'
import type FormRequest from '../Request/FormRequest'

export default class IgnoreCookies

	def handle request\FormRequest, reply\FastifyReply, params\any[]|null
		reply.setCookie = do null
