export default class Handler {
    /**
    @param {Repository} config
    */
    constructor(config: any);
    config: any;
    get dontReport(): (typeof HttpException)[];
    /**
    @param {Error|ApplicationException|HttpException} error
    @param {FormRequest} request
    @param {FastifyReply} reply
    */
    handle(error: Error | any | HttpException, request: any, reply: any): Promise<any>;
    /**
    @param {Error} error
    */
    shouldReport(error: Error): boolean;
    [Ψ__init__]($$?: any): void;
}
import HttpException from "../../Http/Exceptions/HttpException";
declare const Ψ__init__: unique symbol;
export {};
