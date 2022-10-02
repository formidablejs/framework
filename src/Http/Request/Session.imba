import type { FastifyRequest } from 'fastify'
import isArray from '../../Support/Helpers/isArray'
import dotNotation from '../../Support/Helpers/dotNotation'
import isEmpty from '../../Support/Helpers/isEmpty'

export default class Session

	prop #ref\FastifyRequest

	def constructor request\FastifyRequest
		self.#ref = request

		if isEmpty(self.#ref.session)
			self.#ref.session = {}

	def has key\string
		!isEmpty(self.#ref.session[key])

	def get key\string, default\any
		self.#ref.session[key] ?? default

	def pull key\string, default\any
		if self.has(key)
			const value = self.get(key)

			self.forget(key)

			return value

		default

	def set key\string, value\any
		self.#ref.session[key] = value

	def forget key\string|String[]
		if !isArray(key) then key = [key]

		for i in key
			delete self.#ref.session[i]
