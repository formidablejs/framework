import { handleException, setConfig } from './Handler/handleException'
import type { FastifyReply } from 'fastify'
import type ApplicationException from './ApplicationException'
import type FormRequest from '../../Http/Request/FormRequest'
import type HttpException from '../../Http/Exceptions/HttpException'
import type Repository from '../../Config/Repository'

export default class Handler

	prop config\Repository

	get dontReport
		[

		]

	def constructor config\Repository
		self.config = config

		setConfig(this.config)

	def handle error\Error|ApplicationException|HttpException, request\FormRequest, reply\FastifyReply
		handleException(error, request, reply)
