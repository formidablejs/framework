import { Output } from '@formidablejs/console'
import { Kernel } from '@formidablejs/framework'
import { join } from 'path'
import { execSync } from 'child_process'
import { writeFileSync, existsSync } from 'fs-extra'

const { app } = require('../../../../../bootstrap/main')

const application = app.initiate(app.make(Kernel), true)

application.then do(instance)
	const start = do
		let port = 3000
		let host
		let addr = false

		const args = process.argv.slice(2)

		args.forEach do(arg)
			if arg.startsWith('--port')
				port = arg.split('=')[1]

			if arg.startsWith('--host')
				host = arg.split('=')[1]

			if arg.startsWith('--addr') && arg == '--addr=1'
				addr = true

		instance.fastify().listen({
			port: Number(port),
			host: host
		}, do(err, address)
			if err
				instance.fastify().log.error(err)
				process.exit(1)

			if addr then storeAddress address
		)

		imba.serve instance.fastify().server

	start!

def storeAddress address\string
	const location = join(process.cwd!, 'storage', 'framework', 'address.json')

	const object = {
		current: address.replace('[::]', '127.0.0.1')
	}

	writeFileSync location, JSON.stringify(object, null, 2), {
		encoding: 'utf8'
	}
