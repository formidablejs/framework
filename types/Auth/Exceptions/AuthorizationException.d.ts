export = AuthorizationException;
declare class AuthorizationException extends HttpException {
    constructor(...args: any[]);
    [Ψinit]($$?: any, ...args: any[]): void;
}
import HttpException = require("../../Http/Exceptions/HttpException");
declare const Ψinit: unique symbol;
