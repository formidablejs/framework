import { Redirect, Request } from '@formidablejs/framework'
import type { FastifyReply } from '@formidablejs/framework'
import die from '@formidablejs/framework/lib/Support/Helpers/die'

export class EnsureEmailIsVerified {
	get redirectToRoute(): string {
		return '/email/unverified'
	}

	handle(request: Request, reply: FastifyReply, params: Array<any>): any {
		if (request.auth().check() && !request.user().email_verified_at) {
			die(() => {
				if (request.expectsHtml()) {
					return Redirect.to(this.redirectToRoute)
				}

				throw new Error("Email is not verified")
			})
		}

		return request
	}
}
