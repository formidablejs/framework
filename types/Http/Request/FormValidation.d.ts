export = FormValidation;
declare class FormValidation {
    /**
    @param {String} locale
    */
    constructor(locale?: string);
    locale: string;
    getValidation(): any;
}
