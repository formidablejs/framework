export default class View {
    /**
    @param {Object} data
    */
    constructor(data?: any);
    get data(): any;
    /**
    @param {Object} data
    */
    setData(data: any): View;
    /**
    @param {Language} language
    */
    setLanguage(language: Language): View;
    /**
    @param {String} key
    @param {any} default
    */
    translate(key: string, default$: any): any;
    /**
    @param {String} key
    @param {any} default
    */
    t(key: string, default$: any): any;
    /**
    @param {String} key
    @param {any} default
    */
    __(key: string, default$: any): any;
    /**
    @param {String} key
    @param {any} default
    */
    old(key: string, default$: any): any;
    /**
    @param {String} key
    @param {any} default
    */
    session(key: string, default$: any): any;
    /**
    @param {String} key
    */
    hasSession(key: string): boolean;
    /**
    @param {String} key
    */
    hasError(key: string): boolean;
    /**
    @param {String} key
    */
    error(key: string): any;
    /**
    @param {String} property
    @param {any} default
    @param {boolean} escape
    */
    get(property: string, default$?: any, escape?: boolean): any;
    /**
    @param {String} property
    @param {any} default
    */
    raw(property: string, default$?: any): any;
    /**
    @param {String} property
    */
    has(property: string): boolean;
    beforeRender(): any;
    afterRender(): any;
    handle(): any;
    render(): any;
    make(): Promise<string>;
    [$4]($$?: {}): void;
    [$3]($$?: any): void;
    [$1]: any;
    [$2]: any;
}
import Language from "../../Support/Language/Language";
declare const $4: unique symbol;
declare const $3: unique symbol;
declare const $1: unique symbol;
declare const $2: unique symbol;
export {};
