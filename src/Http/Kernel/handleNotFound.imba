import type FormRequest from '../Request/FormRequest'
import NotFoundException from '../Exceptions/NotFoundException'

export default def handleNotFound request\FormRequest
	new NotFoundException "Route {request.method!}:{request.url!} not found."
