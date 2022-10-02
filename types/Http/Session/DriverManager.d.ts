export default class DriverManager {
    /**
    @param {string} name
    @param {object} driver
    */
    static register(name: string, driver: object): any;
    /**
    @param {string} name
    */
    static get(name: string): any;
    /**
    @param {string} name
    */
    static isRegistered(name: string): boolean;
}
