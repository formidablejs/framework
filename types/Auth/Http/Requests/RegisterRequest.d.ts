export var __esModule: boolean;
export default RegisterRequest;
declare const RegisterRequest_base: any;
declare class RegisterRequest extends RegisterRequest_base {
    [x: string]: any;
    authorize(): boolean;
    rules(): {
        name: string;
        email: string;
        password: string;
        password_confirmation: string;
    };
    persist(): Promise<any>;
}
