export default class ViewResponse {
    /**
    @param {View} view
    @param {Object|null} data
    @param {Number} statusCode
    */
    static make(view: any, data?: any | null, statusCode?: number): ViewResponse;
    /**
    @param {View} view
    @param {Object|null} data
    @param {Number} statusCode
    */
    constructor(view: any, data?: any | null, statusCode?: number);
    view: any;
    statusCode: number;
    /**
    @param {Number} statusCode
    */
    code(statusCode: number): number;
    /**
    @param {FastifyReply} reply
    */
    toView(reply: any): Promise<boolean>;
    [Ψ__init__]($$?: any): void;
}
declare const Ψ__init__: unique symbol;
export {};
