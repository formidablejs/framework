import type { FastifyReply } from 'fastify'

export default class JsonResponse

	prop data\object = {}
	prop statusCode\number = 200

	def constructor object\object, statusCode\number = 200
		self.data = object
		self.statusCode = statusCode

	static def make object\object, statusCode\number
		new JsonResponse(object, statusCode)

	def code statusCode\number = 200
		self.statusCode = statusCode

		self

	def toJson reply\FastifyReply
		reply.type('application/json')
		reply.code(self.statusCode)

		reply.send(self.data)
