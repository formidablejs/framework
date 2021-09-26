export default class SessionDriver extends Driver {
    renewSession(): Promise<false | {
        token: any;
        tokenable: any;
    }>;
    /**
    @param {Object} user
    */
    addRememberMeToken(user: any): Promise<any>;
}
import Driver from "./Driver";
