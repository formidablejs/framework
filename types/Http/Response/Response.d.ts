export default class Response {
    /**
    @param {any} data
    @param {number} statusCode
    */
    constructor(data?: any, statusCode?: number);
    data: any;
    statusCode: number;
    /**
    @param {object} object
    @param {number} statusCode
    */
    json(object: object, statusCode?: number): JsonResponse;
    /**
    @param {View} view
    @param {object|null} data
    */
    view(view: View, data?: object | null): ViewResponse;
    /**
    @param {number} statusCode
    */
    code(statusCode: number): Response;
    /**
    @param {FastifyReply} reply
    */
    toResponse(reply: FastifyReply): any;
    [$__patch__$]($$?: {}): void;
    [$__init__$]($$?: any, deep?: boolean): void;
}
import JsonResponse from "./JsonResponse";
import ViewResponse from "./ViewResponse";
declare const $__patch__$: unique symbol;
declare const $__init__$: unique symbol;
export {};
