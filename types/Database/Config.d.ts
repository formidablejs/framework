export = Config;
declare class Config {
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
