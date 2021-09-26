import { FastifyReply } from 'fastify'
import ForbiddenException from '../../../Http/Exceptions/ForbiddenException'
import FormRequest from '../../../Http/Request/FormRequest'
import isEmpty from '../../../Support/Helpers/isEmpty'
import PersonalAccessToken from '../../Tokens/PersonalAccessToken'

export default class ErrorIfAuthenticated

	def handle request\FormRequest, reply\FastifyReply, params\any[]|null
		if self.isAuthenticated(request)
			const token = await PersonalAccessToken.find(request.request.session.personal_access_token)

			if !isEmpty(token.token) || !isEmpty(token.tokenable)
				delete request.request.session.personal_access_token

				return self.onAuthenticated(request, reply, params)

		request

	def isAuthenticated request\FormRequest
		request.hasHeader('authorization') || !isEmpty(request.request.session.personal_access_token)

	def onAuthenticated request\FormRequest, reply\FastifyReply, params\any[]|null
		throw new ForbiddenException 'Action not allowed.'
