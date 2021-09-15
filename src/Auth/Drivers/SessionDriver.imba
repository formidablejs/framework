import Auth from '../Auth'
import AuthorizationException from '../Exceptions/AuthorizationException'
import Driver from './Driver'
import BadRequestException from '../../Http/Exceptions/BadRequestException'

export default class SessionDriver < Driver

	def verify
		const token = await self.request.request.session.personal_access_token

		const personalAccessToken = await self.getPersonalAccessToken(
			token != null || token != undefined ? token : new String
		)

		if !personalAccessToken.token
			throw new AuthorizationException 'Unauthorized'

		personalAccessToken

	def authenticate body\Object
		const user = await Auth.attempt(body)

		self.request.request.session.personal_access_token = await self
			.createPersonalAccessToken('auth:session', user.id)

		self.afterAuthenticated user

		return { status: 'success' }

	def register body\Object
		const user = await self.insertUser(body)

		self.request.request.session.personal_access_token = await self
			.createPersonalAccessToken('auth:session', user.id)

		self.sendVerificationEmail user
		self.afterRegistered user

		return { status: 'success' }

	def logout body\Object = new Object
		const token = await self.request.request.session.personal_access_token

		const destroyed = await self.destroy(token != null && token != undefined ? token : new String)

		if !destroyed then throw new BadRequestException 'User logout failed.'

		delete self.request.request.session.personal_access_token

		self.request.request.sessionStore.destroy(request.request.session.sessionId, do null)

		return {
			status: 'success'
		}
