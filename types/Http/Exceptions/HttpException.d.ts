export default HttpException;
declare class HttpException extends Error {
    static [$1](): typeof HttpException;
    /**
    @param {String} response
    @param {Number|null} statusCode
    */
    constructor(response: string, statusCode?: number | null);
    response: string;
    status: number;
    initMessage(): string;
    initName(): string;
    getStatus(): number;
    [$2]($$?: {}): void;
    [$1]($$?: any, deep?: boolean, ...args: any[]): void;
}
declare const $2: unique symbol;
declare const $1: unique symbol;
