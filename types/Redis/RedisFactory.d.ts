export default class RedisFactory {
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