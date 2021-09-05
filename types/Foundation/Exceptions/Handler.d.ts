export = Handler;
declare class Handler {
    constructor(config: any);
    config: any;
    handle(error: any, request: any, reply: any): Promise<any>;
    [Ψinit]($$?: any): void;
}
declare const Ψinit: unique symbol;
