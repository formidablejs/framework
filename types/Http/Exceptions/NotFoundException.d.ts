export default NotFoundException;
declare class NotFoundException extends HttpException {
    /**
    @param {Request|FormRequest|FastifyRequest} request
    */
    static using(request: Request | FormRequest | FastifyRequest): NotFoundException;
    static [Ψ__init__](): typeof NotFoundException;
    constructor(...args: any[]);
    [Ψ__init__]($$?: any, ...args: any[]): void;
}
import HttpException from "./HttpException";
declare const Ψ__init__: unique symbol;
import Request from "../Request/Request";
import FormRequest from "../Request/FormRequest";
import { FastifyRequest } from "fastify/types/request";
