export default class EmailResendRequest extends FormRequest {
    authorize(): boolean;
    persist(): Promise<any>;
}
import FormRequest from "../../../Http/Request/FormRequest";
