export default class Middleware {
    handle(request: Request, reply: FastifyReply, params?: object): any;

    terminate?(request: Request, reply: FastifyReply, params?: object): any
}