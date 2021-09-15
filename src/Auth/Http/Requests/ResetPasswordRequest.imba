import FormRequest from '../../../Http/Request/FormRequest'

export default class ResetPasswordRequest < FormRequest

	def authorize
		true

	def rules
		{
			password: 'required|min:8|confirmed'
			password_confirmation: 'required'
		}

	def persist
		await self.authDriver.updatePassword(self.body!)
