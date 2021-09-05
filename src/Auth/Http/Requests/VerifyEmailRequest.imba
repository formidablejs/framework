const FormRequest = require '../../../Http/Request/FormRequest'

module.exports = class VerifyEmailRequest < FormRequest

	def authorize
		true

	def rules
		{
			# Validation rules
		}

	def persist
		await self.authDriver.verifyEmail!
