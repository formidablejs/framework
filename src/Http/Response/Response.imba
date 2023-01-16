import JsonResponse from './JsonResponse'
import ViewResponse from './ViewResponse'
import type { FastifyReply } from 'fastify'
import type View from '../View/View'

export default class Response

	prop data\object|null = null
	prop statusCode\number = 200

	def constructor data\any = null, statusCode\number = 200
		self.data = data
		self.statusCode = statusCode

	def json object\object, statusCode\number = 200
		JsonResponse.make(object, statusCode)

	def view view\View, data\object|null = null
		ViewResponse.make(view, data)

	def code statusCode\number
		self.statusCode = statusCode

		self

	def toResponse reply\FastifyReply
		reply.code(self.statusCode)

		reply.send(self.data)
