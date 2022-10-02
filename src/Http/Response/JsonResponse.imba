export default class JsonResponse

	prop data = {}
	prop statusCode = 200

	def constructor object\object, statusCode\number = 200
		self.data = object
		self.statusCode = statusCode

	static def make object\object, statusCode\number
		new JsonResponse(object, statusCode)

	def code statusCode\number = 200
		self.statusCode = statusCode

		self

	def toJson reply
		reply.type('application/json')
		reply.code(self.statusCode)

		self.data
