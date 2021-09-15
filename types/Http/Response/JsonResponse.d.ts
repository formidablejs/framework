export var __esModule: boolean;
export default JsonResponse;
declare class JsonResponse {
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
    [Ψ__init__]($$?: any): void;
}
declare const Ψ__init__: unique symbol;
