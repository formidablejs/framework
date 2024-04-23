import type Driver from '../../Drivers/Driver'
import type JwtDriver from '../../Drivers/JwtDriver'
import type SessionDriver from '../../Drivers/SessionDriver'
import FormRequest from '../../../Http/Request/FormRequest'

export default class LoginRequest < FormRequest

	prop authDriver\Driver|SessionDriver|JwtDriver

	def authorize
		true

	def rules
		const identifier = this.authDriver.getProvider.identifier ?? 'email'

		let rules = {
			email: 'required|email'
			password: 'required'
			remember_me: 'boolean'
		}

		if identifier != 'email'
			rules = {
				username: 'required'
				password: 'required'
				remember_me: 'boolean'
			}

		rules

	def persist
		await self.authDriver.authenticate(self.body!)
