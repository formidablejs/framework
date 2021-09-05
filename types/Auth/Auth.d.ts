export = Auth;
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
    */
    constructor(user?: any, abilities?: string);
    abilities: () => any;
    user: () => {};
    /**
    @param {String} perform
    */
    can(perform: string): any;
    check(): boolean;
}
