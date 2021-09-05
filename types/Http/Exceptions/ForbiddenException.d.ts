export = ForbiddenException;
declare class ForbiddenException extends HttpException {
    constructor(...args: any[]);
    [Ψinit]($$?: any, ...args: any[]): void;
}
import HttpException = require("./HttpException");
declare const Ψinit: unique symbol;
