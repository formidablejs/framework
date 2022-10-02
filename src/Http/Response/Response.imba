import type View from '../View/View'
import JsonResponse from './JsonResponse'
import ViewResponse from './ViewResponse'

export default class Response

	prop data = null
	prop statusCode = 200

	def constructor data\any = null, statusCode\number = 200
		self.data = data
		self.statusCode = statusCode

	def json object\object, statusCode\number = 200
		JsonResponse.make(object, statusCode)

	def view view\View, data\object|null = null
		ViewResponse.make(view, data)

	def code statusCode\number
		self.statusCode = statusCode
