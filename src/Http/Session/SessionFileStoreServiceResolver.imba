const session = require '@fastify/session'
const DriverManager = require './DriverManager'
const ServiceResolver = require '../../Support/ServiceResolver'

module.exports = class SessionFileStoreServiceResolver < ServiceResolver

	def boot
		if self.app.config.get('session.driver') === 'file'
			const FileStore = require('session-file-store')(session)

			DriverManager.register('file', new FileStore({
				path: 'storage/sessions'
			}))
