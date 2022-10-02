export default class Language {
    constructor($$?: any);
    lang: any;
    get locale(): any;
    get fallbackLocale(): any;
    get packs(): any;
    /**
    @param {string} locale
    */
    setLocale(locale: string): Language;
    /**
    @param {string} locale
    */
    setFallbackLocale(locale: string): Language;
    /**
    @param {string} location
    */
    register(location: string): Language;
    /**
    @param {string} path
    @param {string} default
    */
    get(path: string, default$: any): any;
    unset(): {
        locale: any;
        fallback_locale: any;
        packs: {};
    };
    [$__patch__$]($$?: {}): void;
    [$__init__$]($$?: any, deep?: boolean): void;
}
declare const $__patch__$: unique symbol;
declare const $__init__$: unique symbol;
export {};
