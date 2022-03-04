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
    [$1]($$?: any, ...args: any[]): void;
}
declare const $1: unique symbol;
