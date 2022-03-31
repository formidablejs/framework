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
    view(view: View, data?: any | null): ViewResponse;
    /**
    @param {Number} statusCode
    */
    code(statusCode: number): number;
    [$2]($$?: {}): void;
    [$1]($$?: any): void;
}
import JsonResponse from "./JsonResponse";
import ViewResponse from "./ViewResponse";
declare const $2: unique symbol;
declare const $1: unique symbol;
export {};
