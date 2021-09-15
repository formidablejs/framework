export var __esModule: boolean;
export default EmailResendRequest;
declare const EmailResendRequest_base: any;
declare class EmailResendRequest extends EmailResendRequest_base {
    [x: string]: any;
    authorize(): boolean;
    rules(): {
        email: string;
    };
    persist(): Promise<any>;
}
