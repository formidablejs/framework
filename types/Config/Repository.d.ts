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
    [$1]($$?: any): void;
}
declare const $1: unique symbol;
export {};
