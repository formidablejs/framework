export var __esModule: boolean;
export default DriverManager;
declare class DriverManager {
    /**
    @param {String} name
    @param {Object} driver
    */
    static register(name: string, driver: any): any;
    /**
    @param {String} name
    */
    static get(name: string): any;
    /**
    @param {String} name
    */
    static isRegistered(name: string): boolean;
}
