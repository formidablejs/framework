import { encrypt } from '../../Support/Helpers'
import { isEmpty } from '../../Support/Helpers'
import type FormRequest from '../Request/FormRequest'
import type { FastifyReply } from 'fastify'
import type View from '../View/View'

export default class ViewResponse

	prop view\View
	prop statusCode\Number = 200

	def constructor view\View, data\Object|null = null, statusCode\Number = 200
		self.view = new view(data || {})
		self.statusCode = statusCode

	static def make view\View, data\Object|null = null, statusCode\Number = 200
		new ViewResponse(view, data || {}, statusCode)

	def code statusCode\Number
		self.statusCode = statusCode

	def toView request\FormRequest, reply\FastifyReply
		self.view.setData {
			locale: request.locale!
			_token: !(isEmpty(request.req.session) && isEmpty(request.req.session.token)) ? encrypt(request.req.session.token) : null
		}

		const output = await self.view.make!

		reply.code(self.statusCode)
			.type('text/html')
			.send(output)
			.sent = true

