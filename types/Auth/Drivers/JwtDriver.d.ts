export = JwtDriver;
declare class JwtDriver extends Driver {
    verify(): Promise<{
        token: any;
        tokenable: any;
    }>;
}
import Driver = require("./Driver");
