export default ApplicationException;
declare class ApplicationException extends Error {
    static [$__init__$](): typeof ApplicationException;
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
    [$__patch__$]($$?: {}): void;
    [$__init__$]($$?: any, deep?: boolean, ...args: any[]): void;
}
declare const $__patch__$: unique symbol;
declare const $__init__$: unique symbol;
