const Response = require '../../Http/Response/Response'

module.exports = def response data\any = null, statusCode\number = 200
	new Response(data, statusCode)
