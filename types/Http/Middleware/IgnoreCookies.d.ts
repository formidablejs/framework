export default class IgnoreCookies {
    /**
    @param {FormRequest} request
    @param {FastifyReply} reply
    @param {any[]|null} params
    */
    handle(request: any, reply: any, params: any[] | null): () => any;
}
