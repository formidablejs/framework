import config from '../../Support/Helpers/config'
import dotNotation from '../../Support/Helpers/dotNotation'
import isArray from '../../Support/Helpers/isArray'
import isEmpty from '../../Support/Helpers/isEmpty'
import type { FastifyReply } from 'fastify'
import type { FastifyRequest } from 'fastify'

export default class Cookies

	prop #ref\FastifyRequest
	prop #reply\FastifyReply

	def constructor request\FastifyRequest, reply\FastifyReply
		self.#ref = request
		self.#reply = reply

		if isEmpty(self.#ref.cookies)
			self.#ref.cookies = {}

	def has key\string
		!isEmpty(self.#ref.cookies[key])

	def get key\string, default\any
		self.#ref.cookies[key] ?? default

	def pull key\string, default\any
		if self.has(key)
			const value = self.get(key)

			self.forget(key)

			return value

		default

	def set key\string, value\string
		const session = config('session')

		self.#reply.setCookie(key, value, {
			domain: session.domain
			httpOnly: session.http_only
			maxAge: session.lifetime
			path: session.path
			sameSite: session.same_site
			secure: session.secure
		})

	def forget key\string|String[]
		if !isArray(key) then key = [key]

		for i in key
			delete self.#ref.cookies[i]
