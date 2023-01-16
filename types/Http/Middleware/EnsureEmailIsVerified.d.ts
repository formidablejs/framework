import Request from "../Request/Request";

export default class EnsureEmailIsVerified {
    /**
     * Route to redirect to.
     */
    get redirectToRoute(): string;

    /**
     * Handle middleware.
     */
    handle(request: Request, reply: FastifyReply, params?: Array<any>): any;

    /**
     * Handle requests expecting html.
     */
    toHtml(request: Request, reply: FastifyReply, params?: Array<any>): any;

    /**
     * Handle requests expecting json.
     */
    toJson(request: Request, reply: FastifyReply, params?: Array<any>): any;
}
