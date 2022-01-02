import { isEmpty } from '../../Support/Helpers'
import HttpException from '../Exceptions/HttpException'
import JsonResponse from '../Response/JsonResponse'
import NotFoundException from '../Exceptions/NotFoundException'
import Redirect from '../Redirect/Redirect'
import Request from '../Request/Request'
import Response from '../Response/Response'
import StackTrace from 'stacktrace-js'
import ValidationException from '../../Validator/Exceptions/ValidationException'
import ViewResponse from '../Response/ViewResponse'
import type { FastifyReply } from 'fastify'

const config = { resolvers: [] }

export default class ExitMiddleware
	prop response

	def constructor response
		self.response = response

	static def register resolver
		config.resolvers.push resolver

		self

	static def make response
		new self(response)

	def handleRegistered request\Request, reply\FastifyReply
		for resolver of config.resolvers
			const results = resolver(self.response, request, reply)

			if !isEmpty(results) then return results

	def handle request\Request, reply\FastifyReply
		const customResponse = self.handleRegistered(request, reply)

		if !isEmpty(customResponse)
			return customResponse
		elif self.response instanceof Redirect
			return response.handle(request, reply)
		elif response Response
			return response.handle(reply)
		elif response instanceof JsonResponse
			return response.toJson(reply)
		elif response instanceof ViewResponse
			return response.toView(request, reply)
		elif response === undefined
			return null
		else
			response

	def errorHandler request\Request, reply\FastifyReply, returns\Boolean = false, shouldReport\Boolean = true
		const customResponse = self.handleRegistered(request, reply)

		if !isEmpty(customResponse) then return customResponse

		const response\Object = {
			message: 'An error has occured.'
			exception: self.response.name
		}

		if self.response instanceof ValidationException
			response.message = self.response.message
		elif self.response instanceof HttpException || request.config.get('app.debug', false)
			response.message = (self.response.message !== undefined || self.response.message !== null) ? self.response.message : response.message

			if self.response instanceof HttpException
				delete response.exception
			else
				const stack = await StackTrace.fromError(self.response)

				response.file\String = stack[0].fileName
				response.line\Number = stack[0].lineNumber
				response.stack\Array = stack

				if shouldReport then console.error self.response
		else
			response.message = 'Internal Server Error'

			delete response.exception

		if returns then return response

		const statusCode\Number = typeof self.response.getStatus === 'function' ? self.response.getStatus! : 500

		if response.message !== undefined && response.message !== null && response.message.constructor == Object
			return reply.code(statusCode)
				.send(response.message)

		reply.code(statusCode).send(response)

	def maintenanceModeHandler request\Request, reply\FastifyReply, hooks\Array
		for own hook, registeredHooks of hooks
			for hookHandler in registeredHooks
				if hook == 'onMaintenance' then hookHandler(self.response, request, reply)

		reply.code(self.response.getStatus!).send({ message: self.response.response })

	static def notFoundHandler request\Request
		new NotFoundException "Route {request.method!}:{request.url!} not found."
