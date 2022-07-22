export default class LoginRequest extends FormRequest {
    static [$__init__$](): typeof LoginRequest;
    constructor(...args: any[]);
    authDriver: any;
    authorize(): boolean;
    rules(): {
        email: string;
        password: string;
        remember_me: string;
    };
    persist(): Promise<any>;
    [$__patch__$]($$?: {}): void;
    [$__init__$]($$?: any, deep?: boolean, ...args: any[]): void;
}
import FormRequest from "../../../Http/Request/FormRequest";
declare const $__patch__$: unique symbol;
declare const $__init__$: unique symbol;
export {};
