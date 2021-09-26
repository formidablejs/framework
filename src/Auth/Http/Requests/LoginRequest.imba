import type Driver from '../../Drivers/Driver'
import type JwtDriver from '../../Drivers/JwtDriver'
import type SessionDriver from '../../Drivers/SessionDriver'
import FormRequest from '../../../Http/Request/FormRequest'

export default class LoginRequest < FormRequest

	prop authDriver\Driver|SessionDriver|JwtDriver

	def authorize
		true

	def rules
		{
			email: 'required|email'
			password: 'required'
			remember_me: 'boolean'
		}

	def persist
		await self.authDriver.authenticate(self.body!)
