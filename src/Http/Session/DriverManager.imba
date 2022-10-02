import UnsupportedSessionDriverException from './Exceptions/UnsupportedSessionDriverException'

const drivers = {}

export default class DriverManager

	static def register name\string, driver\object
		drivers[name] = driver

	static def get name\string
		const driver = drivers[name]

		if driver == null || driver == undefined
			throw new UnsupportedSessionDriverException "{name} is not a supported driver."

		driver

	static def isRegistered name\string
		const driver = drivers[name]

		driver !== undefined || driver !== null

