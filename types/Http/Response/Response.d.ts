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
    */
    json(object: object): JsonResponse;
    /**
    @param {View} view
    @param {object|null} data
    */
    view(view: View, data?: object | null): ViewResponse;
    /**
    @param {number} statusCode
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
