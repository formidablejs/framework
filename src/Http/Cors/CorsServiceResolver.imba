const HandleCors = require '../Middleware/HandleCors'
const ServiceResolver = require '../../Support/ServiceResolver'

module.exports = class CorsServiceResolver < ServiceResolver

	def boot
		HandleCors.configure( self.app.config.get 'cors' )
