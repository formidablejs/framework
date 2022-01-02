export default class Handler {
    /**
    @param {Repository} config
    */
    constructor(config: Repository);
    config: Repository;
    get dontReport(): (typeof HttpException)[];
    /**
    @param {Error|ApplicationException|HttpException} error
    @param {FormRequest} request
    @param {FastifyReply} reply
    */
    beforeHandle(error: Error | ApplicationException | HttpException, request: FormRequest, reply: FastifyReply): Promise<any>;
    /**
    @param {Error|ApplicationException|HttpException} error
    @param {FormRequest} request
    @param {FastifyReply} reply
    @param {Boolean} shouldReport
    */
    handle(error: Error | ApplicationException | HttpException, request: FormRequest, reply: FastifyReply, shouldReport: boolean): any;
    /**
    @param {Error} error
    */
    shouldReport(error: Error): boolean;
    [Ψ__init__]($$?: any): void;
}
import HttpException from "../../Http/Exceptions/HttpException";
declare const Ψ__init__: unique symbol;
export {};
