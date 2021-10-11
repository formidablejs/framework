export default class View {
    /**
    @param {Object} data
    */
    constructor(data?: any);
    /**
    @param {String} property
    @param {any} default
    */
    get(property: string, default$?: any): any;
    /**
    @param {String} property
    */
    has(property: string): boolean;
    beforeRender(): any;
    afterRender(): any;
    handle(): any;
    render(): any;
    make(): Promise<string>;
    [Ψ__init__]($$?: any): void;
    [Ψsetup](): any[];
    [Ψdata]: any;
}
declare const Ψ__init__: unique symbol;
declare const Ψsetup: unique symbol;
declare const Ψdata: unique symbol;
export {};
