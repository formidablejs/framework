export = Response;
declare class Response {
    /**
    @param {any} data
    @param {Number} statusCode
    */
    constructor(data?: any, statusCode?: number);
    data: any;
    statusCode: number;
    /**
    @param {Object} object
    */
    json(object: any): JsonResponse;
    /**
    @param {Number} statusCode
    */
    code(statusCode: number): number;
    [Ψinit]($$?: any): void;
}
import JsonResponse = require("./JsonResponse");
declare const Ψinit: unique symbol;
