import HttpException from './HttpException'
import { FastifyRequest } from 'fastify'
import FormRequest from '../Request/FormRequest'
import Request from '../Request/Request'

class NotFoundException < HttpException

	prop status = 404

	static def using request\Request|FormRequest|FastifyRequest
		new self(request instanceof FormRequest ? "Route {request.req.method}:{request.req.url} not found." : "Route {request.method}:{request.url} not found.")

export default NotFoundException
