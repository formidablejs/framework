const UnsupportedSessionDriverException = require './Exceptions/UnsupportedSessionDriverException'

const drivers = {}

module.exports = class DriverManager

	static def register name\String, driver\Object
		drivers[name] = driver

	static def get name\String
		const driver = drivers[name]

		if driver == null || driver == undefined
			throw new UnsupportedSessionDriverException "{name} is not a supported driver."

		driver

	static def isRegistered name\String
		const driver = drivers[name]

		driver !== undefined || driver !== null

