export class ContextAPI {
    get registered(): {
        Database: any;
        DB: any;
        Mail: {
            new (emails: string | string[]): import("@formidablejs/mailer/types/Mail");
            to(emails: string | string[]): import("@formidablejs/mailer/types/Mail");
            configure(config: any): any;
        };
    };
    inject(target: any): ContextAPI;
}
export let Context: ContextAPI;
