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
    [$2]($$?: {}): void;
    [$1]($$?: any): void;
}
declare const $2: unique symbol;
declare const $1: unique symbol;
export {};
