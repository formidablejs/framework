import RegisterRequest from '../Requests/RegisterRequest'
import Controller from '../../../Http/Controller'
import { @use } from '../../../Support/Decorators/use'

const registerAuth = {
	onRegister: null
	onRegistered: null
}

class RegisterController < Controller

	@use(RegisterRequest)
	def register request\RegisterRequest, reply
		const handler = registerAuth.onRegister

		if handler then return handler(request, reply)

		request.persist!

	static def onRegister handler\function
		if registerAuth.onRegister !== null
			throw new Error 'onRegister handler is already set.'

			return

		registerAuth.onRegister = handler

export default RegisterController
