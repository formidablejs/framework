export default class SessionDriver extends Driver {
    verify(): Promise<false | {
        token: any;
        tokenable: any;
    }>;
    renewSession(): Promise<false | {
        token: any;
        tokenable: any;
    }>;
    /**
    @param {Object} body
    */
    authenticate(body: any): Promise<any>;
    /**
    @param {Object} body
    */
    register(body: any): Promise<any>;
    /**
    @param {Object} body
    */
    logout(body?: any): Promise<any>;
}
import Driver from "./Driver";
