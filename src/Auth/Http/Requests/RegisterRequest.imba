import FormRequest from '../../../Http/Request/FormRequest'
import type Driver from '../../Drivers/Driver'
import type JwtDriver from '../../Drivers/JwtDriver'
import type SessionDriver from '../../Drivers/SessionDriver'

export default class RegisterRequest < FormRequest

	prop authDriver\Driver|SessionDriver|JwtDriver

	def authorize
		true

	def rules
		const identifier = this.authDriver.getProvider.identifier ?? 'email'

		let rules = {
			name: 'required'
			email: 'required|email'
			password: 'required|min:8|confirmed'
			password_confirmation: 'required'
		}

		if identifier != 'email'
			rules.username = 'required|alpha_dash|min:3'

		rules

	def persist
		await self.authDriver.register(self.body!)
