export default class Cookies {
    /**
    @param {FastifyRequest} request
    @param {FastifyReply} reply
    */
    constructor(request: FastifyRequest, reply: FastifyReply);
    /**
    @param {String} key
    */
    has(key: string): boolean;
    /**
    @param {String} key
    @param {any} default
    */
    get(key: string, default$: any): any;
    /**
    @param {String} key
    @param {any} default
    */
    pull(key: string, default$: any): any;
    /**
    @param {String} key
    @param {String} value
    */
    set(key: string, value: string): any;
    /**
    @param {String|String[]} key
    */
    forget(key: string | string[]): any[];
    [$__patch__$]($$?: {}): void;
    [$__init__$]($$?: any, deep?: boolean): void;
    [$ref$]: any;
    [$reply$]: any;
}
declare const $__patch__$: unique symbol;
declare const $__init__$: unique symbol;
declare const $ref$: unique symbol;
declare const $reply$: unique symbol;
export {};
