export var __esModule: boolean;
export default Redis;
declare class Redis {
    /**
    @param {String} database
    */
    static connection(database?: string): any;
    static configure(config: any): any;
    static closeAll(): any[];
    /**
    @param {String} database
    */
    constructor(database?: string);
}
