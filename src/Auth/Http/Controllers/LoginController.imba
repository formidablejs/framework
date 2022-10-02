import LoginRequest from '../Requests/LoginRequest'
import Controller from '../../../Http/Controller'
import { @use } from '../../../Support/Decorators/use'

const loginAuth = {
	onLogin: null
}

class LoginController < Controller

	@use(LoginRequest)
	def login request\LoginRequest, reply
		const handler = loginAuth.onLogin

		if handler then return handler(request, reply)

		request.persist!

	static def onLogin handler\function
		if loginAuth.onLogin !== null
			throw new Error 'onLogin handler is already set.'

			return

		loginAuth.onLogin = handler

export default LoginController
