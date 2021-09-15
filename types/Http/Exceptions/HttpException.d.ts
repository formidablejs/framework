export var __esModule: boolean;
export default HttpException;
declare class HttpException extends Error {
    static [Ψ__init__](): typeof HttpException;
    /**
    @param {String} response
    */
    constructor(response: string);
    response: string;
    status: any;
    initMessage(): string;
    initName(): string;
    getStatus(): any;
    [Ψ__init__]($$?: any, ...args: any[]): void;
}
declare const Ψ__init__: unique symbol;
