export default class JsonResponse {
    /**
    @param {object} object
    */
    static make(object: object): JsonResponse;
    /**
    @param {object} object
    */
    constructor(object: object);
    data: any;
    statusCode: any;
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
