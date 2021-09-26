export default class SessionDriver extends Driver {
    renewSession(): Promise<boolean>;
    /**
    @param {Object} user
    */
    addRememberMeToken(user: any): Promise<any>;
}
import Driver from "./Driver";
