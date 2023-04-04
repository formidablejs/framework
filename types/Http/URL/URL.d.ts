export default class URL {
    /**
     * Generate a URL for a given route name.
     */
    static route(name: string, params?: object): string;

    /**
     * Generate a signed URL for a given route name.
     */
    static signedRoute(name: string, params?: object): Promise<string>;

    /**
     * Generate a temporary signed URL for a given route name.
     */
    static temporarySignedRoute(name: string, expiresIn: string, params?: object): Promise<string>;

    /**
     * Generate a uri for a given path.
     */
    static path(uri: string, query?: object): string;

    /**
     * Generate a signed uri for a given path.
     */
    static signed(uri: string, query?: object): Promise<string>;

    /**
     * Generate a temporary signed uri for a given path.
     */
    static temporarySigned(uri: string, expiresIn: string, query?: object): Promise<string>;

    /**
     * Set the secret used to sign URLs.
     */
    static setSecret(secret: string): typeof URL;
}
