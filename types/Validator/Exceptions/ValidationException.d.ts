export default ValidationException;
declare class ValidationException extends HttpException {
    /**
    @param {object} messages
    */
    static withMessages(messages: object): ValidationException;
    static [$__init__$](): typeof ValidationException;
    constructor(...args: any[]);
    [$__patch__$]($$?: {}): void;
    [$__init__$]($$?: any, deep?: boolean, ...args: any[]): void;
}
import HttpException from "../../Http/Exceptions/HttpException";
declare const $__patch__$: unique symbol;
declare const $__init__$: unique symbol;
