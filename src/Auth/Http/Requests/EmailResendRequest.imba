const FormRequest = require '../../../Http/Request/FormRequest'

module.exports = class EmailResendRequest < FormRequest

	def authorize
		true

	def rules
		{
			email: 'required|email'
		}

	def persist
		await self.authDriver.requestEmailVerificationUrl(self.body!)
