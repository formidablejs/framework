export default class JwtDriver extends Driver {
    verify(): Promise<{
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
