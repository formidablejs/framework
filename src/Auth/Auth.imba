import isEmpty from '../Support/Helpers/isEmpty'
import type Request from '../Http/Request/Request'
import type Driver from './Drivers/Driver'
import Hash from '../Hashing/Hash'
import ValidationException from '../Validator/Exceptions/ValidationException'
import Database from '../Database/Database'

const config = {
	provider: null
	auth: null
}

class Auth
	prop _driver\Driver

	def constructor user\object = null, abilities\string = null, driverManager\Driver
		self.abilities = do abilities isa String ? JSON.parse(abilities) : null

		let userObject = {}

		for own key, value of user
			userObject[key] = value

		self.user = do userObject
		self._driver = driverManager

	def driver
		self._driver

	def can perform\string
		self.abilities!.includes('*') || self.abilities!.includes(perform)

	def check
		self.user! !== null || self.user! !== undefined

	static def setProvider provider\object
		config.provider = provider

	static def getTable
		config.provider.table

	static def getIdentifier
		config.provider.identifier

	static def attempt body\object
		const dbTable = config.provider.table
		const dbIdentifier = config.provider.identifier || 'email'

		if !['email', 'username', 'username-email'].includes(dbIdentifier)
			throw new Error "\"{dbIdentifier}\" is not a valid identifier"

		let user = null
		let property = 'username'

		if dbIdentifier === 'email'
			user = await Database.table(dbTable).whereRaw('LOWER(email) = LOWER(?)', [body.email]).first!

			property = 'email'

		elif dbIdentifier === 'username'
			user = await Database.table(dbTable).whereRaw('LOWER(username) = LOWER(?)', [body.username]).first!
		elif dbIdentifier === 'username-email'
			user = await Database.table(dbTable)
				.whereRaw('LOWER(username) = LOWER(?)', [body.username])
				.orWhereRaw('LOWER(email) = LOWER(?)', [body.username])
				.first!

		if user && await Hash.check(body.password, user.password)
			return user

		throw ValidationException.withMessages({
			[property]: [
				"Invalid {dbIdentifier === 'email' ? 'Email' : 'Username'} or password."
			]
		})

export default Auth
