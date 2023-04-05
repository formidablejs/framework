import { Output } from '@formidablejs/console'
import Application from './Application'
import config from '../Support/Helpers/config'

export default class Server

	#_app\Promise<Application>

	def constructor application\Promise<Application>
		#_app = application

	static def use application\Promise<Application>
		new Server(application)

	def start serverOptions
		const port\number = (serverOptions && serverOptions.port) ? serverOptions.port : (process.env.PORT || 3000)
		const host\string = (serverOptions && serverOptions.host) ? serverOptions.host : (process.env.HOST || '0.0.0.0')
		const callback\Function = (serverOptions && serverOptions._) ? serverOptions._ : null

		#_app.then do(app)
			app.fastify!.listen({
				port: port,
				host: host
			}, callback || do(_error, address)
				if _error
					console.error(_error)

					process.exit(1)
				else
					const addr = address.endsWith("://0.0.0.0:{String(port)}") ? address.replace("://0.0.0.0:{String(port)}", "://127.0.0.1:{String(port)}") : address

					if config('app.debug')
						Output.write "\n  <bg:yellow> WARN </bg:yellow> Application Server running in debug mode…\n"
					else
						Output.write "\n  <bg:blue> INFO </bg:blue> Application Server running…\n"

					Output.write "  Local: <u><fg:blue>{addr}</fg:blue></u>\n"

					Output.write "  <fg:yellow>Press Ctrl+C to stop the server</fg:yellow>\n"
			)
