export default class Bind {
    /**
    @param {String} table
    @param {Boolean} first
    */
    constructor(table: string, first?: boolean);
    table: string;
    first: boolean;
    /**
    @param {Request} request
    @param {Number} key
    */
    handle(request: Request, key: number): any;
    [$__patch__$]($$?: {}): void;
    [$__init__$]($$?: any, deep?: boolean): void;
}
declare const $__patch__$: unique symbol;
declare const $__init__$: unique symbol;
export {};
