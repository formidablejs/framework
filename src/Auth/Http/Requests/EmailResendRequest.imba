import FormRequest from '../../../Http/Request/FormRequest'

export default class EmailResendRequest < FormRequest

	def authorize
		true

	def rules
		{
			email: 'required|email'
		}

	def persist
		await self.authDriver.requestEmailVerificationUrl(self.body!)
