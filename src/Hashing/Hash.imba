import InvalidHashDriverException from './Exceptions/InvalidHashDriverException'
import InvalidHashConfigurationException from './Exceptions/InvalidHashConfigurationException'

const settings = {
	config: null
	driver: null
}

export default class Hash

	static def getDriver
		if settings.driver == null
			throw new InvalidHashConfigurationException 'Hashing is not configured.'

		return settings.driver

	static def make value\string
		if settings.config.driver == 'argon2'
			return await getDriver!.hash(value, settings.config.argon2)

		if settings.config.driver == 'bcrypt'
			return await getDriver!.hash(value, settings.config.bcrypt.rounds ?? 10)

		throw new InvalidHashDriverException "{settings.config.driver} is not a valid driver."

	static def check value\string, hash\string
		if settings.config.driver == 'argon2'
			return await getDriver!.verify(hash, value, settings.config.argon2)

		if settings.config.driver == 'bcrypt'
			return await getDriver!.compare(value, hash)

		throw new InvalidHashDriverException "{settings.config.driver} is not a valid driver."

	static def configure config\object
		if settings.config != null then throw new InvalidHashDriverException 'Hashing has been already configured.'

		if config.driver == 'argon2'
			if config.argon2.memoryCost == null
				throw new InvalidHashConfigurationException 'argon2 memory cost is missing.'

			if config.argon2.timeCost == null
				throw new InvalidHashConfigurationException 'argon2 time cost is missing.'

			if config.argon2.parallelism == null
				throw new InvalidHashConfigurationException 'argon2 parallelism is missing.'

			try
				settings.driver = require('argon2')
			catch
				throw new InvalidHashDriverException 'argon2 is not installed. Please run "npm install argon2".'

		if config.driver == 'bcrypt'
			if config.bcrypt.rounds == null
				throw new InvalidHashConfigurationException 'bcrypt rounds is missing.'

			try
				settings.driver = require('bcrypt')
			catch
				throw new InvalidHashDriverException 'bcrypt is not installed. Please run "npm install bcrypt".'

		settings.config = config

	static def reset
		settings.config = null
		settings.driver = null
