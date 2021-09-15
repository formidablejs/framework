export var __esModule: boolean;
export default Repository;
declare class Repository {
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
    [Ψ__init__]($$?: any): void;
}
declare const Ψ__init__: unique symbol;
