module.exports = class JsonResponse

	prop data = {}
	prop statusCode = 200

	def constructor object\Object
		self.data = object

	static def make object\Object
		new JsonResponse(object)

	def code statusCode\Number = 200
		self.statusCode = statusCode

		self

	def toJson reply
		reply.type('application/json')
		reply.code(self.statusCode)

		self.data
