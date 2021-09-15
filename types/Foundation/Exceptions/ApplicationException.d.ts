export default ApplicationException;
declare class ApplicationException extends Error {
    static [Ψ__init__](): typeof ApplicationException;
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
    [Ψ__init__]($$?: any, ...args: any[]): void;
}
declare const Ψ__init__: unique symbol;
