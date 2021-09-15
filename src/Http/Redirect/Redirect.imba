import URL from '../URL/URL'

export default class Redirect

	def constructor path\String, statusCode\Number = 302
		self.path = path
		self.statusCode = statusCode

	static def to path\String
		new self(path)

	static def route name\String, params\Object = {}
		new self(URL.route(name, params))

	def code statusCode\Number
		self.statusCode = statusCode

		self
