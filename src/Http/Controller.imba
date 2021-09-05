const Validator = require '../Validator/Validator'

module.exports = class Controller

	def validate request, rules\Object = null
		Validator.make(request.input!, rules)
