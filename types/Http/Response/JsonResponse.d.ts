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
    [$2]($$?: {}): void;
    [$1]($$?: any): void;
}
declare const $2: unique symbol;
declare const $1: unique symbol;
export {};
