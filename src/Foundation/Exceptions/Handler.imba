import isArray from '../../Support/Helpers/isArray'
import isEmpty from '../../Support/Helpers/isEmpty'
import HttpException from '../../Http/Exceptions/HttpException'
import { handleException, setConfig } from './Handler/handleException'
import type { FastifyReply } from 'fastify'
import type ApplicationException from './ApplicationException'
import type FormRequest from '../../Http/Request/FormRequest'
import type Repository from '../../Config/Repository'

export default class Handler

	prop config\Repository

	get dontReport
		[
			HttpException
		]

	def constructor config\Repository
		self.config = config

		setConfig(this.config)

	def handle error\Error|ApplicationException|HttpException, request\FormRequest, reply\FastifyReply
		handleException(error, request, reply, false, self.shouldReport(error))

	def shouldReport error\Error
		if !isEmpty(self.dontReport) && isArray(self.dontReport)
			for exception in dontReport
				if error instanceof exception then return false

		true
