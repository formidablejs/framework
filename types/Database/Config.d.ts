export = Config;
declare class Config {
    /** @type {string}*/
    static get default(): string;
    /** @type {object}*/
    static get connections(): any;
    /** @type {string}*/
    static get client(): string;
    static make(): {
        client: any;
        connection: {
            host: any;
            port: any;
            user: any;
            password: any;
            database: any;
            charset: any;
        };
    };
    static get bookshelf(): any;
}
