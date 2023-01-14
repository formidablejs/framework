import { EnsureEmailIsVerified as Middleware } from '@formidablejs/framework'

export class EnsureEmailIsVerified extends Middleware {
	get redirectToRoute(): string {
		return '/email/unverified'
	}
}
