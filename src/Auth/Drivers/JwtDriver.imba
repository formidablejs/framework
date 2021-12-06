import Database from '../../Database/Database'
import asObject from '../../Support/Helpers/asObject'
import Auth from '../Auth'
import AuthorizationException from '../Exceptions/AuthorizationException'
import Driver from './Driver'
import isEmpty from '../../Support/Helpers/isEmpty'
import without from '../../Support/Helpers/without'

export default class JwtDriver < Driver

	def verify
		if !self.request.hasHeader('authorization')
			throw new AuthorizationException 'Unauthorized'

		const personalAccessToken = await self.getPersonalAccessToken!

		if !personalAccessToken.token
			throw new AuthorizationException 'Unauthorized'

		self.usingPersonalAccessToken(personalAccessToken.token)

		personalAccessToken

	def authenticate body\Object
		const user = asObject(await Auth.attempt(body))

		const token = await self.createPersonalAccessToken('auth:jwt', user.id)
		const hidden = !isEmpty(self.getProvider.hidden) ? self.getProvider.hidden : []

		self.afterAuthenticated user

		return {
			token: token
			type: 'Bearer'
			user: without(user, hidden)
		}

	def register body\Object
		const user = asObject(await self.insertUser(body))

		const token = await self.createPersonalAccessToken('auth:jwt', user.id)
		const hidden = !isEmpty(self.getProvider.hidden) ? self.getProvider.hidden : []

		self.sendVerificationEmail user
		self.afterRegistered user

		return {
			token: token
			type: 'Bearer'
			user: without(user, hidden)
		}

	def logout body\Object = new Object
		const personalAccessToken = await self.getPersonalAccessToken!

		await Database.table('personal_access_tokens')
			.where('id', personalAccessToken.token.id)
			.where('tokenable_id', personalAccessToken.tokenable.id)
			.del!

		return { status: 'success' }
