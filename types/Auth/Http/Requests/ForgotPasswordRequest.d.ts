export default class ForgotPasswordRequest extends FormRequest {
    authorize(): boolean;
    persist(): Promise<any>;
}
import FormRequest from "../../../Http/Request/FormRequest";
