import { FastifyRequest, FastifyReply } from 'fastify'
import Repository from '../../Database/Repository'
import Bind from '../../Database/Bind'
import bind from '../Helpers/bind'
import FormRequest from '../../Http/Request/FormRequest'
import isClass from '../Helpers/isClass'
import isEmpty from '../Helpers/isEmpty'
import isString from '../Helpers/isString'
import die from '../Helpers/die'
import Request from '../../Http/Request/Request'
import ResponseFactory from '../../Http/Response/Response'
import ValidationException from '../../Validator/Exceptions/ValidationException'

def DI target, key, descriptor, paramaters = null
	if isClass target then return

	const value = descriptor.value
	const definition = paramaters ?? this

	const config = {
		reply: null
		request: null
		validator: null
	}

	descriptor.value = do
		const args\Array = []
		const request\Request = arguments[0]
		const reply\FastifyReply = arguments[1]

		const parsed = {
			request: false
			reply: false
		}

		config.request = request

		for own key, object of definition
			let response = null

			if isString(object) && object.substring(0, 'table:'.length) === 'table:'
				response = await bind(object.split(':')[1]).handle(request, key)

			elif isString(object) && object.substring(0, 'query:'.length) === 'query:'
				const query = object.split(':')[1]

				response = request.query(query, undefined) || undefined

			elif isString(object) && object.substring(0, 'param:'.length) === 'param:'
				const param = object.split(':')[1]

				response = request.param(param) || undefined

			elif isString(object) && object === 'param'
				response = Object.values(request.params!)[key] || undefined

			elif object === Number
				const param = Object.values(request.params!)[key] || undefined

				if isNaN(param) then throw new TypeError "Argument {key++} must be of the type Number."

				response = param

			elif object === String
				const param = Object.values(request.params!)[key] || undefined

				if !isNaN(param) then throw new TypeError "Argument {key++} must be of the type String."

				response = param

			elif object instanceof Bind
				response = await object.handle(request, key)

			elif Repository.isPrototypeOf(object)
				const param = Object.values(request.params!)[key] || undefined
				const repo = new object

				const results = await repo.table.where(repo.routeKeyName || 'id', param).first!

				response = results

			elif object == Request
				response = request
				parsed.request = true

			elif object == FormRequest
				response = request
				parsed.request = true

			elif object == FastifyReply
				response = reply
				parsed.reply = true

			elif object == FastifyRequest
				response = request.request
				parsed.request = true

			elif FormRequest.isPrototypeOf(object) || Request.isPrototypeOf(object)
				response = new object(
					request.request,
					request.route,
					reply,
					request.config
				)

				if !isEmpty(request.auth)
					response.auth = request.auth

				if !response.passesAuthorization! then response.failedAuthorization!

				parsed.request = true

				Object.keys(request).map do(key)
					if isEmpty(response[key]) then response[key] = request[key]

				const validator = response.validate!

				await new Promise do(resolve, reject)
					validator.checkAsync
						do resolve!
						do reject(ValidationException.withMessages(validator.errors.errors))

				if response.hasHeader('X-FORMIDABLE-VALIDATE')
					die do new ResponseFactory('', 204)

			else
				response = !!object.prototype && !!object.prototype.constructor.name ? new object : object

			args.push response

		if !parsed.request then args.push request
		if !parsed.reply then args.push reply

		return value.apply(this, args)

	return descriptor


def typescriptDI ...paramaters
	return do(target, key, descriptor)
		DI(target, key, descriptor, paramaters)

exports.DI = DI
exports.use = typescriptDI
exports.@use = DI
