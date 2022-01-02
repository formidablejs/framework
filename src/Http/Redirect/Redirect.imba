import { isEmpty } from '../../Support/Helpers/index'
import URL from '../URL/URL'

export default class Redirect

	prop path\String
	prop statusCode\Number
	prop _flashed\Object = {}

	def constructor path\String, statusCode\Number = 302
		self.path = path
		self.statusCode = statusCode

	static def to path\String
		new self(path)

	static def back statucCode\Number|null = 302
		new self(null, statucCode)

	static def route name\String, params\Object = {}
		new self(URL.route(name, params))

	def with key\String, value\any
		self._flashed = Object.assign(self._flashed, {
			[key]: value
		})

		self

	def hasFlash
		!isEmpty(self._flashed)

	def flashed
		self._flashed

	def code statusCode\Number
		self.statusCode = statusCode

		self

	def handle request, reply
		if isEmpty(self.path) then self.path = request.header('referer')

		if self.hasFlash! then request.flashMany(self.flashed!)

		reply.code(self.statusCode)
			.redirect(self.path)
