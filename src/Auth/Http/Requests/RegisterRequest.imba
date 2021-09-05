const FormRequest = require '../../../Http/Request/FormRequest'

module.exports = class RegisterRequest < FormRequest

	def authorize
		true

	def rules
		{
			name: 'required'
			email: 'required|email'
			password: 'required|min:8|confirmed'
			password_confirmation: 'required'
		}

	def persist
		await self.authDriver.register(self.body!)
