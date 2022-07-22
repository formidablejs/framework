export default class ServiceResolver {
    /**
    @param {Application} app
    */
    constructor(app: Application);
    app: Application;
    boot(): any;
    register(): any;
    [$__patch__$]($$?: {}): void;
    [$__init__$]($$?: any, deep?: boolean): void;
}
import Application from "../Foundation/Application";
declare const $__patch__$: unique symbol;
declare const $__init__$: unique symbol;
export {};
