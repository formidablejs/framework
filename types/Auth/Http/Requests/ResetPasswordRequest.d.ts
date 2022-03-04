export default class ResetPasswordRequest extends FormRequest {
    authorize(): boolean;
    rules(): {
        password: string;
        password_confirmation: string;
    };
    persist(): Promise<any>;
}
import FormRequest from "../../../Http/Request/FormRequest";
