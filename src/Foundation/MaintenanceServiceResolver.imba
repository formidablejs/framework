import decrypt from '../Support/Helpers/decrypt'
import encrypt from '../Support/Helpers/encrypt'
import FormRequest from '../Http/Request/FormRequest'
import fs from 'fs'
import isEmpty from '../Support/Helpers/isEmpty'
import MaintenanceModeException from './Exceptions/MaintenanceModeException'
import path from 'path'
import ServiceResolver from '../Support/ServiceResolver'
import slug from '../Support/Helpers/slug'
import type { FastifyRequest, FastifyReply } from 'fastify'
import type Application from './Application'

export default class MaintenanceServiceResolver < ServiceResolver

	get cookieName
		slug(self.app.config.get('app.name'), '_') + '_maintenance'

	def getDown
		const maintenanceFile = path.join process.cwd!, 'storage', 'framework', 'down.json'

		const isDown = fs.existsSync(maintenanceFile)

		if isEmpty(isDown) then return false

		const down\Object = JSON.parse(fs.readFileSync(maintenanceFile, 'utf8'))

		const message\String = (!isEmpty(down) && !isEmpty(down.message)) ? down.message : 'Service Unavailable'
		const statusCode\Number = (!isEmpty(down) && !isEmpty(down.statusCode)) ? down.statusCode : 503
		const secret\String = (!isEmpty(down) && !isEmpty(down.secret)) ? down.secret : null
		const redirect\String = (!isEmpty(down) && !isEmpty(down.redirect)) ? down.redirect : null
		const retry\Number = (!isEmpty(down) && !isEmpty(down.retry)) ? Number(down.retry) : null
		const refresh\Number = (!isEmpty(down) && !isEmpty(down.refresh)) ? Number(down.refresh) : null

		return {
			message
			statusCode
			secret
			redirect
			retry
			refresh
		}

	def boot
		self.app.addHook 'onRequest', do(req\FastifyRequest, reply\FastifyReply, done\Function)
			const down\Object = self.getDown!

			if isEmpty(down) then return done!

			const request = new FormRequest req, {}, reply, self.app.config

			if !isEmpty(down.redirect)
				if self.isFile(request) || request.isUrl(down.redirect) then return done!

				return reply.redirect down.redirect

			const { secret } = down

			if !isEmpty(secret)
				if !isEmpty(self.hasBypassMaintenanceModeCookie(secret, request))
					return done!

				const urlSecret = request.urlWithoutQuery!.split('/').slice(-1).pop()

				if urlSecret === secret
					const splitUrl = request.urlWithoutQuery!.split('/')

					splitUrl.pop!

					const redirectUrl = splitUrl.join('/')

					self.setBypassMaintenanceModeCookie secret, request

					if !isEmpty(down.retry)
						reply.header('Retry-After', down.retry)

					if !isEmpty(down.refresh)
						reply.header('Refresh', down.refresh)

					reply.redirect(redirectUrl || '/')

					return done!

			throw new MaintenanceModeException down.message, down.statusCode

		self

	def hasBypassMaintenanceModeCookie secret\String, request\FormRequest

		const cookie\String|null = request.request.cookies[self.cookieName]

		try
			if !isEmpty(cookie) && decrypt(cookie) == secret
				return true

		false

	def setBypassMaintenanceModeCookie secret, request\FormRequest
		const session = self.app.config.get('session')

		request.reply.setCookie self.cookieName, encrypt(secret), {
			domain: session.domain
			httpOnly: session.http_only
			maxAge: session.lifetime
			path: session.path
			sameSite: session.same_site
			secure: session.secure
		}

	def isFile request\FormRequest
		const publicPath = path.join(process.cwd!, 'public', request.urlWithoutQuery!)
		const formidablePath = path.join(process.cwd!, '.formidable', 'public', request.urlWithoutQuery!)

		if fs.existsSync(publicPath) && fs.statSync(publicPath).isFile! then return true

		if fs.existsSync(formidablePath) && fs.statSync(formidablePath).isFile! then return true

		false
