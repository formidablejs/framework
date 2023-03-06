import { FastifyReply } from "fastify";
import FormRequest from "../Request/FormRequest";
import Request from "../Request/Request";

export default class EnsureStateless {
    /**
     * When strict mode is enabled, your application will completely
     * remove sessions and cookies. Conversely, when strict mode is not
     * enabled, only the ability to set cookies will be disabled.
     *
     * @default false
     */
    get strict(): boolean

    /**
     * Handle request.
     */
    handle(request: FormRequest|Request, reply: FastifyReply, params: any[] | null): () => any;
}
