import Route from '../Router/Route'
import ServiceResolver from '../../Support/ServiceResolver'

export default class CsrfServiceResolver < ServiceResolver

	static get runInCli
		false

	def boot
		Route.get('csrf-cookie', do(request, reply)
			reply.code(204)

			''
		).middleware('session')
