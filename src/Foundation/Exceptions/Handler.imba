const { handleException, setConfig } = require './Handler/handleException'

module.exports = class Handler

	prop config

	def constructor config
		this.config = config

		setConfig(this.config)

	def handle error, request, reply
		return handleException(error, request, reply)
