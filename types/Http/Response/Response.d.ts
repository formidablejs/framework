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
    [$__patch__$]($$?: {}): void;
    [$__init__$]($$?: any, deep?: boolean): void;
}
import JsonResponse from "./JsonResponse";
import ViewResponse from "./ViewResponse";
declare const $__patch__$: unique symbol;
declare const $__init__$: unique symbol;
export {};
