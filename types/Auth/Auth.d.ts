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
    [$2]($$?: {}): void;
    [$1]($$?: any, deep?: boolean): void;
}
declare const $2: unique symbol;
declare const $1: unique symbol;
