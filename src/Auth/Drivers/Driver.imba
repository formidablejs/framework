import { Mail } from '@formidablejs/mailer'
import Database from '../../Database/Database'
import DatabaseConfig from '../../Database/Config'
import EmailNotVerifiedException from '../Exceptions/EmailNotVerifiedException'
import EmailVerifiedException from '../Exceptions/EmailVerifiedException'
import Hash from '../../Hashing/Hash'
import isEmpty from '../../Support/Helpers/isEmpty'
import isFunction from '../../Support/Helpers/isFunction'
import now from '../../Support/Helpers/now'
import PersonalAccessToken from '../Tokens/PersonalAccessToken'
import strRandom from '../../Support/Helpers/strRandom'
import URL from '../../Http/URL/URL'
import ValidationException from '../../Validator/Exceptions/ValidationException'
import type { FastifyReply } from 'fastify'
import type { MailHandle, Mailable } from '@formidablejs/mailer'
import type Repository from '../../Config/Repository'
import type Request from '../../Http/Request/Request'

const events = {
	onRegistered: null
	onAuthenticated: null
	onSessionDestroyed: null
	onSuccessfulAttempt: null
	onCreateUser: null
	onEmailVerified: null
	onRequestEmailVerificationUrl: null
	onRequestForgotPasswordUrl: null
	onUpdatePassword: null
	onVerificationMailerEvents: null
	onResetMailerEvents: null
}

const mailers = {
	verificationEmail: null
	resetPasswordMailer: null
}

