import Driver from "./Drivers/Driver";

export default Auth;
declare class Auth {
    static setProvider(provider: Provider = object): void;

    static getTable(): string;

    static attempt(body: object): Promise<User>;

    constructor(user: User, abilities: string, driverManager: Driver);

    _driver: Driver;

    abilities: () => object | null;

    user: () => User;

    driver(): Driver;

    can(perform: string): boolean;

    check(): boolean;
}

Auth.setProvider({
    cool: true
})