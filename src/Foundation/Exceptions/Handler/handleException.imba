import ConfigRepostory from '../../../Config/Repository'
import HttpException from '../../../Http/Exceptions/HttpException'
import StackTrace from 'stacktrace-js'
import type { FastifyReply } from 'fastify'
import type FormRequest from '../../../Http/Request/FormRequest'
import type Repository from '../../../Config/Repository'
import ValidationException from '../../../Validator/Exceptions/ValidationException'

const settings = {
	config\ConfigRepostory: null
}

def handleException error\Error|ApplicationException|HttpException, request\FormRequest, reply\FastifyReply, returns\Boolean = false
	const statusCode\Number = typeof error.getStatus === 'function' ? error.getStatus! : 500

	const response = {
		message: 'An error has occured.'
		exception: error.name
	}

	if error instanceof ValidationException
		response.message = error.message

	elif settings.config.get('app.debug', false)
		response.message = (error.message !== undefined || error.message !== null) ? error.message : response.message

		const stack = await StackTrace.fromError(error)

		response.file  = stack[0].fileName
		response.line  = stack[0].lineNumber
		response.stack = stack

		console.error error

	elif error instanceof HttpException
		response.message = (error.message !== undefined || error.message !== null) ? error.message : response.message
		delete response.exception

	else
		response.message = 'Internal Server Error'
		delete response.exception

	if returns then return response

	if response.message !== undefined && response.message !== null && response.message.constructor == Object
		return reply.code(statusCode).send(response.message)

	reply.code(statusCode).send(response)

def setConfig config\ConfigRepostory
	if settings.config !== null
		throw new Error 'config repository is already set.'

	settings.config = config

export {
	handleException
	setConfig
}
