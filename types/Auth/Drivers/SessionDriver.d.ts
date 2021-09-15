export var __esModule: boolean;
export default SessionDriver;
declare const SessionDriver_base: any;
declare class SessionDriver extends SessionDriver_base {
    [x: string]: any;
    verify(): Promise<any>;
    /**
    @param {Object} body
    */
    authenticate(body: any): Promise<{
        status: string;
    }>;
    /**
    @param {Object} body
    */
    register(body: any): Promise<{
        status: string;
    }>;
    /**
    @param {Object} body
    */
    logout(body?: any): Promise<{
        status: string;
    }>;
}
