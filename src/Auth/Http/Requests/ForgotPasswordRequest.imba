import FormRequest from '../../../Http/Request/FormRequest'

export default class ForgotPasswordRequest < FormRequest

	def authorize
		true

	def rules
		{
			email: 'required|email'
		}

	def persist
		await self.authDriver.requestForgotPasswordUrl(self.body!)
