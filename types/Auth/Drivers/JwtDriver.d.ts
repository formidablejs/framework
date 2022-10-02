export default class JwtDriver extends Driver {
    verify(): Promise<{
        token: any;
        tokenable: any;
    }>;
    /**
    @param {object} body
    */
    authenticate(body: object): Promise<any>;
    /**
    @param {object} body
    */
    register(body: object): Promise<any>;
    /**
    @param {object} body
    */
    logout(body?: object): Promise<any>;
}
import Driver from "./Driver";
