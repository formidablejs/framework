export default class Encrypter {
    /**
     * Configure encryption.
     */
    static configure(config: object): typeof Encrypter;

    /**
     * Get encryption key/iv.
     */
    static appKey(type: string): string;

    /**
     * Get encryption key.
     */
    static key(): string;

    /**
     * Get encryption iv.
     */
    static iv(): string;

    /**
     * Encrypt value.
     */
    static encrypt(value: any): string;

    /**
     * Decrypt value.
     */
    static decrypt(hash: string): any;

    /**
     * Compares two strings to prevent timing attacks.
     */
    static hashEquals(knownString: string, userString: string): boolean;
}
