const LogoutRequest = require '../Requests/LogoutRequest'
const Controller = require '../../../Http/Controller'
const decorator$use = require '../../../Support/Decorators/use'

const logoutAuth = {
	onLogout: null
}

class LogoutController < Controller

	@use(LogoutRequest)
	def logout request\LogoutRequest, reply
		const handler = logoutAuth.onLogout

		if handler then return handler(request, reply)

		request.persist!

	static def onLogout handler\Function
		if logoutAuth.onLogout !== null
			throw new Error 'onLogout handler is already set.'

			return

		logoutAuth.onLogout = handler

module.exports = LogoutController
