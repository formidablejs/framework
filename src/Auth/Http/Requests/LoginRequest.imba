const FormRequest = require '../../../Http/Request/FormRequest'

module.exports = class LoginRequest < FormRequest

	def authorize
		true

	def rules
		{
			email: 'required|email'
			password: 'required'
		}

	def persist
		await self.authDriver.authenticate(self.body!)
