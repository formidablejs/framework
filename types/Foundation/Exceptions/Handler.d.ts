export default class Handler {
    /**
    @param {Repository} config
    */
    constructor(config: any);
    config: any;
    /**
    @param {Error|ApplicationException|HttpException} error
    @param {FormRequest} request
    @param {FastifyReply} reply
    */
    handle(error: Error | any | any, request: any, reply: any): Promise<any>;
    [Ψ__init__]($$?: any): void;
}
declare const Ψ__init__: unique symbol;
export {};
