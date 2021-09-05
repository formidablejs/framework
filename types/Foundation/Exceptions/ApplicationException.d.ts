export = ApplicationException;
declare class ApplicationException extends Error {
    /**
    @param {any} response
    @param {Number} status
    */
    constructor(response: any, status?: number);
    response: any;
    status: number;
    initMessage(): any;
    initName(): string;
    getStatus(): number;
    [Ψinit]($$?: any, ...args: any[]): void;
}
declare const Ψinit: unique symbol;
