import FormRequest from '../../../Http/Request/FormRequest'

export default class LoginRequest < FormRequest

	def authorize
		true

	def rules
		{
			email: 'required|email'
			password: 'required'
		}

	def persist
		await self.authDriver.authenticate(self.body!)
