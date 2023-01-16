import { EnsureEmailIsVerified as Middleware } from '@formidablejs/framework'

export class EnsureEmailIsVerified < Middleware

	get redirectToRoute\string
		'/email/unverified'
