export = SessionDriver;
declare class SessionDriver extends Driver {
    verify(): Promise<{
        token: any;
        tokenable: any;
    }>;
}
import Driver = require("./Driver");
