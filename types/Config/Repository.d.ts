export default class Repository {
    static setEnvironment(): any;
    static getEnvironment(): any;
    constructor($$?: any);
    temp: any;
    get registered(): Object;
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
    @param {any} value
    */
    set(key: string, value: any): any;
    all(): Object;
    [$2]($$?: {}): void;
    [$1]($$?: any, deep?: boolean): void;
}
declare const $2: unique symbol;
declare const $1: unique symbol;
export {};
