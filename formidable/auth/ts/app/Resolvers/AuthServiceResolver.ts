import { AuthService as Auth } from '@formidablejs/framework'
import { Request } from '@formidablejs/framework'
import { Redirect } from '@formidablejs/framework'
import { ServiceResolver } from '@formidablejs/framework'

export class AuthServiceResolver extends ServiceResolver {
	boot(): AuthServiceResolver {
		Auth.onAuthenticated((request: Request) => {
			if (request.expectsHtml()) {
				return Redirect.route('welcome')
			}
		})

		Auth.onRegistered((request: Request) => {
			if (request.expectsHtml()) {
				return Redirect.route('welcome')
			}
		})

		Auth.onSessionDestroyed((request: Request) => {
			if (request.expectsHtml()) {
				return Redirect.route('welcome')
			}
		})

		Auth.onRequestForgotPasswordUrl((request: Request) => {
			if (request.expectsHtml()) {
				return Redirect.back().with('success', 'Password reset instructions have been sent to your email')
			}
		})

		Auth.onUpdatePassword((request: Request) => {
			if (request.expectsHtml()) {
				return Redirect.back().with('success', 'You have successfully changed your password')
			}
		})

		Auth.onRequestEmailVerificationUrl((request: Request) => {
			if (request.expectsHtml()) {
				return Redirect.back().with('success', `A new verification link has been sent to ${request.input('email')}`)
			}
		})

		Auth.onEmailVerified((request: Request) => {
			if (request.expectsHtml()) {
				return Redirect.route('welcome')
			}
		})

		return this
	}
}
