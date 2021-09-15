export var __esModule: boolean;
export default ValidationException;
declare const ValidationException_base: any;
declare class ValidationException extends ValidationException_base {
    [x: string]: any;
    /**
    @param {Object} messages
    */
    static withMessages(messages: any): ValidationException;
    static [Ψ__init__](): typeof ValidationException;
    constructor(...args: any[]);
    status: any;
    [Ψ__init__]($$?: any, ...args: any[]): void;
}
declare const Ψ__init__: unique symbol;
