import { Redirect, Request, view, ViewResponse } from '@formidablejs/framework'
import { EmailUnverified } from '../../../resources/views/Auth/EmailUnverified'
import { EmailVerification } from '../../../resources/views/Auth/EmailVerification'
import { ForgotPassword } from '../../../resources/views/Auth/ForgotPassword'
import { Login } from '../../../resources/views/Auth/Login'
import { PasswordReset } from '../../../resources/views/Auth/PasswordReset'
import { Register } from '../../../resources/views/Auth/Register'
import { Controller } from './Controller'

export class AuthController < Controller
	# Show login page.
	def login\ViewResponse
		view(Login)

	# Show registration page.
	def register\ViewResponse
		view(Register)

	# Show forgot password page.
	def forgot\ViewResponse
		view(ForgotPassword)

	# Show password reset page.
	def reset\ViewResponse request\Request
		view(PasswordReset, {
			email: request.query('email'),
			token: request.query('token'),
			signature: request.query('signature')
		})

	# Show unverified account page.
	def unverified\Redirect|ViewResponse request\Request
		if request.user!.email_verified_at
			return Redirect.route('welcome')

		view(EmailUnverified, {
			user: request.user()
		})

	# Show verify account page.
	def verify\Redirect|ViewResponse request\Request
		if request.user!.email_verified_at
			return Redirect.route('welcome')

		view(EmailVerification, {
			email: request.user().email,
			signature: request.query('signature')
		})
