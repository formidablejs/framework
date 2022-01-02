import type { FastifyRequest } from 'fastify'
import isArray from '../../Support/Helpers/isArray'
import dotNotation from '../../Support/Helpers/dotNotation'
import isEmpty from '../../Support/Helpers/isEmpty'

export default class Cookies

	prop #ref\FastifyRequest

	def constructor request\FastifyRequest
		self.#ref = request

		if isEmpty(self.#ref.cookies)
			self.#ref.cookies = {}

	def has key\String
		!isEmpty(self.#ref.cookies[key])

	def get key\String, default\any
		self.#ref.cookies[key] ?? default

	def pull key\String, default\any
		if self.has(key)
			const value = self.get(key)

			self.forget(key)

			return value

		default

	def set key\String, value\any
		self.#ref.cookies[key] = value

	def forget key\String|String[]
		if !isArray(key) then key = [key]

		for i in key
			delete self.#ref.cookies[i]
