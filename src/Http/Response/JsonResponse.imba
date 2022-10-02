export default class JsonResponse

	prop data = {}
	prop statusCode = 200

	def constructor object\object
		self.data = object

	static def make object\object
		new JsonResponse(object)

	def code statusCode\number = 200
		self.statusCode = statusCode

		self

	def toJson reply
		reply.type('application/json')
		reply.code(self.statusCode)

		self.data
