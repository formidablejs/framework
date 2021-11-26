export default class IgnoreCookies {
    /**
    @param {FormRequest} request
    @param {FastifyReply} reply
    @param {any[]|null} params
    */
    handle(request: FormRequest, reply: FastifyReply, params: any[] | null): () => any;
}
