export = Repository;
declare class Repository {
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
    [Ψinit]($$?: any): void;
}
declare const Ψinit: unique symbol;
