import isArray from '../../Support/Helpers/isArray'
import Kernel from '../Kernel'
import NotFoundException from '../Exceptions/NotFoundException'
import Request from '../Request/Request'
import ServiceResolver from '../../Support/ServiceResolver'
import view from '../../Support/Helpers/view'

export default class SPAServiceResolver < ServiceResolver

	prop request\Request

	get view
		null

	get props
		{}

	get middleware
		[]

	def boot
		app.onResponse do(response, request, reply)
			if response instanceof NotFoundException && request.isMethod('get') && self.view
				if isArray(self.middleware)
					app.make(Kernel).resolveMiddleware(null, request, reply, app.config, self.middleware)

				self.request = request

				return view(self.view, self.props).toView(request, reply)
