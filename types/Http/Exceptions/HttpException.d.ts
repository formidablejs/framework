export default HttpException;
declare class HttpException extends Error {
    static [Ψ__init__](): typeof HttpException;
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
    [Ψ__init__]($$?: any, ...args: any[]): void;
}
declare const Ψ__init__: unique symbol;
