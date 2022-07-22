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
    [$__patch__$]($$?: {}): void;
    [$__init__$]($$?: any, deep?: boolean): void;
    [$ref$]: any;
}
declare const $__patch__$: unique symbol;
declare const $__init__$: unique symbol;
declare const $ref$: unique symbol;
export {};
