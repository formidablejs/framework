export var __esModule: boolean;
export default ResetPasswordRequest;
declare const ResetPasswordRequest_base: any;
declare class ResetPasswordRequest extends ResetPasswordRequest_base {
    [x: string]: any;
    authorize(): boolean;
    rules(): {
        password: string;
        password_confirmation: string;
    };
    persist(): Promise<any>;
}
