import Validator from '../Validator/Validator'

export default class Controller

	def validate request, rules\Object = null
		Validator.make(request.input!, rules)
