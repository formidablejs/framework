const FormRequest = require '../../../Http/Request/FormRequest'

module.exports = class ForgotPasswordRequest < FormRequest

	def authorize
		true

	def rules
		{
			email: 'required|email'
		}

	def persist
		await self.authDriver.requestForgotPasswordUrl(self.body!)
