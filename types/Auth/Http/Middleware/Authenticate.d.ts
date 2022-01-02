export default class Authenticate {
    /**
    @param {Repository} config
    */
    constructor(config: Repository);
    config: Repository;
    /**
    @param {FormRequest} request
    @param {FastifyReply} reply
    @param {any[]|null} params
    */
    handle(request: FormRequest, reply: FastifyReply, params: any[] | null): Promise<() => Auth>;
    get defaultProtocol(): any;
    /**
    @param {String} protocol
    */
    configure(protocol: string): any;
}
import Auth from "../../Auth";
