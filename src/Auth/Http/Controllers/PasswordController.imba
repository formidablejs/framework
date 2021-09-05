const ForgotPasswordRequest = require '../Requests/ForgotPasswordRequest'
const ResetPasswordRequest = require '../Requests/ResetPasswordRequest'
const Controller = require '../../../Http/Controller'
const decorator$use = require '../../../Support/Decorators/use'

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

	static def onForgot handler\Function
		if password.onForgot !== null
			throw new Error 'onForgot handler is already set.'

			return

		password.onForgot = handler

	static def onReset handler\Function
		if password.onReset !== null
			throw new Error 'onReset handler is already set.'

			return

		password.onReset = handler

module.exports = PasswordController
