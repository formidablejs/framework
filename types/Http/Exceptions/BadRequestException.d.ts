export default BadRequestException;
declare class BadRequestException extends HttpException {
    static [$__init__$](): typeof BadRequestException;
    constructor(...args: any[]);
    [$__patch__$]($$?: {}): void;
    [$__init__$]($$?: any, deep?: boolean, ...args: any[]): void;
}
import HttpException from "./HttpException";
declare const $__patch__$: unique symbol;
declare const $__init__$: unique symbol;
