export default class JsonResponse {
    /**
    @param {Object} object
    */
    static make(object: any): JsonResponse;
    /**
    @param {Object} object
    */
    constructor(object: any);
    data: any;
    statusCode: any;
    /**
    @param {Number} statusCode
    */
    code(statusCode?: number): JsonResponse;
    toJson(reply: any): any;
    [$__patch__$]($$?: {}): void;
    [$__init__$]($$?: any, deep?: boolean): void;
}
declare const $__patch__$: unique symbol;
declare const $__init__$: unique symbol;
export {};
