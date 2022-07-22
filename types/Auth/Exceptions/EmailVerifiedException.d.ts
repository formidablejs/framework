export default EmailVerifiedException;
declare class EmailVerifiedException extends HttpException {
    static [$__init__$](): typeof EmailVerifiedException;
    constructor(...args: any[]);
    [$__patch__$]($$?: {}): void;
    [$__init__$]($$?: any, deep?: boolean, ...args: any[]): void;
}
import HttpException from "../../Http/Exceptions/HttpException";
declare const $__patch__$: unique symbol;
declare const $__init__$: unique symbol;
