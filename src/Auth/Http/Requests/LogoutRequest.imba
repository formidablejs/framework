import FormRequest from '../../../Http/Request/FormRequest'

export default class LogoutRequest < FormRequest

	def authorize
		true

	def rules
		{
			# nothing to validate
		}

	def persist
		await self.authDriver.logout(self.body!)
