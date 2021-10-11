import type View from '../View/View'
import JsonResponse from './JsonResponse'
import ViewResponse from './ViewResponse'

export default class Response

	prop data = null
	prop statusCode = 200

	def constructor data\any = null, statusCode\Number = 200
		self.data = data
		self.statusCode = statusCode

	def json object\Object
		JsonResponse.make object

	def view view\View, data\Object|null = null
		ViewResponse.make(view, data)

	def code statusCode\Number
		self.statusCode = statusCode
