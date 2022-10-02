export default class PersonalAccessToken {
    /**
    @param {string} name
    @param {number} id
    @param {string} table
    @param {Array} abilities
    @param {number|null} ttl
    @param {object} data
    */
    static create(name: string, id: number, table: string, abilities?: any[], ttl?: number | null, data?: object): any;
    /**
    @param {string} token
    */
    static find(token: string, protocol?: any): Promise<{
        token: any;
        tokenable: any;
    }>;
    /**
    @param {Function} handler
    */
    static onFetchAuthenticated(handler: Function): Function;
    /**
    @param {object} token
    */
    static using(token: object): Promise<any>;
    /**
    @param {string} token
    */
    static destroy(token: string): Promise<any>;
    /**
    @param {string} token
    */
    static verify(token: string): Promise<any>;
    static getDatabase(): any;
    static getEncrypter(): any;
    /**
    @param {Database} database
    */
    static setDatabase(database: any): typeof PersonalAccessToken;
    /**
    @param {object} config
    */
    static setConfig(config: object): typeof PersonalAccessToken;
    /**
    @param {string} secret
    */
    static setSecret(secret: string): typeof PersonalAccessToken;
    /**
    @param {Encrypter} encryper
    */
    static setEncrypter(encryper: Encrypter): typeof PersonalAccessToken;
}
import Encrypter from "../../Foundation/Encrypter";
