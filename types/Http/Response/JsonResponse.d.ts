export default class JsonResponse {
    /**
    @param {object} object
    @param {number} statusCode
    */
    static make(object: object, statusCode: number): JsonResponse;
    /**
    @param {object} object
    @param {number} statusCode
    */
    constructor(object: object, statusCode?: number);
    data: any;
    statusCode: number;
    /**
    @param {number} statusCode
    */
    code(statusCode?: number): JsonResponse;
    toJson(reply: any): any;
    [$__patch__$]($$?: {}): void;
    [$__init__$]($$?: any, deep?: boolean): void;
}
declare const $__patch__$: unique symbol;
declare const $__init__$: unique symbol;
export {};
