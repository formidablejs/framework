const JsonResponse = require './JsonResponse'

module.exports = class Response

	prop data = null
	prop statusCode = 200

	def constructor data\any = null, statusCode\Number = 200
		self.data = data
		self.statusCode = statusCode

	def json object\Object
		JsonResponse.make object

	def code statusCode\Number
		self.statusCode = statusCode
