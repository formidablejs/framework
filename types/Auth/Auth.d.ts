export default Auth;
declare class Auth {
    /**
    @param {Object} provider
    */
    static setProvider(provider: any): any;
    static getTable(): any;
    /**
    @param {Object} body
    */
    static attempt(body: any): Promise<any>;
    /**
    @param {Object} user
    @param {String} abilities
    @param {Driver} driverManager
    */
    constructor(user: any, abilities: string, driverManager: Driver);
    _driver: Driver;
    abilities: () => any;
    user: () => {};
    driver(): Driver;
    /**
    @param {String} perform
    */
    can(perform: string): any;
    check(): boolean;
    [$__patch__$]($$?: {}): void;
    [$__init__$]($$?: any, deep?: boolean): void;
}
declare const $__patch__$: unique symbol;
declare const $__init__$: unique symbol;
