import { Output } from '@formidablejs/console'
import { Kernel } from '@formidablejs/framework'
import { join } from 'path'
import { execSync } from 'child_process'
import { writeFileSync, existsSync } from 'fs-extra'

const { app } = require('../../../../../bootstrap/main')

const application = app.initiate(app.make(Kernel), true)

application.then do(instance)
	const start = do
		let port = process.env.PORT || 3000
		let host = process.env.HOST || 'localhost'
		let addr = process.env.ADDR || false

		instance.fastify().listen({
			port: Number(port),
			host: host
		}, do(_error, address)
			if _error
				instance.fastify().log.error(_error)

				process.exit(1)

			if addr then storeAddress address
		)

		imba.serve instance.fastify().server

	start!

def storeAddress address\string
	const location = join(process.cwd!, 'storage', 'framework', 'address.json')

	const object = {
		current: address.replace('[::]', '127.0.0.1').replace('::1', 'localhost')
	}

	writeFileSync location, JSON.stringify(object, null, 2), {
		encoding: 'utf8'
	}
