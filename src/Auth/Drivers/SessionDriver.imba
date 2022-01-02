import { ms } from '../../Support/Helpers'
import Auth from '../Auth'
import AuthorizationException from '../Exceptions/AuthorizationException'
import BadRequestException from '../../Http/Exceptions/BadRequestException'
import Database from '../../Database/Database'
import decrypt from '../../Support/Helpers/decrypt'
import Driver from './Driver'
import encrypt from '../../Support/Helpers/encrypt'
import isEmpty from '../../Support/Helpers/isEmpty'
import isString from '../../Support/Helpers/isString'
import now from '../../Support/Helpers/now'
import strRandom from '../../Support/Helpers/strRandom'

export default class SessionDriver < Driver

	def verify
		const token = await self.request.request.session.personal_access_token

		const personalAccessToken = await self.getPersonalAccessToken(
			!isEmpty(token) ? token : new String
		)

		if !personalAccessToken.token
			const renewedSession = await renewSession!

			if !isEmpty(renewedSession) then return renewedSession

			throw new AuthorizationException 'Unauthorized'

		self.usingPersonalAccessToken(personalAccessToken.token)

		personalAccessToken

	def renewSession
		if !isEmpty(self.request.request.cookies.remember)
			const remember = self.request.request.cookies.remember

			if isString(remember)
				const user = await Database.table(self.getProvider.table)
					.where('remember_token', encrypt(remember))
					.first!

				if !isEmpty(user)
					return await self.attempt('auth:session', user)

		false

	def authenticate body\Object
		const user = await Auth.attempt(body)

		await self.attempt('auth:session', user)

		if !isEmpty(body.remember_me) && body.remember_me === true
			const token = strRandom(80)

			await Database.table(self.getProvider.table)
				.where('id', user.id)
				.update({
					remember_token: encrypt(token)
					updated_at: now!
				})

			const session = self.config.get('session')

			self.reply.setCookie('remember', token, {
				domain: session.domain
				httpOnly: session.http_only
				maxAge: self.config.get('auth.remember', 60 * 60 * 24 * 180)
				path: session.path
				sameSite: session.same_site
				secure: session.secure
			})

		const results = await self.afterAuthenticated user

		isEmpty(results) ? { status: 'success' } : results

	def register body\Object
		const user = await self.insertUser(body)

		await self.attempt('auth:session', user)

		self.sendVerificationEmail user

		if !isEmpty(body.remember_me) && body.remember_me === true
			const token = strRandom(80)

			await Database.table(self.getProvider.table)
				.where('id', user.id)
				.update({
					remember_token: encrypt(token)
					updated_at: now!
				})

			const session = self.config.get('session')

			self.reply.setCookie('remember', token, {
				domain: session.domain
				httpOnly: session.http_only
				maxAge: self.config.get('auth.remember', 60 * 60 * 24 * 180)
				path: session.path
				sameSite: session.same_site
				secure: session.secure
			})

		const results = await self.afterRegistered user

		isEmpty(results) ? { status: 'success' } : results

	def logout body\Object = new Object
		const userId = self.request.auth!.user!.id
		const remember = self.request.request.cookies.remember

		if isEmpty(userId) == false && isEmpty(remember) == false
			await Database.table(self.getProvider.table)
				.where('id', userId)
				.where('remember_token', encrypt(remember))
				.update('remember_token', null)

		const token = await self.request.request.session.personal_access_token

		const destroyed = await self.destroy(token != null && token != undefined ? token : new String)

		if !destroyed then throw new BadRequestException 'User logout failed.'

		delete self.request.request.session.personal_access_token

		self.request.request.sessionStore.destroy(request.request.session.sessionId, do null)

		const results = await self.afterSessionDestroyed!

		isEmpty ? { status: 'success' } : results
