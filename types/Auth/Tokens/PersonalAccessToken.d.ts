export = PersonalAccessToken;
declare class PersonalAccessToken {
    /**
    @param {String} name
    @param {Number} id
    @param {String} table
    @param {Array} abilities
    */
    static create(name: string, id: number, table: string, abilities?: any[]): any;
    /**
    @param {String} token
    */
    static find(token: string): Promise<{
        token: any;
        tokenable: any;
    }>;
    /**
    @param {String} token
    */
    static destroy(token: string): Promise<any>;
    /**
    @param {String} token
    */
    static verify(token: string): Promise<any>;
    static getDatabase(): any;
    /**
    @param {Database} database
    */
    static setDatabase(database: any): {
        new (): import("./PersonalAccessToken");
        /**
        @param {String} name
        @param {Number} id
        @param {String} table
        @param {Array} abilities
        */
        create(name: string, id: number, table: string, abilities?: any[]): any;
        /**
        @param {String} token
        */
        find(token: string): Promise<{
            token: any;
            tokenable: any;
        }>;
        /**
        @param {String} token
        */
        destroy(token: string): Promise<any>;
        /**
        @param {String} token
        */
        verify(token: string): Promise<any>;
        getDatabase(): any;
        setDatabase(database: any): any;
        /**
        @param {Object} config
        */
        setConfig(config: any): any;
        /**
        @param {String} secret
        */
        setSecret(secret: string): any;
    };
    /**
    @param {Object} config
    */
    static setConfig(config: any): {
        new (): import("./PersonalAccessToken");
        /**
        @param {String} name
        @param {Number} id
        @param {String} table
        @param {Array} abilities
        */
        create(name: string, id: number, table: string, abilities?: any[]): any;
        /**
        @param {String} token
        */
        find(token: string): Promise<{
            token: any;
            tokenable: any;
        }>;
        /**
        @param {String} token
        */
        destroy(token: string): Promise<any>;
        /**
        @param {String} token
        */
        verify(token: string): Promise<any>;
        getDatabase(): any;
        /**
        @param {Database} database
        */
        setDatabase(database: any): any;
        setConfig(config: any): any;
        /**
        @param {String} secret
        */
        setSecret(secret: string): any;
    };
    /**
    @param {String} secret
    */
    static setSecret(secret: string): {
        new (): import("./PersonalAccessToken");
        /**
        @param {String} name
        @param {Number} id
        @param {String} table
        @param {Array} abilities
        */
        create(name: string, id: number, table: string, abilities?: any[]): any;
        /**
        @param {String} token
        */
        find(token: string): Promise<{
            token: any;
            tokenable: any;
        }>;
        /**
        @param {String} token
        */
        destroy(token: string): Promise<any>;
        /**
        @param {String} token
        */
        verify(token: string): Promise<any>;
        getDatabase(): any;
        /**
        @param {Database} database
        */
        setDatabase(database: any): any;
        /**
        @param {Object} config
        */
        setConfig(config: any): any;
        setSecret(secret: string): any;
    };
}
