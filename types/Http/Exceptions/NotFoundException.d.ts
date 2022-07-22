export default NotFoundException;
declare class NotFoundException extends HttpException {
    /**
    @param {Request|FormRequest|FastifyRequest} request
    */
    static using(request: Request | FormRequest | FastifyRequest): NotFoundException;
    static [$__init__$](): typeof NotFoundException;
    constructor(...args: any[]);
    [$__patch__$]($$?: {}): void;
    [$__init__$]($$?: any, deep?: boolean, ...args: any[]): void;
}
import HttpException from "./HttpException";
declare const $__patch__$: unique symbol;
declare const $__init__$: unique symbol;
import Request from "../Request/Request";
import FormRequest from "../Request/FormRequest";
import { FastifyRequest } from "fastify/types/request";
