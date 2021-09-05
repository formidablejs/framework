export = HttpException;
declare class HttpException extends Error {
    /**
    @param {String} response
    */
    constructor(response: string);
    response: string;
    status: any;
    initMessage(): string;
    initName(): string;
    getStatus(): any;
    [Ψinit]($$?: any, ...args: any[]): void;
}
declare const Ψinit: unique symbol;
