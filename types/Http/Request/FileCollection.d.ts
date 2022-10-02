export default class FileCollection {
    constructor($$?: any);
    _object: any;
    _conditions: any;
    /**
         * Count the number of files in the collection.
         *
         * @returns {number}
         */
    /**
    *
         * Count the number of files in the collection.
         *
         * @returns {number}
         
    */
    get length(): number;
    /**
         * Count the number of files in the collection.
         *
         * @returns {number}
         */
    /**
    *
         * Count the number of files in the collection.
         *
         * @returns {number}
         
    */
    count(): number;
    /**
         * Push File to collection.
         *
         * @returns {File|null}
         */
    /**
    *
         * Push File to collection.
         *
         * @returns {File|null}
         
    @param {File} file
    */
    push(file: File): File | null;
    /**
         * Get first File in the collection.
         *
         * @returns {File|null}
         */
    /**
    *
         * Get first File in the collection.
         *
         * @returns {File|null}
         
    */
    first(): File | null;
    /**
         * Get last File in the collection.
         *
         * @returns {File|null}
         */
    /**
    *
         * Get last File in the collection.
         *
         * @returns {File|null}
         
    */
    last(): File | null;
    /**
         * Check if collection has files or not.
         *
         * @returns {Boolean}
         */
    /**
    *
         * Check if collection has files or not.
         *
         * @returns {Boolean}
         
    */
    hasFiles(): boolean;
    /**
         * Performs the specified action for each File in an array.
         *
         * @param {function} callback
         * @param {any} _this
         * @returns {void}
         */
    /**
    *
         * Performs the specified action for each File in an array.
         *
         * @param {function} callback
         * @param {any} _this
         * @returns {void}
         
    @param {function} callback
    @param {null} _this
    */
    each(callback: Function, _this: any): void;
    /**
         * Calls a defined callback function on each File of an array, and returns an array that contains the results.
         *
         * @param {function} callback
         * @param {any} _this
         * @returns {File[]}
         */
    /**
    *
         * Calls a defined callback function on each File of an array, and returns an array that contains the results.
         *
         * @param {function} callback
         * @param {any} _this
         * @returns {File[]}
         
    @param {function} callback
    @param {null} _this
    */
    map(callback: Function, _this: any): File[];
    /**
         * Returns the files of an array that meet the condition specified in a callback function.
         *
         * @param {function} callback
         * @param {any} _this
         * @returns {File[]}
         */
    /**
    *
         * Returns the files of an array that meet the condition specified in a callback function.
         *
         * @param {function} callback
         * @param {any} _this
         * @returns {File[]}
         
    @param {function} callback
    @param {null} _this
    */
    filter(callback: Function, _this: any): File[];
    /**
         * Filter files using the where condition.
         *
         * @param {string} key
         * @param {any} value
         * @returns {File[]}
         */
    /**
    *
         * Filter files using the where condition.
         *
         * @param {string} key
         * @param {any} value
         * @returns {File[]}
         
    @param {string} key
    */
    where(key: string, value: any): File[];
    /**
         * Get files.
         *
         * @returns {File[]}
         */
    /**
    *
         * Get files.
         *
         * @returns {File[]}
         
    */
    all(): File[];
    /**
         * Get filtered files.
         *
         * @returns {File[]}
         */
    /**
    *
         * Get filtered files.
         *
         * @returns {File[]}
         
    */
    get(): File[];
    [$__patch__$]($$?: {}): void;
    [$__init__$]($$?: any, deep?: boolean): void;
}
import File from "./File";
declare const $__patch__$: unique symbol;
declare const $__init__$: unique symbol;
export {};
