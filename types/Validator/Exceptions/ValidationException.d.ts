export default ValidationException;
declare class ValidationException extends HttpException {
    /**
    @param {Object} messages
    */
    static withMessages(messages: any): ValidationException;
    static [Ψ__init__](): typeof ValidationException;
    constructor(...args: any[]);
    [Ψ__init__]($$?: any, ...args: any[]): void;
}
import HttpException from "../../Http/Exceptions/HttpException";
declare const Ψ__init__: unique symbol;
