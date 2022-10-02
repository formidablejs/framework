export default class Redirect {
    /**
    @param {string} path
    */
    static to(path: string): Redirect;
    /**
    @param {number|null} statucCode
    */
    static back(statucCode?: number | null): Redirect;
    /**
    @param {string} name
    @param {object} params
    */
    static route(name: string, params?: object): Redirect;
    /**
    @param {string} path
    @param {number} statusCode
    */
    constructor(path: string, statusCode?: number);
    path: string;
    statusCode: number;
    _flashed: any;
    /**
    @param {string} key
    @param {any} value
    */
    with(key: string, value: any): Redirect;
    hasFlash(): boolean;
    flashed(): any;
    /**
    @param {number} statusCode
    */
    code(statusCode: number): Redirect;
    handle(request: any, reply: any): any;
    [$__patch__$]($$?: {}): void;
    [$__init__$]($$?: any, deep?: boolean): void;
}
declare const $__patch__$: unique symbol;
declare const $__init__$: unique symbol;
export {};
