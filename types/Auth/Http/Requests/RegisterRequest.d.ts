export default class RegisterRequest extends FormRequest {
    static [$__init__$](): typeof RegisterRequest;
    constructor(...args: any[]);
    authDriver: any;
    authorize(): boolean;
    rules(): {
        name: string;
        email: string;
        password: string;
        password_confirmation: string;
    };
    persist(): Promise<any>;
    [$__patch__$]($$?: {}): void;
    [$__init__$]($$?: any, deep?: boolean, ...args: any[]): void;
}
import FormRequest from "../../../Http/Request/FormRequest";
declare const $__patch__$: unique symbol;
declare const $__init__$: unique symbol;
export {};
