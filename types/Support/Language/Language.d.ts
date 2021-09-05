export = Language;
declare class Language {
    constructor($$?: any);
    lang: any;
    get locale(): any;
    get fallbackLocale(): any;
    get packs(): any;
    /**
    @param {String} locale
    */
    setLocale(locale: string): import("./Language");
    /**
    @param {String} locale
    */
    setFallbackLocale(locale: string): import("./Language");
    /**
    @param {String} location
    */
    register(location: string): import("./Language");
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
    [Ψinit]($$?: any): void;
}
declare const Ψinit: unique symbol;
