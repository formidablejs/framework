import isEmpty from '../Helpers/isEmpty'
import { FastifyRequest, FastifyReply } from 'fastify'
import FormRequest from '../../Http/Request/FormRequest'
import isClass from '../Helpers/isClass'
import Model from '../../Database/Model'
import Request from '../../Http/Request/Request'
import ValidationException from '../../Validator/Exceptions/ValidationException'

export def @use target, key, descriptor
	if isClass target then return

	const value = descriptor.value
	const definition = this

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

		await definition.forEach do(object, key)
			let response = null

			if Model.isPrototypeOf(object)
				const param  = Object.keys(request.request.params)[key]

				if !isEmpty(param)
					const value  = Object.values(request.request.params)[key]
					const column = param.split(':')[1] ?? (object.routeKeyName ?? 'id')

					response = new object({ [column]: value }).fetch!
				else
					response = !!object.prototype && !!object.prototype.constructor.name ? new object : object

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
					reply.raw,
					request.configRepository
				)

				if !isEmpty(request.auth)
					response.auth = request.auth

				if !response.passesAuthorization! then response.failedAuthorization!

				parsed.request = true

				Object.keys(request).map do(key)
					if isEmpty(response[key]) then response[key] = request[key]

				const validator = response.validate!

				if (validator.fails!)
					throw ValidationException.withMessages(validator.errors.errors)

			else
				response = !!object.prototype && !!object.prototype.constructor.name ? new object : object

			args.push response

		if !parsed.request then args.push request
		if !parsed.reply then args.push reply

		return value.apply(this, args)

	return descriptor
