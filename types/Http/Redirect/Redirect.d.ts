export default class Redirect {
    /**
    @param {String} path
    */
    static to(path: string): Redirect;
    /**
    @param {Number|null} statucCode
    */
    static back(statucCode?: number | null): Redirect;
    /**
    @param {String} name
    @param {Object} params
    */
    static route(name: string, params?: any): Redirect;
    /**
    @param {String} path
    @param {Number} statusCode
    */
    constructor(path: string, statusCode?: number);
    path: string;
    statusCode: number;
    _flashed: any;
    /**
    @param {String} key
    @param {any} value
    */
    with(key: string, value: any): Redirect;
    hasFlash(): boolean;
    flashed(): any;
    /**
    @param {Number} statusCode
    */
    code(statusCode: number): Redirect;
    [Ψ__init__]($$?: any): void;
}
declare const Ψ__init__: unique symbol;
export {};
