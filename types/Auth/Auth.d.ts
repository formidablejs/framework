export default Auth;
declare class Auth {
    /**
    @param {object} provider
    */
    static setProvider(provider: object): any;
    static getTable(): any;
    /**
    @param {object} body
    */
    static attempt(body: object): Promise<any>;
    /**
    @param {object} user
    @param {string} abilities
    @param {Driver} driverManager
    */
    constructor(user: object, abilities: string, driverManager: Driver);
    _driver: Driver;
    abilities: () => any;
    user: () => {};
    driver(): Driver;
    /**
    @param {string} perform
    */
    can(perform: string): any;
    check(): boolean;
    [$__patch__$]($$?: {}): void;
    [$__init__$]($$?: any, deep?: boolean): void;
}
declare const $__patch__$: unique symbol;
declare const $__init__$: unique symbol;
