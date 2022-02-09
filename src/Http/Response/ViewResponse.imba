import { encrypt } from '../../Support/Helpers'
import { isEmpty } from '../../Support/Helpers'
import { without } from '../../Support/Helpers'
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
		const oldData = !isEmpty(request.req.session._flashed) ? (request.req.session._flashed._old ?? {}) : {}
		const token = !isEmpty(request.req.session) && !isEmpty(request.req.session.token) ? encrypt(request.req.session.token) : null

		self.view.setData {
			locale: request.locale!
			csrf_token: token
			_flashed: without(request.req.session._flashed ?? {}, ['_old'])
			_old: without(oldData, ['_token']) ?? {}
		}

		delete request.req.session._flashed

		const output = await self.view.make!

		reply.code(self.statusCode)
			.type('text/html')
			.send(output)
			.sent = true

