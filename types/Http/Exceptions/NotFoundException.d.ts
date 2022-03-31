export default NotFoundException;
declare class NotFoundException extends HttpException {
    /**
    @param {Request|FormRequest|FastifyRequest} request
    */
    static using(request: Request | FormRequest | FastifyRequest): NotFoundException;
    static [$1](): typeof NotFoundException;
    constructor(...args: any[]);
    [$2]($$?: {}): void;
    [$1]($$?: any, ...args: any[]): void;
}
import HttpException from "./HttpException";
declare const $2: unique symbol;
declare const $1: unique symbol;
import Request from "../Request/Request";
import FormRequest from "../Request/FormRequest";
import { FastifyRequest } from "fastify/types/request";
