export default class ForgotPasswordRequest extends FormRequest {
    authorize(): boolean;
    rules(): {
        email: string;
    };
    persist(): Promise<any>;
}
import FormRequest from "../../../Http/Request/FormRequest";
