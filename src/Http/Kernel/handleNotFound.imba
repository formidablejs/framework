const NotFoundException = require '../Exceptions/NotFoundException'

module.exports = def handleNotFound request
	new NotFoundException "Route {request.method}:{request.url} not found."
