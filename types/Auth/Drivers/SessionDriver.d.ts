export default class SessionDriver extends Driver {
    renewSession(): Promise<false | {
        token: any;
        tokenable: any;
    }>;
}
import Driver from "./Driver";
