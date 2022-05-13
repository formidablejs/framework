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
import type { Mailable } from '@formidablejs/mailer'
import type Repository from '../../Config/Repository'
import type Request from '../../Http/Request/Request'

const events = {
	onRegistered: null
	onAuthenticated: null
	onSessionDestroyed: null
	onSuccessfulAttempt: null
	onCreateUser: null
	onEmailVerified: null
}

const mailers = {
	verificationEmail: null
	resetPasswordMailer: null
}

export default class Driver

	def constructor protocol\String, request\Request, reply\FastifyReply, params\any[]|null, config\Repository
		this.protocol = protocol
		this.request = request
		this.reply = reply
		this.params = params
		this.config = config

	def attempt name\String, user\Object, ttl\Number|null = null
		const token = await self.createPersonalAccessToken(name, user.id, ttl)

		self.request.request.session.personal_access_token = token

		await self.getPersonalAccessToken(token)

	def getPersonalAccessToken token\String = null
		await PersonalAccessToken.find(!isEmpty(token) ? token : self.request.bearerToken!, self.protocol)

	def usingPersonalAccessToken token\Object
		await PersonalAccessToken.using(token)

	def verify
		null

	def authenticate body\Object
		null

	def register body\Object
		null

	def afterRegistered user\Object
		if isFunction(events.onRegistered)
			events.onRegistered(self.request, self.reply, user, self.protocol, self.params)

	def afterAuthenticated user\Object
		if isFunction(events.onAuthenticated)
			events.onAuthenticated(self.request, self.reply, user, self.protocol, self.params)

	def afterSessionDestroyed
		if isFunction(events.onSessionDestroyed)
			events.onSessionDestroyed(self.request, self.reply, self.protocol, self.params)

	def afterEmailVerified user\Object
		if isFunction(events.onEmailVerified)
			events.onEmailVerified(self.request, self.reply, user, self.protocol, self.params)

	def onSuccessfulAuthAttemptEvent
		events.onSuccessfulAttempt

	def getVerificationMailer
		mailers.verificationEmail

	def sendVerificationEmail user\Object
		if self.getVerificationMailer!
			self.request.verificationUrl = await self.verificationUrl(user)

			Mail.to(user.email).send(new (self.getVerificationMailer!)(self.request, user))

	def getResetPasswordMailer
		mailers.resetPasswordMailer

	def sendResetPasswordEmail user\Object, token\String
		if self.getResetPasswordMailer!
			self.request.passwordResetUrl = await self.passwordResetUrl(user, token)

			Mail.to(user.email).send(new (self.getResetPasswordMailer!)(self.request, user))

	def verifyEmail
		const email = self.request.query 'email'

		if !email then throw new Error('Email is required.')

		const response = await Database.table(self.getProvider.table)
			.where('email', email)
			.whereNull('email_verified_at')
			.update('email_verified_at', now!)

		if response == null || response == undefined || response == 0
			throw new Error 'Could not verify email.'

		const results = await self.afterEmailVerified response

		return isEmpty(results) ? { status: 'success' } : results

	def requestEmailVerificationUrl body\Object = new Object
		const user = await self.findUser body

		if user
			if user.email_verified_at
				throw new EmailVerifiedException 'Email is already verified.'

			self.sendVerificationEmail user

		# we will always return success even if the email was not sent
		# to prevent attackers from knowing if the email was sent or not.
		return { status: 'success' }

	def requestForgotPasswordUrl body\Object = new Object
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

		return { status: 'success' }

	def updatePassword body\Object = new Object
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

		# return success.
		return { status: 'success' }

	def logout body\Object = new Object
		self

	def destroy token\String = null, body\Object = new Object
		await PersonalAccessToken.destroy(!isEmpty(token) ? token : self.request.bearerToken!)

	def createPersonalAccessToken name\String, id\Number, ttl\Number|null = null
		await PersonalAccessToken.create(name, id, self.getProvider.table, ['*'], ttl, {
			protocol: self.protocol
			ip_address: self.request.ip! || null
			user_agent: self.request.header('user-agent', null)
		})

	get getProvider
		const protocol = self.config.get("auth.protocols.{self.protocol}")

		self.config.get("auth.providers.{protocol.provider}")

	def insertUser body\Object
		let user = await self.findUser(body)

		if user !== undefined
			throw ValidationException.withMessages({
				email : [
					"The email is already taken."
				]
			})

		await this.createUser(body)

	def createUser body\Object
		if events.onCreateUser !== null
			return events.onCreateUser(
				self.request,
				body,
				self.getProvider.table
			)

		Database.table(self.getProvider.table)
			.insert({
				name: body.name,
				email: body.email,
				password: await Hash.make(body.password)
			}, DatabaseConfig.client == 'pg' ? ['id'] : null)
			.then do([ user\Object|Number ])
				user = (typeof user === 'object' && user.hasOwnProperty('id')) ? user.id : user

				return await Database.table(self.getProvider.table)
					.where('id', user)
					.first!

	def findUser body\Object
		return await Database.table(self.getProvider.table)
			.where('email', body.email)
			.first!

	def verificationUrl user\Object
		const clientUrl = self.config.get('app.client_url', self.config.get('app.url'))

		const signature = await URL.temporarySignedRoute('email.verify','2h',null,{
			email: user.email
		})

		clientUrl + signature

	def passwordResetUrl user\Object, token\String
		const clientUrl = self.config.get('app.client_url', self.config.get('app.url'))

		const signature = await URL.temporarySignedRoute('password.reset', '15m', null, {
			email: user.email,
			token: token
		})

		clientUrl + signature

	static def onEmailVerified handler\Function
		if events.onEmailVerified !== null
			throw new Error 'onEmailVerified handler is already set.'

			return
		
		events.onEmailVerified = handler

	static def onCreateUser handler\Function
		if events.onCreateUser !== null
			throw new Error 'onCreateUser handler is already set.'

			return
		
		events.onCreateUser = handler

	static def onRegistered handler\Function
		if events.onRegistered !== null
			throw new Error 'onRegistered handler is already set.'

			return

		events.onRegistered = handler

	static def onAuthenticated handler\Function
		if events.onAuthenticated !== null
			throw new Error 'onAuthenticated handler is already set.'

			return

		events.onAuthenticated = handler

	static def onSessionDestroyed handler\Function
		if events.onSessionDestroyed !== null
			throw new Error 'onSessionDestroyed handler is already set.'

			return

		events.onSessionDestroyed = handler

	static def onSuccessfulAttempt handler\Function
		if events.onSuccessfulAttempt !== null
			throw new Error 'onSuccessfulAttempt handler is already set.'

			return

		events.onSuccessfulAttempt = handler

	static def verificationMailer mailer\Mailable
		if mailers.verificationEmail
			throw new Error 'Verification mailer already set'

		mailers.verificationEmail = mailer

	static def resetPasswordMailer mailer\Mailable
		if mailers.resetPasswordMailer
			throw new Error 'Reset password mailer already set'

		mailers.resetPasswordMailer = mailer

