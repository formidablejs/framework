export default Config;
export class Config {
    /** @type {string}*/
    static get default(): string;
    /** @type {object}*/
    static get connections(): any;
    /** @type {string}*/
    static get client(): string;

    static get settings(): any;

    static get isReturningDriver(): boolean;

    static make(): {};
}
