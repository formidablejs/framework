export default class SessionDriver extends Driver {
    verify(): Promise<{
        token: any;
        tokenable: any;
    }>;
}
import Driver from "./Driver";
