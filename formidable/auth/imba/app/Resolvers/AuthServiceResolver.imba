import { AuthService as Auth } from '@formidablejs/framework'
import { Request } from '@formidablejs/framework'
import { Redirect } from '@formidablejs/framework'
import { ServiceResolver } from '@formidablejs/framework'

export class AuthServiceResolver < ServiceResolver

	def boot
		Auth.onAuthenticated(do(request\Request)
			if request.expectsHtml!
				return Redirect.route('welcome')
		)

		Auth.onRegistered(do(request\Request)
			if request.expectsHtml!
				return Redirect.route('welcome')
		)

		Auth.onSessionDestroyed(do(request\Request)
			if request.expectsHtml!
				return Redirect.route('welcome')
		)

		Auth.onRequestForgotPasswordUrl(do(request\Request)
			if request.expectsHtml!
				return Redirect.back!.with('success', 'Password reset instructions have been send to your email')
		)

		Auth.onUpdatePassword(do(request\Request)
			if request.expectsHtml!
				return Redirect.back!.with('success', 'You have successfully changed your password')
		)

		Auth.onRequestEmailVerificationUrl(do(request\Request)
			if request.expectsHtml!
				return Redirect.back!.with('success', "A new verification link has been sent to {request.input('email')}")
		)

		Auth.onEmailVerified(do(request\Request)
			if request.expectsHtml!
				return Redirect.route('welcome')
		)

		return this
