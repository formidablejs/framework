import { handleException, setConfig } from './Handler/handleException'

export default class Handler

	prop config

	def constructor config
		this.config = config

		setConfig(this.config)

	def handle error, request, reply
		return handleException(error, request, reply)
