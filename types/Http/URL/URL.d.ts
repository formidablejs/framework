export default class URL {
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
    static setSecret(secret: string): typeof URL;
}
