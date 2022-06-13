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
    [$4]($$?: {}): void;
    [$3]($$?: any, deep?: boolean): void;
    [$1]: any;
    [$2]: any;
}
declare const $4: unique symbol;
declare const $3: unique symbol;
declare const $1: unique symbol;
declare const $2: unique symbol;
export {};
