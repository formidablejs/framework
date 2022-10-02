import { isEmpty } from '../../Support/Helpers/index'
import URL from '../URL/URL'

export default class Redirect

	prop path\string
	prop statusCode\number
	prop _flashed\object = {}

	def constructor path\string, statusCode\number = 302
		self.path = path
		self.statusCode = statusCode

	static def to path\string
		new self(path)

	static def back statucCode\number|null = 302
		new self(null, statucCode)

	static def route name\string, params\object = {}
		new self(URL.route(name, params))

	def with key\string, value\any
		self._flashed = Object.assign(self._flashed, {
			[key]: value
		})

		self

	def hasFlash
		!isEmpty(self._flashed)

	def flashed
		self._flashed

	def code statusCode\number
		self.statusCode = statusCode

		self

	def handle request, reply
		if isEmpty(self.path) then self.path = request.header('referer')

		if self.hasFlash! then request.flashMany(self.flashed!)

		reply.code(self.statusCode)
			.redirect(self.path)
