export default class RegisterRequest extends FormRequest {
    static [$1](): typeof RegisterRequest;
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
    [$2]($$?: {}): void;
    [$1]($$?: any, ...args: any[]): void;
}
import FormRequest from "../../../Http/Request/FormRequest";
declare const $2: unique symbol;
declare const $1: unique symbol;
export {};
