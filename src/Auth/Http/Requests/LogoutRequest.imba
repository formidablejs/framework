const FormRequest = require '../../../Http/Request/FormRequest'

module.exports = class LogoutRequest < FormRequest

	def authorize
		true

	def rules
		{
			# nothing to validate
		}

	def persist
		await self.authDriver.logout(self.body!)
