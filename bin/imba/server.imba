import { Kernel } from '@formidablejs/framework'
const { app } = require('../../../../../bootstrap/main')

const application = app.initiate(app.make(Kernel), true)

application.then do(instance)
	const start = do
		let port = 3000
		let host

		const args = process.argv.slice(2)

		args.forEach do(arg)
			if arg.startsWith('--port')
				port = arg.split('=')[1]

			if arg.startsWith('--host')
				host = arg.split('=')[1]

		instance.fastify().listen({
			port: Number(port),
			host: host
		}, do(err, address)
			if err
				instance.fastify().log.error(err)
				process.exit(1)
		)

		imba.serve instance.fastify().server

	start!
