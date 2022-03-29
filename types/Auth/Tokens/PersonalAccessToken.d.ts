export default class PersonalAccessToken {
    /**
    @param {String} name
    @param {Number} id
    @param {String} table
    @param {Array} abilities
    @param {object} data
    */
    static create(name: string, id: number, table: string, abilities?: any[], data?: object): any;
    /**
    @param {String} token
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
    @param {Object} token
    */
    static using(token: any): Promise<any>;
    /**
    @param {String} token
    */
    static destroy(token: string): Promise<any>;
    /**
    @param {String} token
    */
    static verify(token: string): Promise<any>;
    static getDatabase(): any;
    static getEncryper(): any;
    /**
    @param {Database} database
    */
    static setDatabase(database: any): typeof PersonalAccessToken;
    /**
    @param {Object} config
    */
    static setConfig(config: any): typeof PersonalAccessToken;
    /**
    @param {String} secret
    */
    static setSecret(secret: string): typeof PersonalAccessToken;
    /**
    @param {Encrypter} encryper
    */
    static setEncrypter(encryper: Encrypter): typeof PersonalAccessToken;
}
import Encrypter from "../../Foundation/Encrypter";
