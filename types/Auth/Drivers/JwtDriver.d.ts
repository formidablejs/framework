export default class JwtDriver extends Driver {
    verify(): Promise<{
        token: any;
        tokenable: any;
    }>;
}
import Driver from "./Driver";
