const UnsupportedAuthDriverException = require './Exceptions/UnsupportedAuthDriverException'
const JwtDriver = require './Drivers/JwtDriver'
const SessionDriver = require './Drivers/SessionDriver'

const drivers = {
	jwt: JwtDriver
	session: SessionDriver
}

module.exports = class DriverManager

	static def register name\String, driver\Object
		drivers[name] = driver

	static def get protocol\String, request, reply, params, config
		const provider = config.get("auth.protocols.{protocol}.provider")

		const driver = drivers[provider]

		if driver == null || driver == undefined
			throw new UnsupportedAuthDriverException "{provider} is not a support driver."

		new driver(protocol, request, reply, params, config)
