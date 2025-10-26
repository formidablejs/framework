export default class View {
    constructor(data?: object);

    /**
     * View data.
     */
    get data(): any;

    /**
     * Set view data.
     */
    setData(data: object): View;

    /**
     * Set language/locale.
     */
    setLanguage(language: Language): View;

    /**
     * Get translation.
     */
    translate(key: string, default$?: string): string;

    /**
     * Get translation.
     */
    t(key: string, default$?: string): string;

    /**
     * Get translation.
     */
    __(key: string, default$?: string): string;

    /**
     * Get asset path(s) from Vite manifest.
     *
     * @param {string | string[]} file
     * @returns {string}
     */
    vite(file: string | string[]): string;

    /**
     * Get old input.
     */
    old(key: string, default$?: any): ?any;

    /**
     * Get session data.
     */
    session(key: string, default$?: any): any;

    /**
     * Check if session data exists.
     */
    hasSession(key: string): boolean;

    /**
     * Check if errors exist.
     */
    hasError(key: string): boolean;

    /**
     * Get errors.
     */
    error(key: string): ?string[];

    /**
     * Get data.
     */
    get(property: string, default$?: any, escape?: boolean): any;

    /**
     * Get raw data.
     */
    raw(property: string, default$?: any): any;

    /**
     * Check if data exists.
     */
    has(property: string): boolean;

    /**
     * Get csrf token input.
     */
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
export { View };

export interface IView {
    new(...args: any[]): View
}
