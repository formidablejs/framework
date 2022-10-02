import ForgotPasswordRequest from '../Requests/ForgotPasswordRequest'
import ResetPasswordRequest from '../Requests/ResetPasswordRequest'
import Controller from '../../../Http/Controller'
import { @use } from '../../../Support/Decorators/use'

const password = {
	onForgot: null
	onReset: null
}

class PasswordController < Controller

	@use(ForgotPasswordRequest)
	def forgot request\ForgotPasswordRequest, reply
		const handler = password.onForgot

		if handler then return handler(request, reply)

		request.persist!

	@use(ResetPasswordRequest)
	def reset request\ResetPasswordRequest, reply
		const handler = password.onReset

		if handler then return handler(request, reply)

		request.persist!

	static def onForgot handler\function
		if password.onForgot !== null
			throw new Error 'onForgot handler is already set.'

			return

		password.onForgot = handler

	static def onReset handler\function
		if password.onReset !== null
			throw new Error 'onReset handler is already set.'

			return

		password.onReset = handler

export default PasswordController
