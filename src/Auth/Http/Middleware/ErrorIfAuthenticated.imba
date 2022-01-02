import { FastifyReply } from 'fastify'
import ForbiddenException from '../../../Http/Exceptions/ForbiddenException'
import FormRequest from '../../../Http/Request/FormRequest'
import isEmpty from '../../../Support/Helpers/isEmpty'
import PersonalAccessToken from '../../Tokens/PersonalAccessToken'
import Request from '../../../Http/Request/Request'

export default class ErrorIfAuthenticated

	def handle request\FormRequest|Request, reply\FastifyReply, params\any[]|null
		if self.isAuthenticated(request)
			const token = await PersonalAccessToken.find( self.getPersonalAccessToken(request) )

			if !isEmpty(token.token) && !isEmpty(token.tokenable)
				return self.onAuthenticated(request, reply, params)

			delete request.request.session.personal_access_token

		request

	def getPersonalAccessToken request\FormRequest|Request
		if request.hasHeader('authorization') then return request.bearerToken!

		request.request.session.personal_access_token

	def isAuthenticated request\FormRequest|Request
		request.hasHeader('authorization') || !isEmpty(request.request.session.personal_access_token)

	def onAuthenticated request\FormRequest|Request, reply\FastifyReply, params\any[]|null
		throw new ForbiddenException 'Action not allowed.'
