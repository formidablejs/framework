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

	def authenticate body\object
		let user = await Auth.attempt(body)

		user = asObject(user)

		const token = await self.createPersonalAccessToken('auth:jwt', user.id)
		const hidden = !isEmpty(self.getProvider.hidden) ? self.getProvider.hidden : []

		const payload = {
			token: token
			type: 'Bearer'
			user: without(user, hidden)
		}

		const results = await self.afterAuthenticated user

		isEmpty(results) ? payload : results

	def register body\object
		const user = asObject(await self.insertUser(body))

		const token = await self.createPersonalAccessToken('auth:jwt', user.id)
		const hidden = !isEmpty(self.getProvider.hidden) ? self.getProvider.hidden : []

		self.sendVerificationEmail user

		const payload = {
			token: token
			type: 'Bearer'
			user: without(user, hidden)
		}

		const results = self.afterRegistered payload

		isEmpty(results) ? payload : results

	def logout body\object = new Object
		const personalAccessToken = await self.getPersonalAccessToken!

		await Database.table('personal_access_tokens')
			.where('id', personalAccessToken.token.id)
			.where('tokenable_id', personalAccessToken.tokenable.id)
			.del!

		const results = await self.afterSessionDestroyed!

		isEmpty(results) ? { status: 'success' } : results
