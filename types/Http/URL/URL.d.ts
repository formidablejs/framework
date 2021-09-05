export = URL;
declare class URL {
    /**
    @param {String} name
    @param {Object} params
    @param {Object} query
    */
    static route(name: string, params?: any, query?: any): any;
    /**
    @param {String} name
    @param {Object} params
    @param {Object} query
    */
    static signedRoute(name: string, params?: any, query?: any): Promise<string>;
    /**
    @param {String} name
    @param {String} expiresIn
    @param {Object} params
    @param {Object} query
    */
    static temporarySignedRoute(name: string, expiresIn: string, params?: any, query?: any): Promise<string>;
    /**
    @param {String} uri
    @param {Object} query
    */
    static path(uri: string, query?: any): string;
    /**
    @param {String} uri
    @param {Object} query
    */
    static signed(uri: string, query?: any): Promise<string>;
    /**
    @param {String} uri
    @param {String} expiresIn
    @param {Object} query
    */
    static temporarySigned(uri: string, expiresIn: string, query?: any): Promise<string>;
    /**
    @param {Object} params
    */
    static toQuery(params?: any): string;
    /**
    @param {String} secret
    */
    static setSecret(secret: string): {
        new (): import("./URL");
        /**
        @param {String} name
        @param {Object} params
        @param {Object} query
        */
        route(name: string, params?: any, query?: any): any;
        uri: any;
        /**
        @param {String} name
        @param {Object} params
        @param {Object} query
        */
        signedRoute(name: string, params?: any, query?: any): Promise<string>;
        /**
        @param {String} name
        @param {String} expiresIn
        @param {Object} params
        @param {Object} query
        */
        temporarySignedRoute(name: string, expiresIn: string, params?: any, query?: any): Promise<string>;
        /**
        @param {String} uri
        @param {Object} query
        */
        path(uri: string, query?: any): string;
        /**
        @param {String} uri
        @param {Object} query
        */
        signed(uri: string, query?: any): Promise<string>;
        /**
        @param {String} uri
        @param {String} expiresIn
        @param {Object} query
        */
        temporarySigned(uri: string, expiresIn: string, query?: any): Promise<string>;
        luri: any;
        /**
        @param {Object} params
        */
        toQuery(params?: any): string;
        setSecret(secret: string): any;
    };
}
