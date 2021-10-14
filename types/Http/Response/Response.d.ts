export default class Response {
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
    @param {View} view
    @param {Object|null} data
    */
    view(view: any, data?: any | null): ViewResponse;
    /**
    @param {Number} statusCode
    */
    code(statusCode: number): number;
    [Ψ__init__]($$?: any): void;
}
import JsonResponse from "./JsonResponse";
import ViewResponse from "./ViewResponse";
declare const Ψ__init__: unique symbol;
export {};
