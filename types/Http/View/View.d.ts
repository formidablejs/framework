export default class View {
    /**
    @param {Object} data
    */
    constructor(data?: any);
    get data(): any;
    /**
    @param {Object} data
    */
    setData(data: any): View;
    /**
    @param {String} key
    @param {any} default
    */
    old(key: string, default$: any): any;
    /**
    @param {String} key
    @param {any} default
    */
    session(key: string, default$: any): any;
    /**
    @param {String} key
    */
    hasSession(key: string): boolean;
    /**
    @param {String} key
    */
    hasError(key: string): boolean;
    /**
    @param {String} key
    */
    error(key: string): any;
    /**
    @param {String} property
    @param {any} default
    @param {boolean} escape
    */
    get(property: string, default$?: any, escape?: boolean): any;
    /**
    @param {String} property
    @param {any} default
    */
    raw(property: string, default$?: any): any;
    /**
    @param {String} property
    */
    has(property: string): boolean;
    beforeRender(): any;
    afterRender(): any;
    handle(): any;
    render(): any;
    make(): Promise<string>;
    [$2]($$?: any): void;
    [$1]: any;
}
declare const $2: unique symbol;
declare const $1: unique symbol;
export {};
