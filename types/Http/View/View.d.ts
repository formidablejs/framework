export default class View {
    /**
    @param {object} data
    */
    constructor(data?: object);
    get data(): any;
    /**
    @param {object} data
    */
    setData(data: object): View;
    /**
    @param {Language} language
    */
    setLanguage(language: Language): View;
    /**
    @param {string} key
    @param {any} default
    */
    translate(key: string, default$: any): any;
    /**
    @param {string} key
    @param {any} default
    */
    t(key: string, default$: any): any;
    /**
    @param {string} key
    @param {any} default
    */
    __(key: string, default$: any): any;
    /**
    @param {string} key
    @param {any} default
    */
    old(key: string, default$: any): any;
    /**
    @param {string} key
    @param {any} default
    */
    session(key: string, default$: any): any;
    /**
    @param {string} key
    */
    hasSession(key: string): boolean;
    /**
    @param {string} key
    */
    hasError(key: string): boolean;
    /**
    @param {string} key
    */
    error(key: string): any;
    /**
    @param {string} property
    @param {any} default
    @param {boolean} escape
    */
    get(property: string, default$?: any, escape?: boolean): any;
    /**
    @param {string} property
    @param {any} default
    */
    raw(property: string, default$?: any): any;
    /**
    @param {string} property
    */
    has(property: string): boolean;
    csrf(): string;
    beforeRender(): any;
    afterRender(): any;
    handle(): any;
    render(): any;
    make(): Promise<string>;
    [$__patch__$]($$?: {}): void;
    [$__init__$]($$?: any, deep?: boolean): void;
    [$_data$]: any;
    [$_language$]: any;
}
import Language from "../../Support/Language/Language";
declare const $__patch__$: unique symbol;
declare const $__init__$: unique symbol;
declare const $_data$: unique symbol;
declare const $_language$: unique symbol;
export {};
