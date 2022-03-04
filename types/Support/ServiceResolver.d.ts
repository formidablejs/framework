export default class ServiceResolver {
    /**
    @param {Application} app
    */
    constructor(app: Application);
    app: Application;
    boot(): any;
    register(): any;
    [$1]($$?: any): void;
}
import Application from "../Foundation/Application";
declare const $1: unique symbol;
export {};
