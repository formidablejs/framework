import { isEmpty } from '../Support/Helpers/index'
import fs from 'fs'
import MaintenanceModeException from './Exceptions/MaintenanceModeException'
import path from 'path'
import ServiceResolver from '../Support/ServiceResolver'
import type { FastifyRequest, FastifyReply } from 'fastify'
import type FormRequest from '../Http/Request/FormRequest'

export default class MaintenanceServiceResolver < ServiceResolver

	def boot
		self.app.addHook 'onRequest', do(request\FastifyRequest, reply\FastifyReply, done\Function)
			const maintenanceFile = path.join process.cwd!, 'storage', 'framework', 'down.json'

			const isDown = fs.existsSync(maintenanceFile)

			if isDown
				let down\Object = {
					message\String: 'Service Unavailable'
					statusCode\Number: 503
				}

				try down\Object = JSON.parse(fs.readFileSync(maintenanceFile, 'utf8'))

				const message\String = (!isEmpty(down) && !isEmpty(down.message)) ? down.message : 'Service Unavailable'
				const statusCode\Number = (!isEmpty(down) && !isEmpty(down.statusCode)) ? down.statusCode : 503

				throw new MaintenanceModeException message, statusCode

			done!

		self
