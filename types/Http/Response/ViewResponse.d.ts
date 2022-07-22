export default class ViewResponse {
    /**
    @param {View} view
    @param {Object|null} data
    @param {Number} statusCode
    */
    static make(view: View, data?: any | null, statusCode?: number): ViewResponse;
    /**
    @param {View} view
    @param {Object|null} data
    @param {Number} statusCode
    */
    constructor(view: View, data?: any | null, statusCode?: number);
    view: any;
    statusCode: number;
    /**
    @param {Number} statusCode
    */
    code(statusCode: number): number;
    /**
    @param {FormRequest} request
    @param {FastifyReply} reply
    */
    toView(request: FormRequest, reply: FastifyReply): Promise<boolean>;
    [$__patch__$]($$?: {}): void;
    [$__init__$]($$?: any, deep?: boolean): void;
}
declare const $__patch__$: unique symbol;
declare const $__init__$: unique symbol;
export {};
