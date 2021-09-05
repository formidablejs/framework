const { isFunction, strRandom } = require '@formidablejs/helpers'
const { Mail } = require '@formidablejs/mailer'
const Database = require '../../Database/Database'
const Hash = require '../../Hashing/Hash'
const now = require '../../Support/Helpers/now'
const PersonalAccessToken = require '../Tokens/PersonalAccessToken'
const URL = require '../../Http/URL/URL'
const ValidationException = require '../../Validator/Exceptions/ValidationException'
const EmailNotVerifiedException = require '../Exceptions/EmailNotVerifiedException'
const EmailVerifiedException = require '../Exceptions/EmailVerifiedException'

const events = {
	onRegistered: null
	onAuthenticated: null
}

const mailers = {
	verificationEmail: null
	resetPasswordMailer: null
}

module.exports = class Driver

	def constructor protocol, request, reply, params, config
		this.protocol = protocol
		this.request = request
		this.reply = reply
		this.params = params
		this.config = config

	def getPersonalAccessToken token\String = null
		await PersonalAccessToken.find(token !== null && token !== undefined ? token : self.request.bearerToken!)

	def authenticate body\Object
		self

	def register body\Object
		self

	def afterRegistered user\Object
		if isFunction(events.onRegistered)
			events.onRegistered(self.request, user)

	def afterAuthenticated user\Object
		if isFunction(events.onAuthenticated)
			events.onAuthenticated(self.request, user)

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

		return { status: 'success' }

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
		await PersonalAccessToken.destroy(token !== null || token !== undefined ? token : self.request.bearerToken!)

	def createPersonalAccessToken name\String, id\Number
		await PersonalAccessToken.create(name, id, self.getProvider.table)

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
		Database.table(self.getProvider.table)
			.insert({
				name: body.name,
				email: body.email,
				password: await Hash.make(body.password)
			})
			.then do([ userId ])
				return await Database.table(self.getProvider.table)
					.where('id', userId)
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

	static def verificationMailer mailer
		if mailers.verificationEmail
			throw new Error 'Verification mailer already set'

		mailers.verificationEmail = mailer

	static def resetPasswordMailer mailer
		if mailers.resetPasswordMailer
			throw new Error 'Reset password mailer already set'

		mailers.resetPasswordMailer = mailer