export default class Driver

	def constructor protocol\string, request\Request, reply\FastifyReply, params\any[]|null, config\Repository
		this.protocol = protocol
		this.request = request
		this.reply = reply
		this.params = params
		this.config = config

	def attempt name\string, user\object, ttl\number|null = null
		const token = await self.createPersonalAccessToken(name, user.id, ttl)

		self.request.request.session.personal_access_token = token

		await self.getPersonalAccessToken(token)

	def getPersonalAccessToken token\string = null
		await PersonalAccessToken.find(!isEmpty(token) ? token : self.request.bearerToken!, self.protocol)

	def usingPersonalAccessToken token\object
		await PersonalAccessToken.using(token)

	def verify
		null

	def authenticate body\object
		null

	def register body\object
		null

	def afterRegistered user\object
		if isFunction(events.onRegistered)
			events.onRegistered(self.request, self.reply, user, self.protocol, self.params)

	def afterAuthenticated user\object
		if isFunction(events.onAuthenticated)
			events.onAuthenticated(self.request, self.reply, user, self.protocol, self.params)

	def afterSessionDestroyed
		if isFunction(events.onSessionDestroyed)
			events.onSessionDestroyed(self.request, self.reply, self.protocol, self.params)

	def afterEmailVerified verified\boolean
		if isFunction(events.onEmailVerified)
			events.onEmailVerified(self.request, self.reply, verified, self.protocol, self.params)

	def afterRequestEmailVerificationUrl
		if isFunction(events.onRequestEmailVerificationUrl)
			events.onRequestEmailVerificationUrl(self.request, self.reply, self.protocol, self.params)

	def afterRequestForgotPasswordUrl
		if isFunction(events.onRequestForgotPasswordUrl)
			events.onRequestForgotPasswordUrl(self.request, self.reply, self.protocol, self.params)

	def afterUpdatePassword
		if isFunction(events.onUpdatePassword)
			events.onUpdatePassword(self.request, self.reply, self.protocol, self.params)

	def onSuccessfulAuthAttemptEvent
		events.onSuccessfulAttempt

	def getVerificationMailer
		mailers.verificationEmail

	def getVerificationMailerEvents
		events.onVerificationMailerEvents

	def sendVerificationEmail user\object
		if self.getVerificationMailer!
			self.request.verificationUrl = await self.verificationUrl(user)

			const events = self.getVerificationMailerEvents!

			Mail.to(user.email).send(new (self.getVerificationMailer!)(self.request, user), {
				onSuccess: do(response)
					events.onSuccess(response, user, self.request) if events && events.onSuccess
				onError: do(reason)
					if events && events.onError
						events.onError(reason, user, self.request)
					else
						throw reason
				onComplete: do
					events.onComplete(user, self.request) if events && events.onComplete
			})

	def getResetPasswordMailer
		mailers.resetPasswordMailer

	def getResetMailerEvents
		events.onResetMailerEvents

	def sendResetPasswordEmail user\object, token\string
		if self.getResetPasswordMailer!
			self.request.passwordResetUrl = await self.passwordResetUrl(user, token)

			const events = self.getResetMailerEvents!

			Mail.to(user.email).send(new (self.getResetPasswordMailer!)(self.request, user), {
				onSuccess: do(response)
					events.onSuccess(response, user, self.request) if events && events.onSuccess
				onError: do(reason)
					if events && events.onError
						events.onError(reason, user, self.request)
					else
						throw reason
				onComplete: do
					events.onComplete(user, self.request) if events && events.onComplete
			})

	def verifyEmail
		const email = self.request.query 'email'

		if !email then throw new Error('Email is required.')

		const response = await Database.table(self.getProvider.table)
			.where('email', email)
			.whereNull('email_verified_at')
			.update('email_verified_at', now!)

		if response == null || response == undefined || response == 0
			const results = await self.afterEmailVerified(false)

			throw new EmailNotVerifiedException 'Could not verify email.' if isEmpty(results)

			return results

		const results = await self.afterEmailVerified(true)

		return isEmpty(results) ? { status: 'success' } : results

	def requestEmailVerificationUrl body\object = new Object
		const user = await self.findUser body

		if user
			if user.email_verified_at
				throw new EmailVerifiedException 'Email is already verified.'

			self.sendVerificationEmail user

		const results = await self.afterRequestEmailVerificationUrl!

		# we will always return success even if the email was not sent
		# to prevent attackers from knowing if the email was sent or not.
		return isEmpty(results) ? { status: 'success' } : results

	def requestForgotPasswordUrl body\object = new Object
		const user = await self.findUser body

		if user && !user.email_verified_at
			throw new EmailNotVerifiedException 'Email is not verified.'

		if user
			await Database.table('password_resets')
				.where('email', user.email)
				.delete!

			const token = strRandom 60

			const results = await Database.table('password_resets')
				.insert({
					email: user.email
					token: token
				})

			if !results
				throw new Error 'Could not create password reset token.'

			self.sendResetPasswordEmail user, token

		const results = await self.afterRequestForgotPasswordUrl!

		return isEmpty(results) ? { status: 'success' } : results

	def updatePassword body\object = new Object
		# get email and token from url.
		const email = self.request.query 'email'
		const token = self.request.query 'token'

		# get token request/record from database.
		const tokenRequest = await Database.table('password_resets')
			.join(self.getProvider.table, 'password_resets.email', '=', "{self.getProvider.table}.email")
			.where('password_resets.token', token)
			.where('password_resets.email', email)
			.select(
				'users.id',
				'users.password',
			)
			.first!

		# if token request is not found, return error.
		if !tokenRequest
			throw new Error 'Invalid password reset token.'

		# if token request is found, compare new password with old password
		# and return error if they are the same.
		if await Hash.check(body.password, tokenRequest.password)
			throw ValidationException.withMessages({
				password: [
					'Password cannot be the same as the old one.'
				]
			})

		# if new password is different from old password, update password.
		const updatedPassword = await Database.table(self.getProvider.table)
			.where('id', tokenRequest.id)
			.update({
				password: await Hash.make(body.password)
			})

		# if password is not updated, return error.
		if !updatedPassword
			throw new Error 'Could not update password.'

		# if password is updated, delete token request.
		await Database.table('password_resets')
			.where('email', email)
			.delete!

		const results = await self.afterUpdatePassword!

		return isEmpty(results) ? { status: 'success' } : results

	def logout body\object = new Object
		self

	def destroy token\string = null, body\object = new Object
		await PersonalAccessToken.destroy(!isEmpty(token) ? token : self.request.bearerToken!)

	def createPersonalAccessToken name\string, id\number, ttl\number|null = null
		await PersonalAccessToken.create(name, id, self.getProvider.table, ['*'], ttl, {
			protocol: self.protocol
			ip_address: self.request.ip! || null
			user_agent: self.request.header('user-agent', null)
		})

	get getProvider
		const protocol = self.config.get("auth.protocols.{self.protocol}")

		self.config.get("auth.providers.{protocol.provider}")

	def insertUser body\object
		let user = await self.findUser(body)

		if user !== undefined
			throw ValidationException.withMessages({
				email : [
					"The email is already taken."
				]
			})

		await this.createUser(body)

	def createUser body\object
		if events.onCreateUser !== null
			return events.onCreateUser(
				self.request,
				body,
				self.getProvider.table
			)

		const db = self.config.get('database')

		Database.table(self.getProvider.table)
			.insert({
				name: body.name,
				email: body.email,
				password: await Hash.make(body.password)
			}, db.connections[db.default].driver == 'pg' ? ['id'] : null)
			.then do([ user\object|Number ])
				user = (typeof user === 'object' && user.hasOwnProperty('id')) ? user.id : user

				return await Database.table(self.getProvider.table)
					.where('id', user)
					.first!

	def findUser body\object
		return await Database.table(self.getProvider.table)
			.where('email', body.email)
			.first!

	def verificationUrl user\object
		const clientUrl = self.config.get('app.client_url', self.config.get('app.url'))

		const signature = await URL.temporarySignedRoute('email.verify','2h', {
			email: user.email
		})

		clientUrl + signature

	def passwordResetUrl user\object, token\string
		const clientUrl = self.config.get('app.client_url', self.config.get('app.url'))

		const signature = await URL.temporarySignedRoute('password.reset', '15m', {
			email: user.email,
			token: token
		})

		clientUrl + signature

	static def onEmailVerified handler\function
		if events.onEmailVerified !== null
			throw new Error 'onEmailVerified handler is already set.'

			return

		events.onEmailVerified = handler

	static def onCreateUser handler\function
		if events.onCreateUser !== null
			throw new Error 'onCreateUser handler is already set.'

			return

		events.onCreateUser = handler

	static def onRegistered handler\function
		if events.onRegistered !== null
			throw new Error 'onRegistered handler is already set.'

			return

		events.onRegistered = handler

	static def onAuthenticated handler\function
		if events.onAuthenticated !== null
			throw new Error 'onAuthenticated handler is already set.'

			return

		events.onAuthenticated = handler

	static def onSessionDestroyed handler\function
		if events.onSessionDestroyed !== null
			throw new Error 'onSessionDestroyed handler is already set.'

			return

		events.onSessionDestroyed = handler

	static def onSuccessfulAttempt handler\function
		if events.onSuccessfulAttempt !== null
			throw new Error 'onSuccessfulAttempt handler is already set.'

			return

		events.onSuccessfulAttempt = handler

	static def onRequestEmailVerificationUrl handler\function
		if events.onRequestEmailVerificationUrl !== null
			throw new Error 'onRequestEmailVerificationUrl handler is already set.'

			return

		events.onRequestEmailVerificationUrl = handler

	static def onRequestForgotPasswordUrl handler\function
		if events.onRequestForgotPasswordUrl !== null
			throw new Error 'onRequestForgotPasswordUrl handler is already set.'

			return

		events.onRequestForgotPasswordUrl = handler

	static def onUpdatePassword handler\function
		if events.onUpdatePassword !== null
			throw new Error 'onUpdatePassword handler is already set.'

			return

		events.onUpdatePassword = handler

	static def verificationMailer mailer\Mailable
		if mailers.verificationEmail
			throw new Error 'Verification mailer already set'

		mailers.verificationEmail = mailer

	static def resetPasswordMailer mailer\Mailable
		if mailers.resetPasswordMailer
			throw new Error 'Reset password mailer already set'

		mailers.resetPasswordMailer = mailer

	static def verificationMailerEvents mailEvents\MailHandle
		if events.onVerificationMailerEvents
			throw new Error 'Verification Mailer events already set'

		events.onVerificationMailerEvents = mailEvents

	static def resetMailerEvents mailEvents\MailHandle
		if events.onResetMailerEvents
			throw new Error 'Reset Mailer events already set'

		events.onResetMailerEvents = mailEvents
