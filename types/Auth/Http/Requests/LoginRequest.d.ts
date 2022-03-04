export default class LoginRequest extends FormRequest {
    static [$1](): typeof LoginRequest;
    constructor(...args: any[]);
    authDriver: any;
    authorize(): boolean;
    rules(): {
        email: string;
        password: string;
        remember_me: string;
    };
    persist(): Promise<any>;
    [$1]($$?: any, ...args: any[]): void;
}
import FormRequest from "../../../Http/Request/FormRequest";
declare const $1: unique symbol;
export {};
