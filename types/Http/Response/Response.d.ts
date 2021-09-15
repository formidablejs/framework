export var __esModule: boolean;
export default Response;
declare class Response {
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
    json(object: any): any;
    /**
    @param {Number} statusCode
    */
    code(statusCode: number): number;
    [Ψ__init__]($$?: any): void;
}
declare const Ψ__init__: unique symbol;
