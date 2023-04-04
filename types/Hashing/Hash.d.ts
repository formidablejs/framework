export default class Hash {
    static getDriver(): any;

    static make(value: string): Promise<any>;

    static check(value: string, hash: string): Promise<any>;

    static configure(config: object): void;

    static reset(): void;
}
