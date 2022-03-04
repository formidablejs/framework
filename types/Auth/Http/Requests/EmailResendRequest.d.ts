export default class EmailResendRequest extends FormRequest {
    authorize(): boolean;
    rules(): {
        email: string;
    };
    persist(): Promise<any>;
}
import FormRequest from "../../../Http/Request/FormRequest";
