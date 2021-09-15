import ForbiddenException from '../../../Http/Exceptions/ForbiddenException'

export default class ErrorIfAuthenticated

	def handle request, reply, params
		if self.isAuthenticated(request) then return self.onAuthenticated(request, reply, params)

		request

	def isAuthenticated request
		request.hasHeader('authorization') || request.request.session.personal_access_token !== undefined

	def onAuthenticated request, reply, params
		throw new ForbiddenException 'Action not allowed.'
