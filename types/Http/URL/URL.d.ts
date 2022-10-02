export default class URL {
    /**
    @param {string} name
    @param {object} params
    @param {object} query
    */
    static route(name: string, params?: object, query?: object): any;
    /**
    @param {string} name
    @param {object} params
    @param {object} query
    */
    static signedRoute(name: string, params?: object, query?: object): Promise<string>;
    /**
    @param {string} name
    @param {string} expiresIn
    @param {object} params
    @param {object} query
    */
    static temporarySignedRoute(name: string, expiresIn: string, params?: object, query?: object): Promise<string>;
    /**
    @param {string} uri
    @param {object} query
    */
    static path(uri: string, query?: object): string;
    /**
    @param {string} uri
    @param {object} query
    */
    static signed(uri: string, query?: object): Promise<string>;
    /**
    @param {string} uri
    @param {string} expiresIn
    @param {object} query
    */
    static temporarySigned(uri: string, expiresIn: string, query?: object): Promise<string>;
    /**
    @param {object} params
    */
    static toQuery(params?: object): string;
    /**
    @param {string} secret
    */
    static setSecret(secret: string): typeof URL;
}
