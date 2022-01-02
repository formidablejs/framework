export default class ErrorIfAuthenticated {
    /**
    @param {FormRequest|Request} request
    @param {FastifyReply} reply
    @param {any[]|null} params
    */
    handle(request: FormRequest | Request, reply: FastifyReply, params: any[] | null): Promise<void | FormRequest>;
    /**
    @param {FormRequest|Request} request
    */
    getPersonalAccessToken(request: FormRequest | Request): any;
    /**
    @param {FormRequest|Request} request
    */
    isAuthenticated(request: FormRequest | Request): boolean;
    /**
    @param {FormRequest|Request} request
    @param {FastifyReply} reply
    @param {any[]|null} params
    */
    onAuthenticated(request: FormRequest | Request, reply: FastifyReply, params: any[] | null): void;
}
import FormRequest from "../../../Http/Request/FormRequest";
import Request from "../../../Http/Request/Request";
import { FastifyReply } from "fastify";
