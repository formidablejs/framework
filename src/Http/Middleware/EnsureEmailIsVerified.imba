import Redirect from '../Redirect/Redirect'
import Request from '../Request/Request'
import EmailNotVerifiedException from '../../Auth/Exceptions/EmailNotVerifiedException'

export default class EnsureEmailIsVerified

	get redirectToRoute\string
		'/email/unverified'

	def handle request\Request, reply, params = []
		if request.auth!.check! && !request.user!.email_verified_at
			if request.expectsHtml! && self.redirectToRoute
				return self.toHtml(request, reply, params)

			return self.toJson(request, reply, params)

	def toHtml request, reply, params = []
		Redirect.to(this.redirectToRoute)

	def toJson request, reply, params = []
		throw new EmailNotVerifiedException 'Email is not verified.'
