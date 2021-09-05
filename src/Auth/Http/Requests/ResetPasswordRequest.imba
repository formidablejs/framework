const FormRequest = require '../../../Http/Request/FormRequest'

module.exports = class ResetPasswordRequest < FormRequest

	def authorize
		true

	def rules
		{
			password: 'required|min:8|confirmed'
			password_confirmation: 'required'
		}

	def persist
		await self.authDriver.updatePassword(self.body!)
