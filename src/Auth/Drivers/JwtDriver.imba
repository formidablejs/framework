import asObject from '../../Support/Helpers/asObject'
import Auth from '../Auth'
import AuthorizationException from '../Exceptions/AuthorizationException'
import Driver from './Driver'
import without from '../../Support/Helpers/without'

export default class JwtDriver < Driver

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
