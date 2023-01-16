import { Redirect, Request, view, ViewResponse } from '@formidablejs/framework'
import { EmailUnverified } from '../../../resources/views/Auth/EmailUnverified.imba'
import { EmailVerification } from '../../../resources/views/Auth/EmailVerification.imba'
import { ForgotPassword } from '../../../resources/views/Auth/ForgotPassword.imba'
import { Login } from '../../../resources/views/Auth/Login'
import { PasswordReset } from '../../../resources/views/Auth/PasswordReset.imba'
import { Register } from '../../../resources/views/Auth/Register.imba'
import { Controller } from './Controller'

export class AuthController extends Controller {
	/**
	 * Show login page.
	 */
	login(): ViewResponse {
		return view(Login)
	}

	/**
	 * Show registration page.
	 */
	register(): ViewResponse {
		return view(Register)
	}

	/**
	 * Show forgot password page.
	 */
	forgot(): ViewResponse {
		return view(ForgotPassword)
	}

	/**
	 * Show password reset page.
	 */
	reset(request: Request): ViewResponse {
		return view(PasswordReset, {
			email: request.query('email'),
			token: request.query('token'),
			signature: request.query('signature')
		})
	}

	/**
	 * Show unverified account page.
	 */
	unverified(request: Request): Redirect | ViewResponse {
		if (request.user().email_verified_at) {
			return Redirect.route('welcome')
		}

		return view(EmailUnverified, {
			user: request.user()
		})
	}

	/**
	 * Show verify account page.
	 */
	verify(request: Request): Redirect | ViewResponse {
		if (request.user().email_verified_at) {
			return Redirect.route('welcome')
		}

		return view(EmailVerification, {
			email: request.user().email,
			signature: request.query('signature')
		})
	}
}
