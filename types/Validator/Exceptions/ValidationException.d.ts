export = ValidationException;
declare class ValidationException extends HttpException {
    /**
    @param {Object} messages
    */
    static withMessages(messages: any): ValidationException;
    constructor(...args: any[]);
    [Ψinit]($$?: any, ...args: any[]): void;
}
import HttpException = require("../../Http/Exceptions/HttpException");
declare const Ψinit: unique symbol;
