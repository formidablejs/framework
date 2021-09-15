import FormRequest from '../../../Http/Request/FormRequest'

export default class VerifyEmailRequest < FormRequest

	def authorize
		true

	def rules
		{
			# Validation rules
		}

	def persist
		await self.authDriver.verifyEmail!
