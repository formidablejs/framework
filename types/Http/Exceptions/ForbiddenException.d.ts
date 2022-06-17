export default ForbiddenException;
declare class ForbiddenException extends HttpException {
    static [$1](): typeof ForbiddenException;
    constructor(...args: any[]);
    [$2]($$?: {}): void;
    [$1]($$?: any, deep?: boolean, ...args: any[]): void;
}
import HttpException from "./HttpException";
declare const $2: unique symbol;
declare const $1: unique symbol;
