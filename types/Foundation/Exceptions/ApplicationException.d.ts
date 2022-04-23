export default ApplicationException;
declare class ApplicationException extends Error {
    static [$1](): typeof ApplicationException;
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
    [$2]($$?: {}): void;
    [$1]($$?: any, ...args: any[]): void;
}
declare const $2: unique symbol;
declare const $1: unique symbol;
