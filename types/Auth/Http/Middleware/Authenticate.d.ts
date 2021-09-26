export default class Authenticate {
    /**
    @param {Repository} config
    */
    constructor(config: any);
    config: any;
    /**
    @param {FormRequest} request
    @param {FastifyReply} reply
    @param {any[]|null} params
    */
    handle(request: any, reply: any, params: any[] | null): Promise<() => Auth>;
    /**
    @param {String} protocol
    */
    configure(protocol: string): any;
}
import Auth from "../../Auth";
