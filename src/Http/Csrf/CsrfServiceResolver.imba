const Route = require '../Router/Manager'
const ServiceResolver = require '../../Support/ServiceResolver'

module.exports = class CsrfServiceResolver < ServiceResolver

	def boot
		Route.get('csrf-cookie', do(request, reply)
			reply.code(204)

			''
		).middleware('session')
