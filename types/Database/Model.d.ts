export var __esModule: boolean;
export default Model;
declare const Model_base: any;
declare class Model extends Model_base {
    [x: string]: any;
    static get routeKeyName(): string;
    /** @param   {number}  primaryKey*/
    /**
    @param {number} primaryKey
    */
    static find(primaryKey: number): Promise<any>;
    /** @type {string}*/
    get tableName(): string;
}
