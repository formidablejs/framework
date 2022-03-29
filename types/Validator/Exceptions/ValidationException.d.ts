export default ValidationException;
declare class ValidationException extends HttpException {
    /**
    @param {Object} messages
    */
    static withMessages(messages: any): ValidationException;
    static [$1](): typeof ValidationException;
    constructor(...args: any[]);
    [$2]($$?: {}): void;
    [$1]($$?: any, ...args: any[]): void;
}
import HttpException from "../../Http/Exceptions/HttpException";
declare const $2: unique symbol;
declare const $1: unique symbol;
