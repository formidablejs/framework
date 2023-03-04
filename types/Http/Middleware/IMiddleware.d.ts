import { FastifyReply } from "fastify"
import FormRequest from "../Request/FormRequest"
import Request from "../Request/Request"

export interface IMiddleware {
	new (...args: any[]): {
		handle: (request: Request | FormRequest, reply?: FastifyReply, params?: any[]) => any
	}
}
