import isEmpty from '../Support/Helpers/isEmpty'
import JwtDriver from './Drivers/JwtDriver'
import SessionDriver from './Drivers/SessionDriver'
import type { FastifyReply } from 'fastify'
import type Driver from './Drivers/Driver'
import type FormRequest from '../Http/Request/FormRequest'
import type Repository from '../Config/Repository'
import UnsupportedAuthDriverException from './Exceptions/UnsupportedAuthDriverException'

const drivers = {
	jwt: JwtDriver
	session: SessionDriver
}

export default class DriverManager

	static def register name\string, driver\object
		drivers[name] = driver

	static def get protocol\string, request\FormRequest, reply\FastifyReply, params\any[]|null, config\Repository
		const provider = config.get("auth.protocols.{protocol}.provider")

		const driver = drivers[provider]

		if isEmpty(driver)
			throw new UnsupportedAuthDriverException "{provider} is not a support driver."

		const authDriver\Driver = new driver(protocol, request, reply, params, config)

		authDriver
