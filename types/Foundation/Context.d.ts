export class ContextAPI {
    get registered(): {
        Database: any;
        DB: any;
        Mail: typeof Mail;
    };
    inject(target: any): ContextAPI;
}
export let Context: ContextAPI;
import { Mail } from "@formidablejs/mailer";
