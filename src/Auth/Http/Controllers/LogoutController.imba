import LogoutRequest from '../Requests/LogoutRequest'
import Controller from '../../../Http/Controller'
import { @use } from '../../../Support/Decorators/use'

const logoutAuth = {
	onLogout: null
}

class LogoutController < Controller

	@use(LogoutRequest)
	def logout request\LogoutRequest, reply
		const handler = logoutAuth.onLogout

		if handler then return handler(request, reply)

		request.persist!

	static def onLogout handler\function
		if logoutAuth.onLogout !== null
			throw new Error 'onLogout handler is already set.'

			return

		logoutAuth.onLogout = handler

export default LogoutController
