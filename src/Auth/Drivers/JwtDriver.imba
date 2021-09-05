const { asObject, without } = require '@formidablejs/helpers'
const Auth = require '../Auth'
const AuthorizationException = require '../Exceptions/AuthorizationException'
const Driver = require './Driver'

module.exports = class JwtDriver < Driver

	def verify
		if !self.request.hasHeader('authorization')
			throw new AuthorizationException 'Unauthorized'

		const personalAccessToken = await self.getPersonalAccessToken!

		if !personalAccessToken.token
			throw new AuthorizationException 'Unauthorized'

		personalAccessToken

	def authenticate body\Object
		const user = asObject(await Auth.attempt(body))

		const token = await self.createPersonalAccessToken('auth:jwt', user.id)
		const hidden = self.getProvider.hidden !== undefined ? self.getProvider.hidden : []

		self.afterAuthenticated user

		return {
			token: token
			type: 'Bearer'
			user: without(user, hidden)
		}

	def register body\Object
		const user = asObject(await self.insertUser(body))

		const token = await self.createPersonalAccessToken('auth:jwt', user.id)
		const hidden = self.getProvider.hidden !== undefined ? self.getProvider.hidden : []

		self.sendVerificationEmail user
		self.afterRegistered user

		return {
			token: token
			type: 'Bearer'
			user: without(user, hidden)
		}
