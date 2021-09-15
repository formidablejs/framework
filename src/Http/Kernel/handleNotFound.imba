import NotFoundException from '../Exceptions/NotFoundException'

export default def handleNotFound request
	new NotFoundException "Route {request.method}:{request.url} not found."
