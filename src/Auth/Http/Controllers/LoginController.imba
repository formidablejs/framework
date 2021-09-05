const LoginRequest = require '../Requests/LoginRequest'
const Controller = require '../../../Http/Controller'
const decorator$use = require '../../../Support/Decorators/use'

const loginAuth = {
	onLogin: null
}

class LoginController < Controller

	@use(LoginRequest)
	def login request\LoginRequest, reply
		const handler = loginAuth.onLogin

		if handler then return handler(request, reply)

		request.persist!

	static def onLogin handler\Function
		if loginAuth.onLogin !== null
			throw new Error 'onLogin handler is already set.'

			return

		loginAuth.onLogin = handler

module.exports = LoginController
