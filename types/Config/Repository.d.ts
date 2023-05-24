export default class Repository {
    static setEnvironment(): any;
    static getEnvironment(): any;
    constructor($$?: any);
    temp: any;
    get registered(): Object;
    /**
    @param {string} key
    */
    has(key: string): boolean;
    /**
    @param {string} key
    @param {any} default
    */
    get(key: string, default$?: any): any;
    /**
    @param {string} key
    @param {any} value
    */
    set(key: string, value: any): any;
    all(): Object;
    [$__patch__$]($$?: {}): void;
    [$__init__$]($$?: any, deep?: boolean): void;
}
declare const $__patch__$: unique symbol;
declare const $__init__$: unique symbol;
export {};
