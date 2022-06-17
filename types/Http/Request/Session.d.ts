export default class Session {
    /**
    @param {FastifyRequest} request
    */
    constructor(request: FastifyRequest);
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
    @param {any} value
    */
    set(key: string, value: any): any;
    /**
    @param {String|String[]} key
    */
    forget(key: string | string[]): any[];
    [$3]($$?: {}): void;
    [$2]($$?: any, deep?: boolean): void;
    [$1]: any;
}
declare const $3: unique symbol;
declare const $2: unique symbol;
declare const $1: unique symbol;
export {};
