export default ForbiddenException;
declare class ForbiddenException extends HttpException {
    static [$1](): typeof ForbiddenException;
    constructor(...args: any[]);
    [$1]($$?: any, ...args: any[]): void;
}
import HttpException from "./HttpException";
declare const $1: unique symbol;
