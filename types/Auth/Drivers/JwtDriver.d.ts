export var __esModule: boolean;
export default JwtDriver;
declare const JwtDriver_base: any;
declare class JwtDriver extends JwtDriver_base {
    [x: string]: any;
    verify(): Promise<any>;
    /**
    @param {Object} body
    */
    authenticate(body: any): Promise<{
        token: any;
        type: string;
        user: any;
    }>;
    /**
    @param {Object} body
    */
    register(body: any): Promise<{
        token: any;
        type: string;
        user: any;
    }>;
}
