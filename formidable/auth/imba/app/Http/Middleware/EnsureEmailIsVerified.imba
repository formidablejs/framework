import { Redirect, Request } from '@formidablejs/framework'
import type { FastifyReply } from '@formidablejs/framework'
import die from '@formidablejs/framework/lib/Support/Helpers/die'

export class EnsureEmailIsVerified
	get redirectToRoute\string
		'/email/unverified'

	def handle request\Request, reply\FastifyReply, params\Array<any>
		if request.auth!.check! && !request.user!.email_verified_at
			die(do
				if request.expectsHtml!
					return Redirect.to(this.redirectToRoute)

				throw new Error("Email is not verified")
			)

		request
