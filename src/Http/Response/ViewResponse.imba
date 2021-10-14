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

	def toView reply\FastifyReply
		const output = await self.view.make!

		reply.code(self.statusCode)
			.type('text/html')
			.send(output)
			.sent = true

