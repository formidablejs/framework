export var __esModule: boolean;
export default Language;
declare class Language {
    constructor($$?: any);
    lang: any;
    get locale(): any;
    get fallbackLocale(): any;
    get packs(): any;
    /**
    @param {String} locale
    */
    setLocale(locale: string): Language;
    /**
    @param {String} locale
    */
    setFallbackLocale(locale: string): Language;
    /**
    @param {String} location
    */
    register(location: string): Language;
    /**
    @param {String} path
    @param {String} default
    */
    get(path: string, default$: any): any;
    unset(): {
        locale: any;
        fallback_locale: any;
        packs: {};
    };
    [Ψ__init__]($$?: any): void;
}
declare const Ψ__init__: unique symbol;
