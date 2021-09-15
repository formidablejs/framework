export default ForbiddenException;
declare class ForbiddenException extends HttpException {
    static [Ψ__init__](): typeof ForbiddenException;
    constructor(...args: any[]);
    [Ψ__init__]($$?: any, ...args: any[]): void;
}
import HttpException from "./HttpException";
declare const Ψ__init__: unique symbol;
