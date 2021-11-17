export default class ServiceResolver {
    /**
    @param {Application} app
    */
    constructor(app: Application);
    app: Application;
    boot(): any;
    register(): any;
    [Ψ__init__]($$?: any): void;
}
import Application from "../Foundation/Application";
declare const Ψ__init__: unique symbol;
export {};
