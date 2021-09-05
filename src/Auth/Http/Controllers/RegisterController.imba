const RegisterRequest = require '../Requests/RegisterRequest'
const Controller = require '../../../Http/Controller'
const decorator$use = require '../../../Support/Decorators/use'

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

	static def onRegister handler\Function
		if registerAuth.onRegister !== null
			throw new Error 'onRegister handler is already set.'

			return

		registerAuth.onRegister = handler

module.exports = RegisterController
