import { FastifyRequest, FastifyReply } from 'fastify'
import Model from '../../Database/Model'
import FormRequest from '../../Http/Request/FormRequest'
import ValidationException from '../../Validator/Exceptions/ValidationException'
import isClass from '../Helpers/isClass'

export def @use target, key, descriptor
	if isClass target
		return

	const value = descriptor.value

	const definition = this

	const config = {
		reply: null
		request: null
		validator: null
	}

	descriptor.value = do
		const args = []

		const request = arguments[0]
		const reply = arguments[1]

		config.request = request

		await definition.forEach do(object, key)
			let response = null

			if Model.isPrototypeOf(object)
				const param  = Object.keys(request.request.params)[key]
				const value  = Object.values(request.request.params)[key]
				const column = param.split(':')[1] ?? (object.routeKeyName ?? 'id')

				response = new object({ [column]: value }).fetch!

			elif object == FormRequest
				response = request

			elif object == FastifyReply
				response = reply

			elif object == FastifyRequest
				response = request.request

			elif (FormRequest.isPrototypeOf(object))
				response = new object(
					request.request,
					request.route,
					reply.raw,
					request.configRepository
				)

				if !response.passesAuthorization! then response.failedAuthorization!

				Object.keys(request).map do(key) response[key] = request[key]

				const validator = response.validate!

				if (validator.fails!)
					throw ValidationException.withMessages(validator.errors.errors)

			else
				response = !!object.prototype && !!object.prototype.constructor.name ? new object : object

			args.push response

		return value.apply(this, args)

	return descriptor
