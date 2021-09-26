export default class ErrorIfAuthenticated {
    /**
    @param {FormRequest} request
    @param {FastifyReply} reply
    @param {any[]|null} params
    */
    handle(request: FormRequest, reply: FastifyReply, params: any[] | null): Promise<void | FormRequest>;
    /**
    @param {FormRequest} request
    */
    isAuthenticated(request: FormRequest): boolean;
    /**
    @param {FormRequest} request
    @param {FastifyReply} reply
    @param {any[]|null} params
    */
    onAuthenticated(request: FormRequest, reply: FastifyReply, params: any[] | null): void;
}
import FormRequest from "../../../Http/Request/FormRequest";
import { FastifyReply } from "fastify";
