export = BadRequestException;
declare class BadRequestException extends HttpException {
    constructor(...args: any[]);
    [Ψinit]($$?: any, ...args: any[]): void;
}
import HttpException = require("./HttpException");
declare const Ψinit: unique symbol;
