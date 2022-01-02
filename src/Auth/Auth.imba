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

	def constructor user\Object = null, abilities\String = null, driverManager\Driver
		self.abilities = do abilities isa String ? JSON.parse(abilities) : null

		let userObject = {}

		for own key, value of user
			userObject[key] = value

		self.user = do userObject
		self._driver = driverManager

	def driver
		self._driver

	def can perform\String
		self.abilities!.includes('*') || self.abilities!.includes(perform)

	def check
		self.user! !== null || self.user! !== undefined

	static def setProvider provider\Object
		config.provider = provider

	static def getTable
		config.provider.table

	static def attempt body\Object
		const dbTable = config.provider.table

		const user = await Database.table(dbTable)
			.where('email', body.email)
			.first!

		if user && await Hash.check(body.password, user.password)
			return user

		throw ValidationException.withMessages({
			email: [
				'Invalid credentials'
			]
		})

export default Auth
