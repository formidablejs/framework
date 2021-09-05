export = JsonResponse;
declare class JsonResponse {
    /**
    @param {Object} object
    */
    static make(object: any): import("./JsonResponse");
    /**
    @param {Object} object
    */
    constructor(object: any);
    data: any;
    statusCode: any;
    /**
    @param {Number} statusCode
    */
    code(statusCode?: number): import("./JsonResponse");
    toJson(reply: any): any;
    [Ψinit]($$?: any): void;
}
declare const Ψinit: unique symbol;
