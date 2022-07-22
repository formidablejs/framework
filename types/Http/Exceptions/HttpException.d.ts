export default HttpException;
declare class HttpException extends Error {
    static [$__init__$](): typeof HttpException;
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
    [$__patch__$]($$?: {}): void;
    [$__init__$]($$?: any, deep?: boolean, ...args: any[]): void;
}
declare const $__patch__$: unique symbol;
declare const $__init__$: unique symbol;
